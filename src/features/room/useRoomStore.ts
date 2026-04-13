import { getRandomAvatarUrl } from '@assets/avatars';
import { create } from 'zustand';

export interface Participant {
  id: string;
  nickname: string;
  avatarUrl: string;
  isHost: boolean;
}

interface Room {
  roomCode: string;
  memberCount: number;
  participants: Participant[];
}

interface RoomState {
  room: Room | null;
  /** 방을 생성합니다. */
  createRoom: (roomCode: string, memberCount: number) => void;
  /** 방의 멤버 수를 업데이트합니다. */
  updateMemberCount: (count: number) => void;
  /** 방에 참가합니다. */
  joinRoom: (nickname: string) => void;
  /** 방 상태를 초기화합니다. */
  reset: () => void;
}

export const useRoomStore = create<RoomState>((set, get) => ({
  room: null,

  createRoom: (roomCode, memberCount) => {
    set({
      room: {
        roomCode,
        memberCount,
        participants: [{ id: crypto.randomUUID(), nickname: '나', avatarUrl: getRandomAvatarUrl(), isHost: true }],
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

  joinRoom: nickname => {
    const { room } = get();
    if (!room) {
      return;
    }

    const alreadyJoined = room.participants.some(p => p.nickname === nickname && !p.isHost);
    if (alreadyJoined) {
      return;
    }

    set({
      room: {
        ...room,
        participants: [
          ...room.participants,
          { id: crypto.randomUUID(), nickname, avatarUrl: getRandomAvatarUrl(), isHost: false },
        ],
      },
    });
  },

  reset: () => set({ room: null }),
}));
