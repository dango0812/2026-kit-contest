import { useCallback } from 'react';

import { IconCopy } from '@assets/icons';
import { getGradeLabel } from '@constants/grades';
import { getTopicLabel } from '@constants/topics';
import { useRoomStore } from '@features/room/useRoomStore';
import { useBoolean } from '@shared/hooks/useBoolean';
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard';
import { useToast } from '@shared/hooks/useToast';
import { vars } from '@shared/styles';
import { Avatar, Badge, Button, Flex, Modal, Text, TopBar } from '@shared/ui';

import { useFirestoreRoom } from './useFirestoreRoom';

import * as styles from './styles.css';

const MEMBER_OPTIONS = [2, 3, 4] as const;
type MemberCount = (typeof MEMBER_OPTIONS)[number];

interface CreateRoomProps {
  onBack: () => void;
  onLeave: () => void;
  onStartInvestigation: () => void;
  isParticipant?: boolean;
}

export function CreateRoom({ onBack, onLeave, onStartInvestigation, isParticipant = false }: CreateRoomProps) {
  const { room, config, userId } = useRoomStore();
  const { copy } = useCopyToClipboard();
  const showToast = useToast();
  const leaveModal = useBoolean();

  const { changeMemberCount, deleteRoom, leaveRoom, startInvestigation } = useFirestoreRoom({
    isParticipant,
    onKicked: onLeave,
    onStatusPlaying: onStartInvestigation,
  });

  const roomCode = room?.roomCode ?? '';
  const memberCount = (room?.memberCount ?? 2) as MemberCount;
  const participants = room?.participants ?? [];
  const emptySlots = Math.max(0, memberCount - participants.length);

  const topicLabel = config.topicId ? getTopicLabel(config.topicId) : '';
  const gradeLabel = config.gradeId ? getGradeLabel(config.gradeId) : '';
  const description = topicLabel && gradeLabel ? `${topicLabel} · ${gradeLabel}` : '';

  const handleCopy = async () => {
    const success = await copy(roomCode);
    if (success) {
      showToast('입장 코드를 복사했어요', { color: 'success' });
    }
  };

  const handleBackClick = () => {
    leaveModal.handleTrue();
  };

  const handleLeaveConfirm = useCallback(async () => {
    leaveModal.handleFalse();
    if (isParticipant) {
      await leaveRoom();
      onBack();
    } else {
      await deleteRoom();
      onLeave();
    }
  }, [isParticipant, leaveRoom, deleteRoom, onBack, onLeave, leaveModal]);

  return (
    <div className={styles.wrapper}>
      <TopBar>
        <TopBar.Back onBack={handleBackClick} />
      </TopBar>

      <Flex direction="column" gap="20">
        <Flex direction="column" gap="4">
          <Text as="h2" fontSize="h6" fontWeight="bold" role="heading">
            수사대 모집 중
          </Text>
          {description ? (
            <Text as="p" fontSize="body2" color={vars.color.grey[500]}>
              {description}
            </Text>
          ) : null}
        </Flex>

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
                  onChange={() => changeMemberCount(count)}
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
                  {p.id === userId ? `${p.nickname} (나)` : p.isHost ? '방장' : p.nickname}
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
        <Button fullWidth disabled={isParticipant} onClick={startInvestigation}>
          {isParticipant ? '방장의 시작을 기다리는 중…' : '수사 시작하기'}
        </Button>
      </div>

      <Modal
        isOpen={leaveModal.value}
        title={isParticipant ? '방을 나갈까요?' : '수사를 종료할까요?'}
        description={isParticipant ? '방을 나가면 수사대에서 제외돼요.' : '방장이 나가면 모든 참가자가 함께 퇴장돼요.'}
        confirmLabel="나가기"
        cancelLabel="계속하기"
        onConfirm={handleLeaveConfirm}
        onCancel={leaveModal.handleFalse}
      />
    </div>
  );
}

CreateRoom.displayName = 'CreateRoom';
