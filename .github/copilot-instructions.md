# GitHub Copilot Instructions

## 커밋 컨벤션

- 형식: `type: 한국어로 간결하게 핵심 설명`
- 변경 사항이 여러 개면 bullet로 나열 (파일명 X, 변경 내용 O)
- type 종류: `feat` / `fix` / `docs` / `style` / `refactor` / `test` / `chore`
- `git add` 커맨드도 항목별로 함께 제공
- 예시:
  ```
  chore: Storybook main, preview 설정 추가
  - stories 경로 설정
  - 글로벌 스타일 import
  ```

---

## PR 작성 규칙

- PR 제목: `type: 한국어 요약`
- `## What` 섹션에 bullet로 변경 사항 설명
- 자세한 설명이 필요한 경우 `## Description` 섹션 추가
- `pull_request_template.md` 기반으로 PR Checklist 해당 항목 체크

---

## 일반 개발 규칙

- 기존에 만들어진 공유 컴포넌트(`src/shared/ui`)를 최대한 활용할 것
- SVG는 직접 JSX에 삽입하지 않고 `assets/icons`에 24×24 규격으로 넣어 사용
- 재사용 가능한 애니메이션은 `src/shared/styles/animations`에 분리
- 함께 수정되는 파일은 같은 디렉토리에 배치 (응집도 유지)

---

## 접근성 (Accessibility)

- 아이콘 전용 버튼에 `aria-label` 필수
- 폼 컨트롤에 `<label>` 또는 `aria-label` 필수
- 인터랙티브 요소에 키보드 핸들러 필수 (`onKeyDown`/`onKeyUp`)
- 액션은 `<button>`, 이동은 `<a>`/`<Link>` — `<div onClick>` 금지
- 이미지 `alt` 필수 (장식용은 `alt=""`)
- 장식용 아이콘에 `aria-hidden="true"`
- 비동기 업데이트(토스트, 유효성 검사)에 `aria-live="polite"`
- ARIA보다 시맨틱 HTML 우선 (`<button>`, `<a>`, `<label>`, `<table>`)
- 헤딩 계층 `<h1>`–`<h6>` 순서 준수

  이외에도 접근성 관련 규칙이 있다면 추가해주세요.

---

## 폼 (Forms)

- 입력 필드에 `autocomplete`와 의미있는 `name` 속성
- 적절한 `type` 사용 (`email`, `tel`, `url`, `number`) 및 `inputmode`
- 붙여넣기 막기 금지 (`onPaste` + `preventDefault` 사용 금지)
- 에러는 필드 옆에 인라인 표시; submit 시 첫 에러에 포커스
- submit 버튼은 요청 시작 전까지 활성화; 요청 중 스피너 표시

이외에도 폼 관련 규칙이 있다면 추가해주세요.

---

## 애니메이션

- `prefers-reduced-motion` 지원 (애니메이션 축소/비활성화)
- `transform` / `opacity`만 애니메이션 (컴포지터 친화적)
- `transition: all` 금지 — 속성을 명시적으로 나열
- SVG 애니메이션: `<g>` 래퍼에 `transform-box: fill-box; transform-origin: center`

---

## 타이포그래피

- 말줄임표: `…` (`...` 금지)
- 로딩 상태 텍스트: `"Loading…"`, `"Saving…"` 형식
- 숫자 컬럼/비교: `font-variant-numeric: tabular-nums`
- 헤딩에 `text-wrap: balance` 또는 `text-pretty` 적용

---

## 이미지 / 성능

- `<img>`에 `width`와 `height` 명시 (CLS 방지)
- 폴드 아래 이미지: `loading="lazy"`
- 폴드 위 핵심 이미지: `fetchpriority="high"`
- 50개 이상 목록: 가상화 적용 (`content-visibility: auto`)
- 렌더 중 레이아웃 읽기 금지 (`getBoundingClientRect`, `offsetHeight` 등)

이외에도 이미지/성능 관련 규칙이 있다면 추가해주세요.

---

## React 컴포넌트 최적화

### 파생 상태 (Derived State)

- props/state로 계산 가능한 값은 별도 state로 저장하거나 effect에서 업데이트하지 말 것 — 렌더 중에 직접 계산

  ```tsx
  // ❌
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(first + ' ' + last);
  }, [first, last]);

  // ✅
  const fullName = first + ' ' + last;
  ```

### Effect 의존성

- 객체 대신 필요한 원시값만 의존성으로 지정
  ```tsx
  // ❌ useEffect(() => { ... }, [user])
  // ✅ useEffect(() => { ... }, [user.id])
  ```
- 연속값 대신 파생 boolean을 구독 (불필요한 리렌더 방지)
  ```tsx
  // ❌ const width = useWindowWidth()
  // ✅ const isMobile = useMediaQuery('(max-width: 767px)')
  ```

### setState 함수형 업데이트

- 이전 state를 기반으로 업데이트할 때 함수형 업데이트 사용 (stale closure 방지)
  ```tsx
  // ❌ setItems([...items, newItem])  // items 의존성 필요
  // ✅ setItems(curr => [...curr, newItem])  // 의존성 불필요
  ```

### 조건부 렌더링

- `&&` 대신 명시적 삼항 연산자 사용 (`0`, `NaN` 등 falsy 값 렌더 방지)
  ```tsx
  // ❌ {count && <Badge />}  // count=0이면 "0" 렌더됨
  // ✅ {count > 0 ? <Badge /> : null}
  ```

### 정적 JSX 호이스팅

- 정적 JSX는 컴포넌트 외부로 이동 (매 렌더마다 재생성 방지)
  ```tsx
  // ❌ return <div>{loading && <LoadingSkeleton />}</div>  // 컴포넌트 내부 정의
  // ✅ const loadingSkeleton = <div className="..." />  // 외부 상수
  ```

### 지연 상태 초기화

- 무거운 초기값에 함수형 초기화 사용
  ```tsx
  // ❌ useState(JSON.parse(localStorage.getItem('key') || '{}'))
  // ✅ useState(() => JSON.parse(localStorage.getItem('key') || '{}'))
  ```

---

## 비동기 / 번들 최적화

### 병렬 실행

- 독립적인 비동기 작업은 `Promise.all()`로 병렬 처리
  ```ts
  // ❌ const a = await fetchA(); const b = await fetchB()
  // ✅ const [a, b] = await Promise.all([fetchA(), fetchB()])
  ```

### 동적 임포트

- 초기 렌더에 불필요한 무거운 컴포넌트는 `lazy()`로 지연 로드
  ```tsx
  const HeavyChart = lazy(() => import('./HeavyChart'));
  ```

### 배럴 파일 임포트 주의

- 아이콘 라이브러리 등 배럴 파일은 번들 크기 급증 유발
- Vite 환경에서 `optimizeDeps` 설정 또는 직접 경로 임포트 고려
