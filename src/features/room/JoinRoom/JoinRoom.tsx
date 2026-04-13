import { useEffect, useState } from 'react';

import { getRandomAvatarUrl } from '@assets/avatars';
import { TOPICS } from '@constants/topics';
import { findRoomByCode, type FirestoreRoom, joinFirestoreRoom, subscribeToWaitingRooms } from '@database/roomService';
import { useRoomStore } from '@features/room/useRoomStore';
import { useToast } from '@shared/hooks/useToast';
import { vars } from '@shared/styles';
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
  const [rooms, setRooms] = useState<Array<{ docId: string; room: FirestoreRoom }>>([]);
  const showToast = useToast();
  const { userId } = useRoomStore();

  const canJoin = code.trim().length > 0 && nickname.trim().length > 0;

  useEffect(() => {
    const unsubscribe = subscribeToWaitingRooms(setRooms);
    return unsubscribe;
  }, []);

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

  const handleJoinRoom = async (docId: string, room: FirestoreRoom) => {
    if (loading || nickname.trim().length === 0) {
      if (nickname.trim().length === 0) {
        showToast('닉네임을 입력해 주세요', { color: 'error' });
      }
      return;
    }

    setLoading(true);
    try {
      if (room.participants.length >= room.memberCount) {
        showToast('인원이 가득 찼어요', { color: 'error' });
        return;
      }

      const success = await joinFirestoreRoom(docId, {
        id: userId,
        nickname: nickname.trim(),
        avatarUrl: getRandomAvatarUrl(),
      });

      if (success) {
        onJoin({
          roomCode: room.roomCode,
          nickname: nickname.trim(),
          firestoreDocId: docId,
        });
      } else {
        showToast('참가에 실패했어요', { color: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const getTopicLabel = (topicId: string) => TOPICS.find(t => t.id === topicId)?.label ?? topicId;

  return (
    <div className={styles.wrapper}>
      <TopBar>
        <TopBar.Back onBack={onBack} />
      </TopBar>

      <Flex direction="column" gap="24">
        <Text as="h2" fontSize="h6" fontWeight="bold" role="heading">
          수사대 합류
        </Text>

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

        <div className={styles.submitButton}>
          <Button fullWidth disabled={!canJoin} loading={loading} onClick={handleJoin}>
            코드로 합류하기
          </Button>
        </div>

        <Flex direction="column" gap="12">
          <Text as="span" fontSize="subtitle2" fontWeight="semibold">
            참가 가능한 수사대
          </Text>

          {rooms.length === 0 ? (
            <Flex justify="center" align="center" className={styles.emptyRoom}>
              <Text fontSize="body2" color={vars.color.grey[500]}>
                현재 참가 가능한 수사대가 없어요
              </Text>
            </Flex>
          ) : (
            <div className={styles.roomListWrapper}>
              <Flex as="ul" direction="column" gap="8" className={styles.roomList}>
                {rooms.map(({ docId, room }) => (
                  <li key={docId}>
                    <button
                      type="button"
                      className={styles.roomCard}
                      disabled={loading}
                      onClick={() => handleJoinRoom(docId, room)}
                      aria-label={`${getTopicLabel(room.topicId)} 수사대 참가`}
                    >
                      <Flex direction="column" gap="4">
                        <Flex align="center" gap="8">
                          <Text as="span" fontSize="body1" fontWeight="semibold">
                            {getTopicLabel(room.topicId)}
                          </Text>
                          <Text as="span" fontSize="caption" color={vars.color.grey[500]}>
                            {room.roomCode}
                          </Text>
                        </Flex>
                        <Text as="span" fontSize="body2" color={vars.color.grey[600]}>
                          {room.participants.length}/{room.memberCount}명
                        </Text>
                      </Flex>
                    </button>
                  </li>
                ))}
              </Flex>
            </div>
          )}
        </Flex>
      </Flex>
    </div>
  );
}

JoinRoom.displayName = 'JoinRoom';
