import { createContext, useContext } from 'react';

import { getRandomAvatarUrl } from '@assets/avatars';
import type { TopicId } from '@constants/topics';
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
}

// 방 생성 시 설정하는 학습 옵션
interface RoomConfig {
  topicId: TopicId | null;
  gradeId: string | null;
  scopeId: string | null;
  customTopic: string | null;
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

    reset: () =>
      set({
        room: null,
        config: { topicId: null, gradeId: null, scopeId: null, customTopic: null },
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
