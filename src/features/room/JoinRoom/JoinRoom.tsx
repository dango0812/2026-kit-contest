import { useState } from 'react';

import { getRandomAvatarUrl } from '@assets/avatars';
import { findRoomByCode, joinFirestoreRoom } from '@database/roomService';
import { useRoomStore } from '@features/room/useRoomStore';
import { useToast } from '@shared/hooks/useToast';
import { Button, Flex, Text, TextField, TopBar } from '@shared/ui';
import { generateNickname } from '@shared/utils';

import * as styles from './styles.css';

interface JoinRoomProps {
  onBack: () => void;
  onJoin: (info: { roomCode: string; nickname: string; firestoreDocId: string }) => void;
}

export function JoinRoom({ onBack, onJoin }: JoinRoomProps) {
  const [code, setCode] = useState('');
  const [nickname, setNickname] = useState(generateNickname);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const { userId } = useRoomStore();

  const canJoin = code.trim().length > 0 && nickname.trim().length > 0;

  const handleJoin = async () => {
    if (!canJoin || loading) {
      return;
    }

    setLoading(true);
    try {
      const result = await findRoomByCode(code.trim());

      if (!result) {
        showToast('존재하지 않는 입장 코드예요', { color: 'error' });
        return;
      }

      if (result.room.participants.length >= result.room.memberCount) {
        showToast('인원이 가득 찼어요', { color: 'error' });
        return;
      }

      const success = await joinFirestoreRoom(result.docId, {
        id: userId,
        nickname: nickname.trim(),
        avatarUrl: getRandomAvatarUrl(),
      });

      if (success) {
        onJoin({
          roomCode: code.trim(),
          nickname: nickname.trim(),
          firestoreDocId: result.docId,
        });
      } else {
        showToast('참가에 실패했어요', { color: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <TopBar>
        <TopBar.Back onBack={onBack} />
      </TopBar>

      <Flex direction="column" gap="24">
        <Text as="h1" fontSize="h6" fontWeight="bold" role="heading">
          수사대 합류
        </Text>

        <TextField
          id="join-code"
          label="입장 코드"
          className={styles.codeInput}
          name="roomCode"
          autoComplete="off"
          placeholder="A7B-2C0"
          value={code}
          maxLength={7}
          onChange={e => setCode(e.target.value.toUpperCase())}
        />

        <TextField
          id="join-nickname"
          label="닉네임 입력"
          name="nickname"
          autoComplete="nickname"
          placeholder="현장에서 불릴 이름을 입력해 주세요"
          value={nickname}
          maxLength={10}
          onChange={e => setNickname(e.target.value)}
        />
      </Flex>

      <div className={styles.submitButton}>
        <Button fullWidth disabled={!canJoin} loading={loading} onClick={handleJoin}>
          합류하기
        </Button>
      </div>
    </div>
  );
}

JoinRoom.displayName = 'JoinRoom';
