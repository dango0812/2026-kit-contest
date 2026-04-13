import { useEffect, useState } from 'react';

import { IconClue, IconImage, IconLightbulb, IconLock, IconPuzzle, IconSearch } from '@assets/icons';
import detectiveSearch from '@assets/lotties/detective-search.json';
import type { CaseData, MissionFinalDeduction, MissionImageGuess, MissionRoleShare } from '@database/geminiService';
import {
  addFirestoreRoomReadyUser,
  incrementFirestoreWrongAttempts,
  subscribeToRoom,
  updateFirestoreRoomMission,
  updateFirestoreRoomMissionSolved,
  updateFirestoreRoomStatus,
} from '@database/roomService';
import { useRoomStore, useRoomStoreApi } from '@features/room/useRoomStore';
import { useToast } from '@shared/hooks/useToast';
import { vars } from '@shared/styles';
import { Button, Flex, Lottie, Text } from '@shared/ui';
import confetti from 'canvas-confetti';
import clsx from 'clsx';

import * as styles from './styles.css';

const MISSION_ICONS = [
  <IconSearch key="search" width={16} height={16} aria-hidden="true" />,
  <IconImage key="image" width={16} height={16} aria-hidden="true" />,
  <IconPuzzle key="puzzle" width={16} height={16} aria-hidden="true" />,
] as const;

const MISSION_LABELS = ['미션 1: 단서 공유', '미션 2: 이미지 추리', '미션 3: 최종 추리'] as const;

interface InvestigationProps {
  isHost: boolean;
  onFinish: () => void;
}

