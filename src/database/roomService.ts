import type { TopicId } from '@constants/topics';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  type Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from './config';
import type { CaseData } from './geminiService';

/** Firestore에 저장되는 참가자 */
export interface FirestoreParticipant {
  id: string;
  nickname: string;
  avatarUrl: string;
  isHost: boolean;
  joinedAt: number;
}

/** Firestore에 저장되는 방 문서 */
export interface FirestoreRoom {
  roomCode: string;
  memberCount: number;
  topicId: TopicId;
  gradeId: string;
  scopeId: string;
  customTopic: string | null;
  difficulty: 'easy' | 'normal' | 'hard';
  participants: FirestoreParticipant[];
  status: 'waiting' | 'playing' | 'finished' | 'failed';
  caseData?: CaseData | null;
  /** 현재 진행 중인 미션 인덱스 (0~2) */
  currentMission?: number;
  /** 현재 미션이 해결되었는지 여부 */
  missionSolved?: boolean;
  /** 다음 미션 준비 완료한 사용자 ID 목록 */
  readyForNext?: string[];
  /** 총 오답 횟수 (전체 미션 누적) */
  totalWrongAttempts?: number;
  createdAt: ReturnType<typeof serverTimestamp>;
}

const ROOMS_COLLECTION = 'rooms';

/** 새 방을 Firestore에 생성합니다. */
export async function createFirestoreRoom(data: {
  roomCode: string;
  memberCount: number;
  topicId: TopicId;
  gradeId: string;
  scopeId: string;
  customTopic: string | null;
  difficulty: 'easy' | 'normal' | 'hard';
  host: { id: string; nickname: string; avatarUrl: string };
}): Promise<string> {
  const roomDoc: FirestoreRoom = {
    roomCode: data.roomCode,
    memberCount: data.memberCount,
    topicId: data.topicId,
    gradeId: data.gradeId,
    scopeId: data.scopeId,
    customTopic: data.customTopic,
    difficulty: data.difficulty,
    participants: [
      {
        id: data.host.id,
        nickname: data.host.nickname,
        avatarUrl: data.host.avatarUrl,
        isHost: true,
        joinedAt: Date.now(),
      },
    ],
    status: 'waiting',
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, ROOMS_COLLECTION), roomDoc);
  return docRef.id;
}

/** roomCode로 방 문서 ID를 조회합니다. */
export async function findRoomByCode(roomCode: string): Promise<{ docId: string; room: FirestoreRoom } | null> {
  const q = query(
    collection(db, ROOMS_COLLECTION),
    where('roomCode', '==', roomCode),
    where('status', '==', 'waiting'),
  );

  // query snapshot을 직접 가져옵니다
  const { getDocs } = await import('firebase/firestore');
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const docSnap = snapshot.docs[0];
  return { docId: docSnap.id, room: docSnap.data() as FirestoreRoom };
}

/** 방에 참가자를 추가합니다. */
export async function joinFirestoreRoom(
  docId: string,
  participant: { id: string; nickname: string; avatarUrl: string },
): Promise<boolean> {
  const roomRef = doc(db, ROOMS_COLLECTION, docId);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) {
    return false;
  }

  const roomData = roomSnap.data() as FirestoreRoom;

  if (roomData.participants.length >= roomData.memberCount) {
    return false;
  }

  const alreadyJoined = roomData.participants.some(p => p.id === participant.id);
  if (alreadyJoined) {
    return true;
  }

  const { arrayUnion } = await import('firebase/firestore');
  await updateDoc(roomRef, {
    participants: arrayUnion({
      id: participant.id,
      nickname: participant.nickname,
      avatarUrl: participant.avatarUrl,
      isHost: false,
      joinedAt: Date.now(),
    }),
  });

  return true;
}

