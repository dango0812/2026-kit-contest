import { useCallback, useEffect, useRef, useState } from 'react';

import detectiveSearch from '@assets/lotties/detective-search.json';
import { getScopeInfo } from '@constants/curriculum';
import { getGradeLabel } from '@constants/grades';
import { getTopicLabel } from '@constants/topics';
import { generateCaseData } from '@database/geminiService';
import { subscribeToRoom, updateFirestoreRoomCaseData, updateFirestoreRoomStatus } from '@database/roomService';
import { useRoomStore, useRoomStoreApi } from '@features/room/useRoomStore';
import { vars } from '@shared/styles';
import { Button, Flex, Lottie, Text } from '@shared/ui';

import * as styles from './styles.css';

const GENERATING_TEXTS = [
  '사건 현장을 살피는 중…',
  '용의자 단서를 수집하는 중…',
  '국비 사건 파일을 작성하는 중…',
  '수사 브리핑을 준비하는 중…',
  '암호화된 단서를 해독하는 중…',
] as const;

interface CaseBriefingProps {
  /** 호스트인지 여부 — 호스트만 Gemini API를 호출해요 */
  isHost: boolean;
  /** 수사 시작하기 클릭 시 */
  onStartMission: () => void;
}

export function CaseBriefing({ isHost, onStartMission }: CaseBriefingProps) {
  const { config, room } = useRoomStore();
  const storeApi = useRoomStoreApi();
  const caseData = room?.caseData ?? null;
  const briefing = caseData?.briefing ?? null;
  const [error, setError] = useState<string | null>(null);
  const [cycleIndex, setCycleIndex] = useState(0);
  const generatingRef = useRef(false);

  // 로딩 중 텍스트 순환
  useEffect(() => {
    if (briefing || error) {
      return;
    }
    const timer = setInterval(() => {
      setCycleIndex(prev => (prev + 1) % GENERATING_TEXTS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [briefing, error]);

  const topicId = config.topicId;
  const gradeId = config.gradeId;
  const scopeId = config.scopeId;
  const firestoreDocId = room?.firestoreDocId ?? null;

  // Firestore 실시간 구독 (게임 데이터 동기화용)
  useEffect(() => {
    if (!firestoreDocId) {
      return;
    }

    const unsubscribe = subscribeToRoom(firestoreDocId, firestoreRoom => {
      if (!firestoreRoom) {
        return;
      }

      const { setCaseData } = storeApi.getState();
      if (firestoreRoom.caseData) {
        setCaseData(firestoreRoom.caseData);
      }
    });

    return () => unsubscribe();
  }, [firestoreDocId, storeApi]);

  const fetchCaseData = useCallback(async () => {
    if (!topicId || !gradeId || !scopeId || !firestoreDocId) {
      return;
    }
    if (generatingRef.current) {
      return;
    }

    generatingRef.current = true;
    setError(null);

    try {
      const topicLabel = getTopicLabel(topicId);
      const gradeLabel = getGradeLabel(gradeId);
      const { label: scopeLabel, description: scopeDescription } = getScopeInfo(topicId, gradeId, scopeId);

      const result = await generateCaseData({
        topicLabel,
        gradeLabel,
        scopeLabel,
        scopeDescription,
      });

      // Firestore에 저장 → 구독을 통해 모든 화면에 동기화
      await updateFirestoreRoomCaseData(firestoreDocId, result);
    } catch {
      setError('사건을 만드는 중 문제가 발생했어요');
      await updateFirestoreRoomStatus(firestoreDocId, 'waiting');
    } finally {
      generatingRef.current = false;
    }
  }, [topicId, gradeId, scopeId, firestoreDocId]);

  // 호스트만 Gemini API 호출
  useEffect(() => {
    if (isHost && !caseData && !error) {
      fetchCaseData();
    }
  }, [isHost, caseData, error, fetchCaseData]);

  // 로딩 중
  if (!briefing && !error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loadingWrapper} aria-live="polite">
          <Lottie src={detectiveSearch} loop autoplay width={160} height={160} />
          <p className={styles.cyclingText} key={cycleIndex}>
            {GENERATING_TEXTS[cycleIndex]}
          </p>
        </div>
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div className={styles.wrapper}>
        <Flex direction="column" align="center" justify="center" gap="12" style={{ flex: 1 }}>
          <Text fontSize="body1" color={vars.color.grey[600]}>
            {error}
          </Text>
          {isHost ? (
            <Button size="small" color="secondary" onClick={fetchCaseData}>
              다시 시도
            </Button>
          ) : null}
        </Flex>
      </div>
    );
  }

  if (!briefing) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {/* 사건 제목 & 요약 */}
        <Flex direction="column">
          <Text as="span" fontSize="body1" fontWeight="medium" color={vars.color.grey[600]}>
            오늘의 사건
          </Text>
          <Text as="h2" fontSize="h6" fontWeight="bold" role="heading" style={{ color: 'inherit' }}>
            {briefing.caseTitle}
          </Text>
          <Text as="p" fontSize="body2" style={{ color: 'inherit', opacity: 0.9, marginTop: '10px' }}>
            {briefing.summary}
          </Text>
        </Flex>

        {/* 미션 미리보기 */}
        <Flex direction="column" gap="8">
          <Text as="h2" fontSize="subtitle2" fontWeight="semibold">
            수사 미션
          </Text>
          <div className={styles.cardList}>
            {['역할별 단서 공유', '이미지 추리', '최종 추리'].map((label, i) => (
              <div key={i} className={styles.missionPreview}>
                <span className={styles.missionIndex} aria-hidden="true">
                  {i + 1}
                </span>
                <Text fontSize="body2" fontWeight="medium">
                  {label}
                </Text>
              </div>
            ))}
          </div>
        </Flex>
      </div>

      <div className={styles.submitButton}>
        <Button fullWidth onClick={onStartMission}>
          수사 시작하기
        </Button>
      </div>
    </div>
  );
}

CaseBriefing.displayName = 'CaseBriefing';
