import { useEffect, useRef } from 'react';

import { IconCopy } from '@assets/icons';
import { useRoomStore } from '@features/room/useRoomStore';
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard';
import { useToast } from '@shared/hooks/useToast';
import { vars } from '@shared/styles';
import { Avatar, Badge, Button, Flex, Text, TopBar } from '@shared/ui';
import { generateCode } from '@shared/utils';

import * as styles from './styles.css';

const MEMBER_OPTIONS = [2, 3, 4] as const;
type MemberCount = (typeof MEMBER_OPTIONS)[number];

interface CreateRoomProps {
  onBack: () => void;
  isParticipant?: boolean;
}

export function CreateRoom({ onBack, isParticipant = false }: CreateRoomProps) {
  const { room, createRoom, updateMemberCount } = useRoomStore();
  const { copy } = useCopyToClipboard();
  const showToast = useToast();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!isParticipant && !room && !initializedRef.current) {
      initializedRef.current = true;
      createRoom(generateCode(), 2);
    }
  }, [isParticipant, room, createRoom]);

  const roomCode = room?.roomCode ?? '';

  const memberCount = (room?.memberCount ?? 2) as MemberCount;
  const participants = room?.participants ?? [];
  const emptySlots = memberCount - participants.length;

  const handleCopy = async () => {
    const success = await copy(roomCode);
    if (success) {
      showToast('입장 코드를 복사했어요', { color: 'success' });
    }
  };

  const handleMemberCountChange = (count: MemberCount) => {
    updateMemberCount(count);
  };

  return (
    <div className={styles.wrapper}>
      <TopBar>
        <TopBar.Back onBack={onBack} />
      </TopBar>

      <Flex direction="column" gap="20">
        <Text as="h1" fontSize="h6" fontWeight="bold" role="heading">
          수사대 모집 중
        </Text>

        {/* 인원 선택 */}
        <fieldset className={styles.memberFieldset}>
          <legend>
            <Text as="span" fontSize="body2" fontWeight="medium" color={vars.color.grey[600]}>
              인원 선택
            </Text>
          </legend>
          <div className={styles.memberGroup}>
            {MEMBER_OPTIONS.map(count => (
              <label key={count} className={memberCount === count ? styles.memberButtonSelected : styles.memberButton}>
                <input
                  type="radio"
                  name="memberCount"
                  value={count}
                  checked={memberCount === count}
                  onChange={() => handleMemberCountChange(count)}
                  disabled={isParticipant}
                  className={styles.radioInput}
                />
                {count}인
              </label>
            ))}
          </div>
        </fieldset>

        {/* 입장 코드 */}
        <div className={styles.section}>
          <Text as="span" fontSize="body2" fontWeight="medium" color={vars.color.grey[600]}>
            입장 코드
          </Text>
          <div className={styles.codeBox}>
            <Text as="span" fontSize="title2" fontWeight="medium">
              {roomCode}
            </Text>
            <button type="button" className={styles.copyButton} onClick={handleCopy} aria-label="입장 코드 복사">
              <IconCopy width={18} height={18} aria-hidden="true" focusable="false" />
            </button>
          </div>
        </div>

        {/* 참가자 */}
        <div className={styles.section}>
          <Flex align="center" gap="6">
            <Text as="span" fontSize="body2" fontWeight="medium" color={vars.color.grey[600]}>
              참가자
            </Text>
            <Badge size="small" color="primary" variant="subtle">
              {participants.length}/{memberCount}
            </Badge>
          </Flex>

          <Flex direction="column" gap="8">
            {participants.map(p => (
              <div key={p.id} className={styles.participantRow}>
                <Avatar src={p.avatarUrl} />
                <Text as="span" fontSize="body2" fontWeight="medium">
                  {p.isHost
                    ? isParticipant
                      ? '방장'
                      : `${p.nickname} (방장)`
                    : isParticipant
                      ? `${p.nickname} (나)`
                      : p.nickname}
                </Text>
              </div>
            ))}

            {emptySlots > 0 &&
              Array.from({ length: emptySlots }, (_, i) => (
                <div key={`empty-${i}`} className={styles.participantRow}>
                  <Avatar variant="empty" />
                  <Text as="span" fontSize="body2" color={vars.color.grey[400]}>
                    대기 중…
                  </Text>
                </div>
              ))}
          </Flex>
        </div>
      </Flex>

      <div className={styles.submitButton}>
        <Button fullWidth disabled={isParticipant}>
          {isParticipant ? '방장의 시작을 기다리는 중…' : '수사 시작하기'}
        </Button>
      </div>
    </div>
  );
}

CreateRoom.displayName = 'CreateRoom';
