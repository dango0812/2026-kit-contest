import type { TopicId } from './topics';

export interface CurriculumScope {
  id: string;
  label: string;
  description?: string;
}

/**
 * 주제 + 학년별 교육 범위 데이터
 * key: `${topicId}:${gradeId}`
 */
const CURRICULUM_MAP: Record<string, CurriculumScope[]> = {
  // ── 한국사 × 초등학교 ──
  'history-kr:e1': [
    { id: 'hk-e1-1', label: '우리 가족의 이야기', description: '가족 구성원과 생활 변화' },
    { id: 'hk-e1-2', label: '우리 마을 탐험', description: '마을의 옛날과 오늘' },
  ],
  'history-kr:e2': [
    { id: 'hk-e2-1', label: '옛날과 오늘의 생활', description: '의식주의 변화' },
    { id: 'hk-e2-2', label: '우리 지역의 문화유산', description: '가까운 문화유산 알아보기' },
  ],
  'history-kr:e3': [
    { id: 'hk-e3-1', label: '우리 지역의 역사', description: '지역의 옛 이야기와 유적' },
    { id: 'hk-e3-2', label: '교통과 통신의 발달', description: '옛날과 오늘의 교통·통신' },
    { id: 'hk-e3-3', label: '가족의 형태 변화', description: '시대별 가족 구성 변화' },
  ],
  'history-kr:e4': [
    { id: 'hk-e4-1', label: '촌락과 도시의 생활', description: '도시와 농촌의 모습 비교' },
    { id: 'hk-e4-2', label: '사회 변화와 문화 다양성', description: '다문화 사회의 이해' },
    { id: 'hk-e4-3', label: '지역의 역사적 인물', description: '지역을 빛낸 인물 탐구' },
  ],
  'history-kr:e5': [
    { id: 'hk-e5-1', label: '선사시대와 고조선', description: '한반도의 첫 나라들' },
    { id: 'hk-e5-2', label: '삼국과 가야', description: '삼국의 성립과 발전' },
    { id: 'hk-e5-3', label: '통일신라와 발해', description: '남북국 시대' },
    { id: 'hk-e5-4', label: '고려의 성립과 발전', description: '고려의 문화와 대외 관계' },
  ],
  'history-kr:e6': [
    { id: 'hk-e6-1', label: '조선 건국과 발전', description: '조선의 건국부터 문화 발전' },
    { id: 'hk-e6-2', label: '조선 후기 사회 변화', description: '영·정조 시대와 실학' },
    { id: 'hk-e6-3', label: '근대 국가 수립 운동', description: '개항기와 독립 운동' },
    { id: 'hk-e6-4', label: '대한민국의 발전', description: '광복~현대 대한민국' },
  ],

  // ── 한국사 × 중학교 ──
  'history-kr:m1': [
    { id: 'hk-m1-1', label: '선사 문화와 고대 국가', description: '구석기~삼국의 정치·문화' },
    { id: 'hk-m1-2', label: '남북국 시대', description: '통일신라와 발해의 발전' },
    { id: 'hk-m1-3', label: '고려의 성립과 변천', description: '고려의 정치·경제·문화' },
  ],
  'history-kr:m2': [
    { id: 'hk-m2-1', label: '조선의 성립과 발전', description: '조선 전기 정치·사회' },
    { id: 'hk-m2-2', label: '조선 사회의 변동', description: '붕당, 수취 체제, 실학' },
    { id: 'hk-m2-3', label: '근대 국민 국가 수립', description: '개항~대한제국' },
  ],
  'history-kr:m3': [
    { id: 'hk-m3-1', label: '일제 강점과 민족 운동', description: '일제 강점기 독립 운동' },
    { id: 'hk-m3-2', label: '대한민국의 발전', description: '광복~민주화 운동' },
    { id: 'hk-m3-3', label: '북한과 평화 통일', description: '남북 관계와 통일 노력' },
  ],

  // ── 한국사 × 고등학교 ──
  'history-kr:h1': [
    { id: 'hk-h1-1', label: '전근대 한국사', description: '선사~조선 전기 통사' },
    { id: 'hk-h1-2', label: '근현대 한국사', description: '개항기~현대' },
    { id: 'hk-h1-3', label: '한국 문화사', description: '사상·예술·과학 발전' },
  ],
  'history-kr:h2': [
    { id: 'hk-h2-1', label: '동아시아 역사', description: '동아시아 국제 관계와 교류' },
    { id: 'hk-h2-2', label: '한국사 심화 탐구', description: '주제별 심층 분석' },
  ],
  'history-kr:h3': [
    { id: 'hk-h3-1', label: '한국사 종합', description: '수능 대비 전 범위 종합' },
    { id: 'hk-h3-2', label: '한국 근현대사 심화', description: '근현대사 핵심 쟁점' },
  ],

  // ── 수학추리 × 초등학교 ──
  'math:e1': [
    { id: 'mt-e1-1', label: '9까지의 수', description: '수 세기와 크기 비교' },
    { id: 'mt-e1-2', label: '덧셈과 뺄셈 (한 자리)', description: '받아올림 없는 연산' },
    { id: 'mt-e1-3', label: '여러 가지 모양', description: '기본 도형 인식' },
  ],
  'math:e2': [
    { id: 'mt-e2-1', label: '세 자리 수', description: '백의 자리까지의 수' },
    { id: 'mt-e2-2', label: '덧셈과 뺄셈 (두 자리)', description: '받아올림·받아내림' },
    { id: 'mt-e2-3', label: '곱셈 기초', description: '곱셈의 개념과 구구단' },
    { id: 'mt-e2-4', label: '시각과 시간', description: '시계 읽기, 시간 계산' },
  ],
  'math:e3': [
    { id: 'mt-e3-1', label: '곱셈과 나눗셈', description: '두 자리×한 자리, 나눗셈 기초' },
    { id: 'mt-e3-2', label: '분수', description: '분수의 개념과 크기 비교' },
    { id: 'mt-e3-3', label: '들이와 무게', description: '단위 환산과 어림' },
    { id: 'mt-e3-4', label: '원', description: '원의 구성 요소' },
  ],
  'math:e4': [
    { id: 'mt-e4-1', label: '큰 수', description: '만 이상의 수와 어림' },
    { id: 'mt-e4-2', label: '분수의 덧셈과 뺄셈', description: '동분모 분수 연산' },
    { id: 'mt-e4-3', label: '소수', description: '소수의 개념과 연산' },
    { id: 'mt-e4-4', label: '각도', description: '각도 측정과 삼각형·사각형' },
  ],
  'math:e5': [
    { id: 'mt-e5-1', label: '약수와 배수', description: '최대공약수, 최소공배수' },
    { id: 'mt-e5-2', label: '분수의 곱셈과 나눗셈', description: '이분모 분수 연산' },
    { id: 'mt-e5-3', label: '소수의 곱셈과 나눗셈', description: '소수 네 칙 연산' },
    { id: 'mt-e5-4', label: '넓이와 둘레', description: '다각형의 넓이 구하기' },
  ],
  'math:e6': [
    { id: 'mt-e6-1', label: '비와 비율', description: '비, 비율, 백분율' },
    { id: 'mt-e6-2', label: '비례식과 비례배분', description: '비례 관계 활용' },
    { id: 'mt-e6-3', label: '원의 넓이', description: '원주율과 원의 넓이' },
    { id: 'mt-e6-4', label: '경우의 수', description: '기초 경우의 수' },
  ],

  // ── 수학추리 × 중학교 ──
  'math:m1': [
    { id: 'mt-m1-1', label: '정수와 유리수', description: '양수, 음수, 유리수 개념' },
    { id: 'mt-m1-2', label: '문자와 식', description: '변수, 일차식, 등식' },
    { id: 'mt-m1-3', label: '일차방정식', description: '일차방정식 풀이와 활용' },
    { id: 'mt-m1-4', label: '좌표와 그래프', description: '좌표평면, 정비례·반비례' },
  ],
  'math:m2': [
    { id: 'mt-m2-1', label: '연립방정식', description: '이원 일차 연립방정식' },
    { id: 'mt-m2-2', label: '부등식', description: '일차부등식과 연립부등식' },
    { id: 'mt-m2-3', label: '일차함수', description: '일차함수의 그래프와 활용' },
    { id: 'mt-m2-4', label: '확률', description: '확률의 개념과 계산' },
  ],
  'math:m3': [
    { id: 'mt-m3-1', label: '이차방정식', description: '이차방정식 풀이와 근의 공식' },
    { id: 'mt-m3-2', label: '이차함수', description: '이차함수의 그래프' },
    { id: 'mt-m3-3', label: '피타고라스 정리', description: '직각삼각형과 활용' },
    { id: 'mt-m3-4', label: '삼각비', description: 'sin, cos, tan 기초' },
  ],

  // ── 수학추리 × 고등학교 ──
  'math:h1': [
    { id: 'mt-h1-1', label: '다항식', description: '다항식 연산, 인수분해' },
    { id: 'mt-h1-2', label: '방정식과 부등식', description: '이차·고차 방정식, 절댓값' },
    { id: 'mt-h1-3', label: '도형의 방정식', description: '직선, 원, 이동' },
    { id: 'mt-h1-4', label: '집합과 명제', description: '집합 연산, 명제와 증명' },
  ],
  'math:h2': [
    { id: 'mt-h2-1', label: '함수', description: '함수의 개념, 합성, 역함수' },
    { id: 'mt-h2-2', label: '수열', description: '등차, 등비 수열과 급수' },
    { id: 'mt-h2-3', label: '지수와 로그', description: '지수법칙, 로그 성질' },
    { id: 'mt-h2-4', label: '미적분 입문', description: '극한, 미분, 적분 기초' },
  ],
  'math:h3': [
    { id: 'mt-h3-1', label: '확률과 통계', description: '순열, 조합, 확률분포' },
    { id: 'mt-h3-2', label: '미적분', description: '고급 미분·적분 활용' },
    { id: 'mt-h3-3', label: '기하', description: '벡터, 공간도형, 이차곡선' },
  ],
};

/**
 * 주제와 학년에 해당하는 교육 범위 목록을 반환합니다.
 * 항상 "자유 범위"가 첫 번째로 포함됩니다.
 */
export function getCurriculumScopes(topicId: TopicId, gradeId: string): CurriculumScope[] {
  const key = `${topicId}:${gradeId}`;
  const scopes = CURRICULUM_MAP[key] ?? [];

  return [{ id: 'free', label: '자유 범위', description: '범위 제한 없이 자유롭게' }, ...scopes];
}
