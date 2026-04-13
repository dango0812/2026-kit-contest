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

  // ── 국어 × 초등학교 ──
  'korean:e1': [
    { id: 'ko-e1-1', label: '글자와 소리', description: '한글의 자음·모음 익히기' },
    { id: 'ko-e1-2', label: '짧은 글 읽기', description: '그림일기, 짧은 이야기 읽기' },
  ],
  'korean:e2': [
    { id: 'ko-e2-1', label: '문장 만들기', description: '바른 문장 구조 익히기' },
    { id: 'ko-e2-2', label: '이야기 읽고 이해하기', description: '등장인물, 사건, 배경 파악' },
  ],
  'korean:e3': [
    { id: 'ko-e3-1', label: '문단의 구조', description: '중심 문장과 뒷받침 문장' },
    { id: 'ko-e3-2', label: '시와 이야기', description: '문학 작품 감상하기' },
    { id: 'ko-e3-3', label: '국어사전 활용', description: '낱말의 뜻 찾기' },
  ],
  'korean:e4': [
    { id: 'ko-e4-1', label: '글의 종류', description: '설명문, 논설문, 감상문' },
    { id: 'ko-e4-2', label: '읽기 전략', description: '요약하기, 추론하기' },
    { id: 'ko-e4-3', label: '토의와 토론', description: '주장과 근거 말하기' },
  ],
  'korean:e5': [
    { id: 'ko-e5-1', label: '문법 기초', description: '품사와 문장 성분' },
    { id: 'ko-e5-2', label: '비문학 읽기', description: '설명문·논설문 분석' },
    { id: 'ko-e5-3', label: '문학 감상', description: '시·소설의 표현 기법' },
  ],
  'korean:e6': [
    { id: 'ko-e6-1', label: '관용 표현', description: '속담, 관용어, 한자성어' },
    { id: 'ko-e6-2', label: '글쓰기', description: '목적에 맞는 글쓰기' },
    { id: 'ko-e6-3', label: '매체 이해', description: '뉴스·광고 비판적 읽기' },
  ],
  'korean:m1': [
    { id: 'ko-m1-1', label: '음운과 단어', description: '음운 변동, 품사 분류' },
    { id: 'ko-m1-2', label: '문학의 갈래', description: '시·소설·수필·희곡' },
    { id: 'ko-m1-3', label: '읽기와 쓰기', description: '요약, 주장과 근거' },
  ],
  'korean:m2': [
    { id: 'ko-m2-1', label: '문장과 담화', description: '문장 성분, 높임법' },
    { id: 'ko-m2-2', label: '문학 감상', description: '화자·서술자 시점 분석' },
    { id: 'ko-m2-3', label: '설득과 협상', description: '토론·협상 전략' },
  ],
  'korean:m3': [
    { id: 'ko-m3-1', label: '국어의 역사', description: '훈민정음과 국어의 변천' },
    { id: 'ko-m3-2', label: '한국 문학사', description: '고전~현대 문학 흐름' },
    { id: 'ko-m3-3', label: '비판적 읽기', description: '매체 문식성과 논증 분석' },
  ],
  'korean:h1': [
    { id: 'ko-h1-1', label: '언어와 국어', description: '국어의 특성과 변천' },
    { id: 'ko-h1-2', label: '문학과 삶', description: '문학 작품의 사회적 맥락' },
  ],
  'korean:h2': [
    { id: 'ko-h2-1', label: '독서와 의사소통', description: '비판적 독서, 학술적 글쓰기' },
    { id: 'ko-h2-2', label: '문학 심화', description: '작품 비평과 창작' },
  ],
  'korean:h3': [{ id: 'ko-h3-1', label: '국어 종합', description: '수능 대비 전 범위' }],

  // ── 과학 × 초등학교 ──
  'science:e1': [{ id: 'sc-e1-1', label: '봄·여름·가을·겨울', description: '계절 변화 관찰' }],
  'science:e2': [
    { id: 'sc-e2-1', label: '동물의 한살이', description: '동물의 성장 과정' },
    { id: 'sc-e2-2', label: '지구와 달', description: '지구·달의 모양과 운동' },
  ],
  'science:e3': [
    { id: 'sc-e3-1', label: '물질의 성질', description: '고체·액체·기체' },
    { id: 'sc-e3-2', label: '동물의 생활', description: '동물 분류와 특징' },
    { id: 'sc-e3-3', label: '지표의 변화', description: '풍화·침식·퇴적' },
  ],
  'science:e4': [
    { id: 'sc-e4-1', label: '식물의 한살이', description: '식물 성장 과정' },
    { id: 'sc-e4-2', label: '물의 상태 변화', description: '증발·응결·끓음' },
    { id: 'sc-e4-3', label: '혼합물의 분리', description: '거름·증발·자석' },
  ],
  'science:e5': [
    { id: 'sc-e5-1', label: '태양계와 별', description: '행성·별의 특징' },
    { id: 'sc-e5-2', label: '용해와 용액', description: '용해·농도·산성과 염기성' },
    { id: 'sc-e5-3', label: '물체의 운동', description: '속력과 운동 변화' },
  ],
  'science:e6': [
    { id: 'sc-e6-1', label: '전기의 이용', description: '전기 회로와 안전' },
    { id: 'sc-e6-2', label: '계절의 변화', description: '지구 자전축과 계절' },
    { id: 'sc-e6-3', label: '연소와 소화', description: '연소 조건과 소화 방법' },
  ],
  'science:m1': [
    { id: 'sc-m1-1', label: '힘과 운동', description: '중력, 마찰력, 뉴턴 법칙 기초' },
    { id: 'sc-m1-2', label: '물질의 구성', description: '원소, 원자, 분자' },
    { id: 'sc-m1-3', label: '생물의 다양성', description: '생물 분류와 진화' },
  ],
  'science:m2': [
    { id: 'sc-m2-1', label: '화학 반응', description: '화학식, 화학 반응식' },
    { id: 'sc-m2-2', label: '전기와 자기', description: '전류, 전압, 자기장' },
    { id: 'sc-m2-3', label: '소화와 순환', description: '인체의 소화·순환 기관' },
  ],
  'science:m3': [
    { id: 'sc-m3-1', label: '운동과 에너지', description: '일, 에너지, 전환' },
    { id: 'sc-m3-2', label: '생식과 유전', description: 'DNA, 유전 법칙' },
    { id: 'sc-m3-3', label: '별과 우주', description: '별의 진화, 우주 팽창' },
  ],
  'science:h1': [
    { id: 'sc-h1-1', label: '통합과학', description: '물질·에너지·생명·지구' },
    { id: 'sc-h1-2', label: '과학탐구실험', description: '과학적 탐구 방법' },
  ],
  'science:h2': [
    { id: 'sc-h2-1', label: '물리학', description: '역학, 파동, 전자기' },
    { id: 'sc-h2-2', label: '화학', description: '화학 결합, 반응 속도' },
    { id: 'sc-h2-3', label: '생명과학', description: '세포, 유전, 생태계' },
  ],
  'science:h3': [
    { id: 'sc-h3-1', label: '물리학 심화', description: '양자역학, 상대성 기초' },
    { id: 'sc-h3-2', label: '지구과학', description: '대기, 해양, 천체' },
  ],

  // ── 사회 × 초등학교 ──
  'social:e1': [{ id: 'so-e1-1', label: '학교생활', description: '학교와 친구' }],
  'social:e2': [{ id: 'so-e2-1', label: '이웃과 마을', description: '마을 사람들의 생활' }],
  'social:e3': [
    { id: 'so-e3-1', label: '우리 지역', description: '지역의 위치와 특성' },
    { id: 'so-e3-2', label: '교통과 통신', description: '교통수단과 통신의 발달' },
  ],
  'social:e4': [
    { id: 'so-e4-1', label: '촌락과 도시', description: '도시와 농촌 비교' },
    { id: 'so-e4-2', label: '필요한 것의 생산과 교환', description: '경제 활동의 기초' },
  ],
  'social:e5': [
    { id: 'so-e5-1', label: '국토와 자연환경', description: '우리나라의 자연환경' },
    { id: 'so-e5-2', label: '인권과 법', description: '인권 존중과 법의 역할' },
  ],
  'social:e6': [
    { id: 'so-e6-1', label: '세계 여러 나라', description: '대륙별 나라의 특징' },
    { id: 'so-e6-2', label: '정보화와 세계화', description: '지구촌 문제와 해결' },
  ],
  'social:m1': [
    { id: 'so-m1-1', label: '지리 기초', description: '지도, 기후, 지형' },
    { id: 'so-m1-2', label: '문화와 다양성', description: '세계의 문화권' },
  ],
  'social:m2': [
    { id: 'so-m2-1', label: '헌법과 인권', description: '기본권, 국가 기관' },
    { id: 'so-m2-2', label: '경제생활', description: '시장, 가격, 소비자' },
  ],
  'social:m3': [
    { id: 'so-m3-1', label: '사회 변동', description: '인구, 도시화, 정보화' },
    { id: 'so-m3-2', label: '국제 사회', description: '국제기구, 글로벌 이슈' },
  ],
  'social:h1': [{ id: 'so-h1-1', label: '통합사회', description: '인간, 사회, 환경 통합 탐구' }],
  'social:h2': [
    { id: 'so-h2-1', label: '정치와 법', description: '민주주의, 법 체계' },
    { id: 'so-h2-2', label: '경제', description: '시장경제, 국민경제' },
  ],
  'social:h3': [
    { id: 'so-h3-1', label: '사회·문화', description: '사회 계층, 문화 현상' },
    { id: 'so-h3-2', label: '윤리와 사상', description: '동서양 윤리와 사회윤리' },
  ],

  // ── 영어 ──
  'english:e1': [{ id: 'en-e1-1', label: '알파벳과 인사', description: 'ABC, 기본 인사말' }],
  'english:e2': [{ id: 'en-e2-1', label: '숫자와 색깔', description: '숫자, 색깔, 기본 단어' }],
  'english:e3': [
    { id: 'en-e3-1', label: '일상 대화', description: '자기소개, 좋아하는 것' },
    { id: 'en-e3-2', label: '기초 문장', description: 'I am / You are 문장 패턴' },
  ],
  'english:e4': [
    { id: 'en-e4-1', label: '현재 시제', description: '긍정문·부정문·의문문' },
    { id: 'en-e4-2', label: '읽기와 쓰기', description: '짧은 이야기 읽기' },
  ],
  'english:e5': [
    { id: 'en-e5-1', label: '과거 시제', description: '일반동사·be동사 과거형' },
    { id: 'en-e5-2', label: '비교 표현', description: '비교급·최상급 기초' },
  ],
  'english:e6': [
    { id: 'en-e6-1', label: '미래 표현', description: 'will, be going to' },
    { id: 'en-e6-2', label: '문장 구조', description: '접속사, 전치사 활용' },
  ],
  'english:m1': [
    { id: 'en-m1-1', label: '시제 종합', description: '현재·과거·미래 시제 활용' },
    { id: 'en-m1-2', label: '문장의 형식', description: '5형식 문장 구조' },
  ],
  'english:m2': [
    { id: 'en-m2-1', label: '준동사', description: '부정사, 동명사, 분사' },
    { id: 'en-m2-2', label: '관계사', description: '관계대명사, 관계부사' },
  ],
  'english:m3': [
    { id: 'en-m3-1', label: '가정법', description: '가정법 과거·과거완료' },
    { id: 'en-m3-2', label: '독해 전략', description: '주제·요지 파악, 추론' },
  ],
  'english:h1': [{ id: 'en-h1-1', label: '영어 I', description: '고급 문법, 독해 심화' }],
  'english:h2': [{ id: 'en-h2-1', label: '영어 II', description: '에세이, 토론, 발표' }],
  'english:h3': [{ id: 'en-h3-1', label: '영어 종합', description: '수능 대비 독해·문법' }],

  // ── 미술 ──
  'art:e1': [{ id: 'ar-e1-1', label: '색과 모양', description: '기본 색과 도형 표현' }],
  'art:e2': [{ id: 'ar-e2-1', label: '그림 그리기', description: '관찰하며 그리기' }],
  'art:e3': [
    { id: 'ar-e3-1', label: '색의 혼합', description: '삼원색과 색 혼합' },
    { id: 'ar-e3-2', label: '만들기', description: '다양한 재료로 만들기' },
  ],
  'art:e4': [
    { id: 'ar-e4-1', label: '원근법 기초', description: '가까이·멀리 표현하기' },
    { id: 'ar-e4-2', label: '미술 감상', description: '작품 감상과 비평' },
  ],
  'art:e5': [
    { id: 'ar-e5-1', label: '조형 요소', description: '점·선·면·색 활용' },
    { id: 'ar-e5-2', label: '디자인', description: '생활 속 디자인' },
  ],
  'art:e6': [
    { id: 'ar-e6-1', label: '미술사 기초', description: '한국·세계 미술 작품' },
    { id: 'ar-e6-2', label: '미디어 아트', description: '디지털 미술 체험' },
  ],
  'art:m1': [{ id: 'ar-m1-1', label: '미술과 표현', description: '다양한 재료와 기법' }],
  'art:m2': [{ id: 'ar-m2-1', label: '미술과 문화', description: '시대별 미술 사조' }],
  'art:m3': [{ id: 'ar-m3-1', label: '미술 비평', description: '작품 분석과 비평 방법' }],
  'art:h1': [{ id: 'ar-h1-1', label: '미술 창작', description: '주제 탐색과 창작' }],
  'art:h2': [{ id: 'ar-h2-1', label: '미술 감상과 비평', description: '깊이 있는 작품 감상' }],
  'art:h3': [{ id: 'ar-h3-1', label: '미술 종합', description: '창작·감상·비평 통합' }],

  // ── 음악 ──
  'music:e1': [{ id: 'mu-e1-1', label: '노래 부르기', description: '바른 자세로 노래하기' }],
  'music:e2': [{ id: 'mu-e2-1', label: '리듬과 박자', description: '2박자, 3박자 느끼기' }],
  'music:e3': [
    { id: 'mu-e3-1', label: '음표와 쉼표', description: '음표 종류와 길이' },
    { id: 'mu-e3-2', label: '악기 탐색', description: '다양한 악기 알아보기' },
  ],
  'music:e4': [
    { id: 'mu-e4-1', label: '음계', description: '도레미파솔라시도' },
    { id: 'mu-e4-2', label: '합주', description: '리코더·타악기 합주' },
  ],
  'music:e5': [
    { id: 'mu-e5-1', label: '화음과 화성', description: '으뜸화음·딸림화음' },
    { id: 'mu-e5-2', label: '국악 기초', description: '전통 음악의 특징' },
  ],
  'music:e6': [
    { id: 'mu-e6-1', label: '음악 감상', description: '클래식·국악 감상' },
    { id: 'mu-e6-2', label: '창작', description: '간단한 멜로디 만들기' },
  ],
  'music:m1': [{ id: 'mu-m1-1', label: '음악의 요소', description: '박자, 리듬, 선율, 화성' }],
  'music:m2': [{ id: 'mu-m2-1', label: '음악사', description: '서양 음악사 흐름' }],
  'music:m3': [{ id: 'mu-m3-1', label: '음악과 사회', description: '대중음악, 미디어 음악' }],
  'music:h1': [{ id: 'mu-h1-1', label: '음악 이론', description: '조성, 화성, 형식' }],
  'music:h2': [{ id: 'mu-h2-1', label: '음악 감상과 비평', description: '깊이 있는 음악 감상' }],
  'music:h3': [{ id: 'mu-h3-1', label: '음악 종합', description: '연주·감상·창작 통합' }],
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

/** 특정 scope의 label과 description을 반환합니다. */
export function getScopeInfo(
  topicId: TopicId,
  gradeId: string,
  scopeId: string,
): { label: string; description?: string } {
  const scopes = getCurriculumScopes(topicId, gradeId);
  const scope = scopes.find(s => s.id === scopeId);
  return { label: scope?.label ?? scopeId, description: scope?.description };
}
