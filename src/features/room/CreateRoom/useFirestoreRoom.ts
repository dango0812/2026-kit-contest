import { useCallback, useEffect, useRef } from 'react';

import {
  createFirestoreRoom,
  deleteFirestoreRoom,
  leaveFirestoreRoom,
  subscribeToRoom,
  updateFirestoreRoomMemberCount,
  updateFirestoreRoomStatus,
} from '@database/roomService';
import { useRoomStore, useRoomStoreApi } from '@features/room/useRoomStore';
import { useToast } from '@shared/hooks/useToast';
import { generateCode } from '@shared/utils';

/** useFirestoreRoom 훅의 옵션 */
interface UseFirestoreRoomOptions {
  /** 현재 사용자가 참가자(비호스트)인지 여부 */
  isParticipant: boolean;
  /** 방장이 방을 삭제했을 때 호출되는 콜백 */
  onKicked: () => void;
  /** 방 상태가 'playing'으로 변경됐을 때 호출되는 콜백 */
  onStatusPlaying?: () => void;
}

/**
 * Firestore 기반 방 관리 훅
 *
 * 호스트일 경우 마운트 시 방을 생성하고, Firestore 문서의 실시간 변경을
 * 구독하여 참가자 목록과 설정을 자동으로 동기화해요.
 */
export function useFirestoreRoom({ isParticipant, onKicked, onStatusPlaying }: UseFirestoreRoomOptions) {
  const { room } = useRoomStore();
  const storeApi = useRoomStoreApi();
  const showToast = useToast();
  const initializedRef = useRef(false);

  // 구독 콜백에서 최신 값을 참조하기 위한 ref
  const isParticipantRef = useRef(isParticipant);
  const onKickedRef = useRef(onKicked);
  const onStatusPlayingRef = useRef(onStatusPlaying);
  isParticipantRef.current = isParticipant;
  onKickedRef.current = onKicked;
  onStatusPlayingRef.current = onStatusPlaying;

  const firestoreDocId = room?.firestoreDocId ?? null;

  // 방 생성 (호스트 전용, 마운트 시 1회)
  useEffect(() => {
    if (isParticipant || initializedRef.current) {
      return;
    }

    const state = storeApi.getState();
    if (state.room) {
      return;
    }

    initializedRef.current = true;

    const roomCode = generateCode();
    const memberCount = 2;
    state.createRoom(roomCode, memberCount);

    const { config, userId } = state;
    createFirestoreRoom({
      roomCode,
      memberCount,
      topicId: config.topicId!,
      gradeId: config.gradeId!,
      scopeId: config.scopeId!,
      customTopic: config.customTopic,
      difficulty: config.difficulty ?? 'normal',
      host: {
        id: userId,
        nickname: '나',
        avatarUrl: storeApi.getState().room?.participants[0]?.avatarUrl ?? '',
      },
    }).then(docId => {
      storeApi.getState().setFirestoreDocId(docId);
    });
  }, [isParticipant, storeApi]);

  // Firestore 실시간 구독
  useEffect(() => {
    if (!firestoreDocId) {
      return;
    }

    const unsubscribe = subscribeToRoom(firestoreDocId, firestoreRoom => {
      const {
        syncParticipants,
        updateMemberCount,
        updateStatus,
        setCaseData,
        setCurrentMission,
        setMissionSolved,
        setReadyForNext,
        setConfig,
        reset,
      } = storeApi.getState();

      // 방이 삭제된 경우 (방장이 나감)
      if (!firestoreRoom) {
        if (isParticipantRef.current) {
          showToast('방장이 수사를 종료했어요', { color: 'error' });
          reset();
          onKickedRef.current();
        }
        return;
      }

      // 참가자 목록 동기화
      const mapped = firestoreRoom.participants.map(p => ({
        id: p.id,
        nickname: p.nickname,
        avatarUrl: p.avatarUrl,
        isHost: p.isHost,
      }));
      syncParticipants(mapped);
      updateMemberCount(firestoreRoom.memberCount);

      // 상태 동기화
      const prevStatus = storeApi.getState().room?.status;
      updateStatus(firestoreRoom.status);

      // 브리핑 데이터 동기화
      if (firestoreRoom.caseData) {
        setCaseData(firestoreRoom.caseData);
      }

      // 현재 미션 인덱스 동기화
      if (firestoreRoom.currentMission !== undefined) {
        setCurrentMission(firestoreRoom.currentMission);
      }

      // 미션 해결 상태 동기화
      setMissionSolved(firestoreRoom.missionSolved ?? false);
      setReadyForNext(firestoreRoom.readyForNext ?? []);

      // status가 'playing'으로 변경된 순간 콜백 호출
      if (prevStatus !== 'playing' && firestoreRoom.status === 'playing') {
        onStatusPlayingRef.current?.();
      }

      // 참가자일 경우 방 설정도 동기화
      if (isParticipantRef.current) {
        setConfig({
          topicId: firestoreRoom.topicId,
          gradeId: firestoreRoom.gradeId,
          scopeId: firestoreRoom.scopeId,
          customTopic: firestoreRoom.customTopic,
          difficulty: firestoreRoom.difficulty,
        });
      }
    });

    return () => unsubscribe();
  }, [firestoreDocId, storeApi, showToast]);

  // 수사 시작 (호스트 → Firestore status를 'playing'으로 변경)
  const startInvestigation = useCallback(async () => {
    const { room } = storeApi.getState();
    if (room?.firestoreDocId) {
      try {
        await updateFirestoreRoomStatus(room.firestoreDocId, 'playing');
      } catch {
        showToast('수사를 시작하지 못했어요', { color: 'error' });
      }
    }
  }, [storeApi, showToast]);

  // 멤버 수 변경 (호스트)
  const changeMemberCount = useCallback(
    async (count: number) => {
      const { updateMemberCount, room } = storeApi.getState();
      updateMemberCount(count);
      if (room?.firestoreDocId) {
        await updateFirestoreRoomMemberCount(room.firestoreDocId, count);
      }
    },
    [storeApi],
  );

  // 방 삭제 (호스트)
  const deleteRoom = useCallback(async () => {
    const { room, reset } = storeApi.getState();
    if (room?.firestoreDocId) {
      await deleteFirestoreRoom(room.firestoreDocId);
    }
    reset();
  }, [storeApi]);

  // 방 나가기 (참가자)
  const leaveRoom = useCallback(async () => {
    const { room, userId, reset } = storeApi.getState();
    if (room?.firestoreDocId) {
      await leaveFirestoreRoom(room.firestoreDocId, userId);
    }
    reset();
  }, [storeApi]);

  return { changeMemberCount, deleteRoom, leaveRoom, startInvestigation };
}