/** 방에서 참가자를 제거합니다. */
export async function leaveFirestoreRoom(docId: string, participantId: string): Promise<void> {
  const roomRef = doc(db, ROOMS_COLLECTION, docId);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) {
    return;
  }

  const roomData = roomSnap.data() as FirestoreRoom;
  const updated = roomData.participants.filter(p => p.id !== participantId);

  await updateDoc(roomRef, { participants: updated });
}

/** 방의 멤버 수를 변경합니다. */
export async function updateFirestoreRoomMemberCount(docId: string, memberCount: number): Promise<void> {
  const roomRef = doc(db, ROOMS_COLLECTION, docId);
  await updateDoc(roomRef, { memberCount });
}

/** 방 상태를 변경합니다. */
export async function updateFirestoreRoomStatus(docId: string, status: FirestoreRoom['status']): Promise<void> {
  const roomRef = doc(db, ROOMS_COLLECTION, docId);
  await updateDoc(roomRef, { status });
}

/** 게임 데이터(브리핑 + 미션)를 저장합니다. */
export async function updateFirestoreRoomCaseData(docId: string, caseData: CaseData): Promise<void> {
  const roomRef = doc(db, ROOMS_COLLECTION, docId);
  await updateDoc(roomRef, { caseData, currentMission: 0, totalWrongAttempts: 0 });
}

/** 현재 미션 인덱스를 변경하고 solved/ready 상태를 초기화합니다. */
export async function updateFirestoreRoomMission(docId: string, missionIndex: number): Promise<void> {
  const roomRef = doc(db, ROOMS_COLLECTION, docId);
  await updateDoc(roomRef, { currentMission: missionIndex, missionSolved: false, readyForNext: [] });
}

/** 현재 미션을 해결 상태로 변경합니다. */
export async function updateFirestoreRoomMissionSolved(docId: string): Promise<void> {
  const roomRef = doc(db, ROOMS_COLLECTION, docId);
  await updateDoc(roomRef, { missionSolved: true, readyForNext: [] });
}

/** 다음 미션 준비 완료 사용자를 추가합니다. */
export async function addFirestoreRoomReadyUser(docId: string, userId: string): Promise<void> {
  const { arrayUnion } = await import('firebase/firestore');
  const roomRef = doc(db, ROOMS_COLLECTION, docId);
  await updateDoc(roomRef, { readyForNext: arrayUnion(userId) });
}

/** 오답 횟수를 1 증가시키고, 한계에 도달하면 status를 'failed'로 변경합니다. */
export async function incrementFirestoreWrongAttempts(docId: string, maxAttempts: number): Promise<void> {
  const { runTransaction } = await import('firebase/firestore');
  const roomRef = doc(db, ROOMS_COLLECTION, docId);

  await runTransaction(db, async transaction => {
    const roomSnap = await transaction.get(roomRef);
    if (!roomSnap.exists()) {
      return;
    }

    const data = roomSnap.data() as FirestoreRoom;
    const newCount = (data.totalWrongAttempts ?? 0) + 1;

    if (newCount >= maxAttempts) {
      transaction.update(roomRef, { totalWrongAttempts: newCount, status: 'failed' });
    } else {
      transaction.update(roomRef, { totalWrongAttempts: newCount });
    }
  });
}

/** 방을 삭제합니다. */
export async function deleteFirestoreRoom(docId: string): Promise<void> {
  await deleteDoc(doc(db, ROOMS_COLLECTION, docId));
}

/**
 * 방의 실시간 변경을 구독합니다.
 * Firestore onSnapshot을 사용하므로 WebSocket이 불필요합니다.
 */
export function subscribeToRoom(docId: string, callback: (room: FirestoreRoom | null) => void): Unsubscribe {
  const roomRef = doc(db, ROOMS_COLLECTION, docId);

  return onSnapshot(roomRef, snapshot => {
    if (snapshot.exists()) {
      callback(snapshot.data() as FirestoreRoom);
    } else {
      callback(null);
    }
  });
}