export function Investigation({ isHost, onFinish }: InvestigationProps) {
  const { room, userId, config } = useRoomStore();
  const storeApi = useRoomStoreApi();
  const showToast = useToast();
  const caseData = room?.caseData as CaseData | null;
  const currentMission = room?.currentMission ?? 0;
  const missionSolved = room?.missionSolved ?? false;
  const readyForNext = room?.readyForNext ?? [];
  const participants = room?.participants ?? [];
  const firestoreDocId = room?.firestoreDocId ?? null;

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [wrongChoice, setWrongChoice] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  // 완료 시 화면 전환 상태
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const totalWrongAttempts = room?.totalWrongAttempts ?? 0;
  const DIFFICULTY_LIMITS: Record<string, number> = { hard: 2, normal: 3, easy: 5 };
  const maxWrongAttempts = DIFFICULTY_LIMITS[config.difficulty ?? 'normal'] ?? 3;
  const isEliminated = room?.status === 'failed';

  // Firestore 실시간 구독 — 미션 진행 상태 동기화
  useEffect(() => {
    if (!firestoreDocId) {
      return;
    }
    const unsubscribe = subscribeToRoom(firestoreDocId, firestoreRoom => {
      if (!firestoreRoom) {
        return;
      }
      const store = storeApi.getState();
      store.setCurrentMission(firestoreRoom.currentMission ?? 0);
      store.setMissionSolved(firestoreRoom.missionSolved ?? false);
      store.setReadyForNext(firestoreRoom.readyForNext ?? []);
      store.updateStatus(firestoreRoom.status);
      store.syncParticipants(firestoreRoom.participants);

      if (typeof store.setTotalWrongAttempts === 'function') {
        store.setTotalWrongAttempts(firestoreRoom.totalWrongAttempts ?? 0);
      }
    });
    return () => unsubscribe();
  }, [firestoreDocId, storeApi]);

  // currentMission이 Firestore에서 변경되면 로컬 상태 리셋
  useEffect(() => {
    setSelectedChoice(null);
    setWrongChoice(null);
    setWrongAttempts(0);
  }, [currentMission]);

  // 전원 준비 완료 시 자동으로 다음 미션 진행
  useEffect(() => {
    if (!firestoreDocId || !missionSolved || readyForNext.length === 0) {
      return;
    }
    if (readyForNext.length < participants.length) {
      return;
    }
    if (!isHost) {
      return;
    }

    updateFirestoreRoomMission(firestoreDocId, currentMission + 1);
  }, [readyForNext.length, participants.length, missionSolved, firestoreDocId, isHost, currentMission]);

  // 축하 화면 — 폭죽 효과
  useEffect(() => {
    if (!showCelebration) {
      return;
    }

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#0BB56F', '#1DC883', '#FFD35C', '#FF9B04'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#0BB56F', '#1DC883', '#FFD35C', '#FF9B04'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    requestAnimationFrame(frame);

    const timer = setTimeout(() => {
      setShowCelebration(false);
      setShowSummary(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showCelebration]);

  if (!caseData) {
    return null;
  }

  // 축하 화면
  if (showCelebration) {
    return <CelebrationScreen />;
  }

  // 학습 요약 화면
  if (showSummary) {
    return <StudySummary caseData={caseData} onFinish={onFinish} />;
  }

  // 수사 실패 화면
  if (isEliminated) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.resultWrapper}>
          <Lottie src={detectiveSearch} loop autoplay width={160} height={160} />
          <Text
            fontSize="h6"
            fontWeight="bold"
            color={vars.color.grey[800]}
            style={{ textAlign: 'center', whiteSpace: 'pre-line' }}
          >
            {'수사에 실패했어요.\n다시 도전해 보세요!'}
          </Text>
          <Button fullWidth onClick={onFinish}>
            로비로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const mission = caseData.missions[currentMission];
  const isLastMission = currentMission >= 2;
  const isReady = readyForNext.includes(userId);

  const handleCorrectAnswer = async () => {
    if (!firestoreDocId || missionSolved) {
      return;
    }
    await updateFirestoreRoomMissionSolved(firestoreDocId);
  };

  const handleSubmitChoice = async (correctIndex: number) => {
    if (selectedChoice === null) {
      return;
    }
    if (selectedChoice === correctIndex) {
      await handleCorrectAnswer();
    } else {
      const wrong = selectedChoice;
      setWrongChoice(wrong);
      setWrongAttempts(prev => prev + 1);
      if (firestoreDocId) {
        await incrementFirestoreWrongAttempts(firestoreDocId, maxWrongAttempts);
      }
      showToast('틀렸어요! 다시 시도해보세요', { color: 'error' });
      setTimeout(() => {
        setSelectedChoice(null);
        setWrongChoice(null);
      }, 800);
    }
  };

  const handleReady = async () => {
    if (!firestoreDocId || isReady) {
      return;
    }
    await addFirestoreRoomReadyUser(firestoreDocId, userId);
  };

  const handleComplete = () => {
    setShowCelebration(true);
    if (isHost && firestoreDocId) {
      updateFirestoreRoomStatus(firestoreDocId, 'finished');
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* 진행률 바 */}
      <div className={styles.progressBar}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={clsx(
              styles.progressDot,
              i < currentMission ? styles.progressDotDone : undefined,
              i === currentMission ? styles.progressDotActive : undefined,
            )}
          />
        ))}
      </div>

      {/* 남은 기회 */}
      {totalWrongAttempts > 0 ? (
        <Flex justify="flex-end" style={{ padding: '0 12px' }}>
          <Text
            fontSize="caption"
            color={maxWrongAttempts - totalWrongAttempts <= 1 ? vars.color.red[500] : vars.color.grey[500]}
          >
            남은 기회: {maxWrongAttempts - totalWrongAttempts}/{maxWrongAttempts}
          </Text>
        </Flex>
      ) : null}

      {/* 미션 라벨 */}
      <div className={styles.missionContent}>
        <div className={styles.missionLabel}>
          {MISSION_ICONS[currentMission]}
          <Text fontSize="caption" fontWeight="semibold">
            {MISSION_LABELS[currentMission]}
          </Text>
        </div>

        {/* 사건 제목 */}
        <Text fontSize="body2" color={vars.color.grey[500]}>
          {caseData.briefing.caseTitle}
        </Text>

        {/* 미션이 해결되었으면 결과 표시 */}
        {missionSolved ? (
          <MissionResult
            mission={mission}
            isLastMission={isLastMission}
            readyCount={readyForNext.length}
            totalCount={participants.length}
            isReady={isReady}
            onReady={handleReady}
            onComplete={handleComplete}
          />
        ) : (
          <>
            {/* 미션별 렌더링 */}
            {mission.type === 'roleShare' ? (
              <RoleShareMission
                mission={mission}
                isHost={isHost}
                selectedChoice={selectedChoice}
                wrongChoice={wrongChoice}
                wrongAttempts={wrongAttempts}
                onSelect={setSelectedChoice}
              />
            ) : mission.type === 'imageGuess' ? (
              <ImageGuessMission
                mission={mission}
                selectedChoice={selectedChoice}
                wrongChoice={wrongChoice}
                wrongAttempts={wrongAttempts}
                onSelect={setSelectedChoice}
              />
            ) : (
              <FinalDeductionMission
                mission={mission}
                selectedChoice={selectedChoice}
                wrongChoice={wrongChoice}
                wrongAttempts={wrongAttempts}
                onSelect={setSelectedChoice}
              />
            )}

            {/* AI 힌트 — 역할별 다른 내용, 자동 표시 */}
            <div className={styles.aiHintSection}>
              <Flex align="center" gap="6">
                <IconLightbulb width={16} height={16} style={{ color: vars.color.green[600] }} aria-hidden="true" />
                <Text fontSize="caption" fontWeight="semibold" color={vars.color.green[600]}>
                  AI 힌트
                </Text>
              </Flex>
              <Text fontSize="caption" color={vars.color.green[600]}>
                {isHost && mission.type === 'roleShare' && mission.hostAiHint ? mission.hostAiHint : mission.aiHint}
              </Text>
            </div>

            {/* 제출하기 — 맨 아래 */}
            {mission.type !== 'roleShare' || !isHost ? (
              <div style={{ paddingBottom: '20px' }}>
                <Button
                  fullWidth
                  disabled={selectedChoice === null || wrongChoice !== null}
                  onClick={() => handleSubmitChoice(mission.answerIndex)}
                >
                  {mission.type === 'finalDeduction' ? '최종 답 제출하기' : '제출하기'}
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

Investigation.displayName = 'Investigation';

/* ────────────────────────────────────────────
 *  축하 화면 (수사 성공 시)
 * ──────────────────────────────────────────── */

function CelebrationScreen() {
  return (
    <div className={styles.celebrationWrapper}>
      <div className={styles.celebrationIconArea}>
        <span className={clsx(styles.floatingDot, styles.floatingDot1)} aria-hidden="true" />
        <span className={clsx(styles.floatingDot, styles.floatingDot2)} aria-hidden="true" />
        <span className={clsx(styles.floatingDot, styles.floatingDot3)} aria-hidden="true" />
        <span className={clsx(styles.floatingDot, styles.floatingDot4)} aria-hidden="true" />
        <span className={clsx(styles.floatingDot, styles.floatingDot5)} aria-hidden="true" />

        <div className={styles.celebrationCircle}>
          <svg width={40} height={40} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <Text fontSize="h5" fontWeight="bold" color={vars.color.grey[900]} style={{ textAlign: 'center' }}>
        협동 수사 성공!
      </Text>
      <Text fontSize="body2" color={vars.color.grey[500]} style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>
        {'두 정보가 결합되었습니다.\n사건의 진실에 한 걸음 다가섰습니다.'}
      </Text>
    </div>
  );
}

/* ────────────────────────────────────────────
 *  학습 요약 화면 (축하 후)
 * ──────────────────────────────────────────── */

const SUMMARY_LABELS = ['미션 1: 단서 공유', '미션 2: 이미지 추리', '미션 3: 최종 추리'];

function StudySummary({ caseData, onFinish }: { caseData: CaseData; onFinish: () => void }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.summaryWrapper}>
        <Flex direction="column" gap="6" align="center" style={{ paddingBottom: '8px' }}>
          <Text fontSize="h6" fontWeight="bold" color={vars.color.grey[900]}>
            수사 보고서
          </Text>
          <Text fontSize="body2" color={vars.color.grey[500]} style={{ textAlign: 'center' }}>
            이번 수사에서 배운 핵심 개념을 정리했어요
          </Text>
        </Flex>

        <Flex direction="column" gap="12">
          {caseData.missions.map((mission, i) => (
            <div key={i} className={styles.summaryCard}>
              <Flex align="center" gap="8">
                <div className={styles.summaryMissionIndex}>{i + 1}</div>
                <Text fontSize="caption" fontWeight="semibold" color={vars.color.green[700]}>
                  {SUMMARY_LABELS[i]}
                </Text>
              </Flex>
              {'conceptSummary' in mission && mission.conceptSummary ? (
                <Text fontSize="body2" color={vars.color.grey[700]}>
                  {mission.conceptSummary}
                </Text>
              ) : null}
              <Text fontSize="caption" color={vars.color.grey[500]}>
                {mission.explanation}
              </Text>
            </div>
          ))}
        </Flex>

        <div className={styles.footer}>
          <Button fullWidth onClick={onFinish}>
            로비로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
 *  공통 결과 화면 (미션 해결 후 모든 사용자에게 동일하게 표시)
 * ──────────────────────────────────────────── */

function MissionResult({
  mission,
  isLastMission,
  readyCount,
  totalCount,
  isReady,
  onReady,
  onComplete,
}: {
  mission: MissionRoleShare | MissionImageGuess | MissionFinalDeduction;
  isLastMission: boolean;
  readyCount: number;
  totalCount: number;
  isReady: boolean;
  onReady: () => void;
  onComplete: () => void;
}) {
  return (
    <>
      <div className={styles.explanationBox}>
        <Text fontSize="caption" fontWeight="semibold" color={vars.color.green[700]}>
          {isLastMission ? '정답! 사건 해결!' : '정답!'}
        </Text>
        <Text fontSize="body2" color={vars.color.grey[700]}>
          {mission.explanation}
        </Text>
      </div>

      {/* 핵심 개념 요약 */}
      {'conceptSummary' in mission && mission.conceptSummary ? (
        <div className={styles.conceptBox}>
          <Flex align="center" gap="6">
            <IconLightbulb width={16} height={16} style={{ color: vars.color.green[600] }} aria-hidden="true" />
            <Text fontSize="caption" fontWeight="semibold" color={vars.color.green[600]}>
              핵심 개념 정리
            </Text>
          </Flex>
          <Text fontSize="body2" color={vars.color.grey[700]}>
            {mission.conceptSummary}
          </Text>
        </div>
      ) : null}

      {'clueForNext' in mission && mission.clueForNext ? (
        <div className={styles.clueRevealCard}>
          <Flex align="center" gap="6">
            <IconClue width={16} height={16} style={{ color: vars.color.green[600] }} aria-hidden="true" />
            <Text fontSize="caption" fontWeight="semibold" color={vars.color.green[600]}>
              다음 미션 단서
            </Text>
          </Flex>
          <Text fontSize="body2" color={vars.color.grey[700]}>
            {mission.clueForNext}
          </Text>
        </div>
      ) : null}

      <div className={styles.footer}>
        {isLastMission ? (
          <Button fullWidth onClick={onComplete}>
            수사 종료 !
          </Button>
        ) : (
          <Flex direction="column" gap="8" align="center">
            <Text fontSize="caption" color={vars.color.grey[500]} aria-live="polite">
              {readyCount}/{totalCount}명 준비 완료
            </Text>
            <Button fullWidth disabled={isReady} onClick={onReady}>
              {isReady ? '팀원을 기다리는 중…' : '다음 미션 준비 완료'}
            </Button>
          </Flex>
        )}
      </div>
    </>
  );
}

/* ────────────────────────────────────────────
 *  미션 1: 역할별 정보 공유
 * ──────────────────────────────────────────── */

function RoleShareMission({
  mission,
  isHost,
  selectedChoice,
  wrongChoice,
  wrongAttempts,
  onSelect,
}: {
  mission: MissionRoleShare;
  isHost: boolean;
  selectedChoice: number | null;
  wrongChoice: number | null;
  wrongAttempts: number;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      {/* 호스트: 단서만 표시 */}
      {isHost ? (
        <div className={styles.clueCard}>
          <Flex align="center" gap="6">
            <IconLock width={16} height={16} style={{ color: vars.color.orange[600] }} aria-hidden="true" />
            <Text fontSize="caption" fontWeight="semibold" color={vars.color.orange[600]}>
              나만 볼 수 있는 단서
            </Text>
          </Flex>
          <Text fontSize="subtitle2" fontWeight="bold">
            {mission.hostClueTitle}
          </Text>
          <Text fontSize="body2" color={vars.color.grey[700]}>
            {mission.hostClueDescription}
          </Text>

          {/* 핵심 키워드 설명 */}
          {mission.hostKeywords?.length > 0 ? (
            <div className={styles.keywordList}>
              {mission.hostKeywords.map(kw => (
                <div key={kw.keyword} className={styles.keywordItem}>
                  <Text fontSize="caption" fontWeight="bold" color={vars.color.orange[700]}>
                    {kw.keyword}
                  </Text>
                  <Text fontSize="caption" color={vars.color.grey[600]}>
                    {kw.definition}
                  </Text>
                </div>
              ))}
            </div>
          ) : null}

          <Text fontSize="caption" color={vars.color.grey[500]} style={{ marginTop: '4px' }}>
            위 키워드를 중심으로 팀원에게 설명해 주세요!
          </Text>
        </div>
      ) : (
        /* 참가자: 4지선다 */
        <>
          <Text fontSize="body1" fontWeight="semibold">
            {mission.question}
          </Text>
          <ChoiceList
            choices={mission.choices}
            selectedChoice={selectedChoice}
            wrongChoice={wrongChoice}
            onSelect={onSelect}
          />
        </>
      )}

      {/* 오답 힌트 */}
      {wrongAttempts > 0 ? (
        <div className={styles.wrongHintBox}>
          <Flex align="center" gap="6">
            <IconLightbulb width={16} height={16} style={{ color: vars.color.orange[600] }} aria-hidden="true" />
            <Text fontSize="caption" fontWeight="semibold" color={vars.color.orange[600]}>
              힌트
            </Text>
          </Flex>
          <Text fontSize="body2" color={vars.color.grey[700]}>
            {mission.wrongAnswerHint}
          </Text>
        </div>
      ) : null}
    </>
  );
}

/* ────────────────────────────────────────────
 *  미션 2: 이미지 기반 추리
 * ──────────────────────────────────────────── */

function ImageGuessMission({
  mission,
  selectedChoice,
  wrongChoice,
  wrongAttempts,
  onSelect,
}: {
  mission: MissionImageGuess;
  selectedChoice: number | null;
  wrongChoice: number | null;
  wrongAttempts: number;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      {/* 이미지 */}
      <img
        src={
          mission.imageBase64 ??
          `https://placehold.co/600x400/e2e8f0/475569?font=noto&text=${encodeURIComponent(mission.imageKeyword)}`
        }
        alt="미션 이미지"
        className={styles.imageBox}
        width={600}
        height={400}
        loading="lazy"
      />

      {/* 질문 */}
      <Text fontSize="body1" fontWeight="semibold">
        {mission.question}
      </Text>

      {/* 관찰 단서 */}
      <div className={styles.clueCard}>
        <Flex align="center" gap="6">
          <IconSearch width={16} height={16} style={{ color: vars.color.orange[600] }} aria-hidden="true" />
          <Text fontSize="body2" fontWeight="medium">
            {mission.clue}
          </Text>
        </Flex>
      </div>

      {/* 4지선다 */}
      <ChoiceList
        choices={mission.choices}
        selectedChoice={selectedChoice}
        wrongChoice={wrongChoice}
        onSelect={onSelect}
      />

      {/* 오답 힌트 */}
      {wrongAttempts > 0 ? (
        <div className={styles.wrongHintBox}>
          <Flex align="center" gap="6">
            <IconLightbulb width={16} height={16} style={{ color: vars.color.orange[600] }} aria-hidden="true" />
            <Text fontSize="caption" fontWeight="semibold" color={vars.color.orange[600]}>
              힌트
            </Text>
          </Flex>
          <Text fontSize="body2" color={vars.color.grey[700]}>
            {mission.wrongAnswerHint}
          </Text>
        </div>
      ) : null}
    </>
  );
}

/* ────────────────────────────────────────────
 *  미션 3: 최종 추리
 * ──────────────────────────────────────────── */

function FinalDeductionMission({
  mission,
  selectedChoice,
  wrongChoice,
  wrongAttempts,
  onSelect,
}: {
  mission: MissionFinalDeduction;
  selectedChoice: number | null;
  wrongChoice: number | null;
  wrongAttempts: number;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      <Text fontSize="body1" fontWeight="semibold">
        {mission.question}
      </Text>

      <ChoiceList
        choices={mission.choices}
        selectedChoice={selectedChoice}
        wrongChoice={wrongChoice}
        onSelect={onSelect}
      />

      {/* 오답 힌트 */}
      {wrongAttempts > 0 ? (
        <div className={styles.wrongHintBox}>
          <Flex align="center" gap="6">
            <IconLightbulb width={16} height={16} style={{ color: vars.color.orange[600] }} aria-hidden="true" />
            <Text fontSize="caption" fontWeight="semibold" color={vars.color.orange[600]}>
              힌트
            </Text>
          </Flex>
          <Text fontSize="body2" color={vars.color.grey[700]}>
            {mission.wrongAnswerHint}
          </Text>
        </div>
      ) : null}
    </>
  );
}

/* ────────────────────────────────────────────
 *  공통: 4지선다 리스트
 * ──────────────────────────────────────────── */

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const;

function ChoiceList({
  choices,
  selectedChoice,
  wrongChoice,
  onSelect,
}: {
  choices: readonly [string, string, string, string];
  selectedChoice: number | null;
  wrongChoice: number | null;
  onSelect: (i: number) => void;
}) {
  return (
    <div className={styles.choiceList} role="radiogroup">
      {choices.map((choice, i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={i === selectedChoice}
          className={clsx(
            styles.choiceButton,
            wrongChoice === i
              ? styles.choiceButtonWrong
              : i === selectedChoice
                ? styles.choiceButtonSelected
                : undefined,
          )}
          onClick={() => onSelect(i)}
        >
          <span className={styles.choiceIndex}>{CHOICE_LABELS[i]}</span>
          <Text fontSize="body2">{choice}</Text>
        </button>
      ))}
    </div>
  );
}
