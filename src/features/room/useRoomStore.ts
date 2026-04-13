import { createContext, useContext } from 'react';

import { getRandomAvatarUrl } from '@assets/avatars';
import type { TopicId } from '@constants/topics';
import type { CaseData } from '@database/geminiService';
import { type StoreApi, useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

/** 방 참가자 정보 */
export interface Participant {
  id: string;
  nickname: string;
  avatarUrl: string;
  isHost: boolean;
}

// 방 기본 정보
interface Room {
  roomCode: string;
  memberCount: number;
  participants: Participant[];
  firestoreDocId: string | null;
  status: 'waiting' | 'playing' | 'finished' | 'failed';
  caseData: CaseData | null;
  currentMission: number;
  missionSolved: boolean;
  readyForNext: string[];
  totalWrongAttempts: number;
}

// 방 생성 시 설정하는 학습 옵션
interface RoomConfig {
  topicId: TopicId | null;
  gradeId: string | null;
  scopeId: string | null;
  customTopic: string | null;
  difficulty: 'easy' | 'normal' | 'hard' | null;
}

/** 방의 전체 상태와 액션을 정의하는 스토어 타입 */
export interface RoomState {
  /** 현재 방 정보 (방이 없으면 null) */
  room: Room | null;
  /** 학습 주제·학년·범위 설정 */
  config: RoomConfig;
  /** 현재 사용자의 고유 ID */
  userId: string;
  /** 학습 주제 설정 */
  setTopic: (topicId: TopicId) => void;
  /** 학년 설정 */
  setGrade: (gradeId: string) => void;
  /** 학습 범위 설정 */
  setScope: (scopeId: string, customTopic?: string) => void;
  /** 난이도 설정 */
  setDifficulty: (difficulty: 'easy' | 'normal' | 'hard') => void;
  /** config의 일부 필드를 업데이트 */
  setConfig: (config: Partial<RoomConfig>) => void;
  /** 방을 생성하고 호스트를 참가자로 등록 */
  createRoom: (roomCode: string, memberCount: number, firestoreDocId?: string) => void;
  /** 방 최대 인원 수를 변경 */
  updateMemberCount: (count: number) => void;
  /** Firestore에서 받은 참가자 목록으로 동기화 */
  syncParticipants: (participants: Participant[]) => void;
  /** 현재 사용자를 참가자로 추가 */
  joinRoom: (nickname: string) => void;
  /** Firestore 문서 ID를 설정 */
  setFirestoreDocId: (docId: string) => void;
  /** 방 상태 변경 */
  updateStatus: (status: Room['status']) => void;
  /** 게임 데이터 저장 */
  setCaseData: (data: CaseData) => void;
  /** 현재 미션 인덱스 변경 */
  setCurrentMission: (index: number) => void;
  /** 미션 해결 여부 변경 */
  setMissionSolved: (solved: boolean) => void;
  /** 다음 미션 준비 완료 사용자 목록 동기화 */
  setReadyForNext: (userIds: string[]) => void;
  /** 총 오답 횟수 동기화 */
  setTotalWrongAttempts: (count: number) => void;
  /** 모든 상태를 초기값으로 리셋 */
  reset: () => void;
}

// 고유 사용자 ID 생성
const generateUserId = () => crypto.randomUUID();

/** Zustand vanilla 스토어 타입 */
export type RoomStore = StoreApi<RoomState>;

// Room 스토어의 React Context
export const RoomStoreContext = createContext<RoomStore | null>(null);

// 새 Room 스토어 인스턴스를 생성
export function createRoomStore(): RoomStore {
  return createStore<RoomState>((set, get) => ({
    room: null,
    config: {
      topicId: null,
      gradeId: null,
      scopeId: null,
      customTopic: null,
      difficulty: null,
    },
    userId: generateUserId(),

    setTopic: topicId => {
      set(state => ({ config: { ...state.config, topicId } }));
    },

    setGrade: gradeId => {
      set(state => ({ config: { ...state.config, gradeId } }));
    },

    setScope: (scopeId, customTopic) => {
      set(state => ({
        config: { ...state.config, scopeId, customTopic: customTopic ?? null },
      }));
    },

    setDifficulty: difficulty => {
      set(state => ({ config: { ...state.config, difficulty } }));
    },

    setConfig: (partial: Partial<RoomConfig>) => {
      set(state => ({ config: { ...state.config, ...partial } }));
    },

    createRoom: (roomCode, memberCount, firestoreDocId) => {
      const { userId } = get();
      set({
        room: {
          roomCode,
          memberCount,
          participants: [{ id: userId, nickname: '나', avatarUrl: getRandomAvatarUrl(), isHost: true }],
          firestoreDocId: firestoreDocId ?? null,
          status: 'waiting',
          caseData: null,
          currentMission: 0,
          missionSolved: false,
          readyForNext: [],
          totalWrongAttempts: 0,
        },
      });
    },

    updateMemberCount: count => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, memberCount: count } });
    },

    syncParticipants: participants => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, participants } });
    },

    joinRoom: nickname => {
      const { room, userId } = get();
      if (!room) {
        return;
      }

      const alreadyJoined = room.participants.some(p => p.id === userId);
      if (alreadyJoined) {
        return;
      }

      set({
        room: {
          ...room,
          participants: [
            ...room.participants,
            { id: userId, nickname, avatarUrl: getRandomAvatarUrl(), isHost: false },
          ],
        },
      });
    },

    setFirestoreDocId: docId => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, firestoreDocId: docId } });
    },

    updateStatus: status => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, status } });
    },

    setCaseData: data => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, caseData: data } });
    },

    setCurrentMission: index => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, currentMission: index } });
    },

    setMissionSolved: solved => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, missionSolved: solved } });
    },

    setReadyForNext: userIds => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, readyForNext: userIds } });
    },

    setTotalWrongAttempts: count => {
      const { room } = get();
      if (!room) {
        return;
      }
      set({ room: { ...room, totalWrongAttempts: count } });
    },

    reset: () =>
      set({
        room: null,
        config: { topicId: null, gradeId: null, scopeId: null, customTopic: null, difficulty: null },
        userId: generateUserId(),
      }),
  }));
}

/**
 * Room 스토어의 현재 상태를 구독하는 훅
 *
 * 스토어 상태가 변경되면 컴포넌트가 리렌더돼요.
 * 반드시 RoomStoreProvider 내부에서 사용해야 해요.
 */
export function useRoomStore(): RoomState {
  const store = useContext(RoomStoreContext);
  if (!store) {
    throw new Error('useRoomStore must be used within RoomStoreProvider');
  }
  return useStore(store);
}

/**
 * Room 스토어의 API 객체를 반환하는 훅
 *
 * getState()로 구독 없이 최신 상태를 읽을 수 있어요.
 * 이벤트 핸들러나 useEffect 내부에서 사용하기 적합해요.
 */
export function useRoomStoreApi(): RoomStore {
  const store = useContext(RoomStoreContext);
  if (!store) {
    throw new Error('useRoomStoreApi must be used within RoomStoreProvider');
  }
  return store;
}
