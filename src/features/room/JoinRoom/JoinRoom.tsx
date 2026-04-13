import { useState } from 'react';

import { Button, Flex, Text, TextField, TopBar } from '@shared/ui';
import { generateNickname } from '@shared/utils';

import * as styles from './styles.css';

interface JoinRoomProps {
  onBack: () => void;
  onJoin: (info: { roomCode: string; nickname: string }) => void;
}

export function JoinRoom({ onBack, onJoin }: JoinRoomProps) {
  const [code, setCode] = useState('');
  const [nickname, setNickname] = useState(generateNickname);

  const canJoin = code.trim().length > 0 && nickname.trim().length > 0;

  const handleJoin = () => {
    if (canJoin) {
      onJoin({ roomCode: code.trim(), nickname: nickname.trim() });
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
          placeholder="현장에서 불릴 이름을 입력하세요"
          value={nickname}
          maxLength={10}
          onChange={e => setNickname(e.target.value)}
        />
      </Flex>

      <div className={styles.submitButton}>
        <Button fullWidth disabled={!canJoin} onClick={handleJoin}>
          합류하기
        </Button>
      </div>
    </div>
  );
}

JoinRoom.displayName = 'JoinRoom';
