import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/* ────────────────────────────────────────────
 *  타입 정의
 * ──────────────────────────────────────────── */

/** 사건 브리핑 (간략 요약) */
export interface CaseBriefing {
  /** 사건 제목 */
  caseTitle: string;
  /** 사건 요약 (1~2문장) */
  summary: string;
}

/** 미션 1 — 역할별 정보 공유 (호스트: 텍스트만 / 참가자: 4지선다) */
export interface MissionRoleShare {
  type: 'roleShare';
  /** 호스트에게만 표시되는 단서 제목 */
  hostClueTitle: string;
  /** 호스트에게만 표시되는 단서 설명 */
  hostClueDescription: string;
  /** 호스트가 설명해야 할 핵심 키워드 배열 (키워드 + 쉬운 설명) */
  hostKeywords: Array<{ keyword: string; definition: string }>;
  /** 참가자에게 표시되는 질문 */
  question: string;
  /** 4지선다 보기 */
  choices: [string, string, string, string];
  /** 정답 인덱스 (0~3) */
  answerIndex: number;
  /** 호스트용 AI 힌트 (어떤 키워드를 중심으로 설명하면 좋을지 1문장) */
  hostAiHint: string;
  /** 참가자용 AI 힌트 (관련 공식·예제를 포함한 접근 전략 1문장) */
  aiHint: string;
  /** 오답 시 표시할 힌트 (정답을 유도하는 단서) */
  wrongAnswerHint: string;
  /** 해설 (정답 선택 후 표시) */
  explanation: string;
  /** 핵심 개념 한줄 요약 (결과 화면에 표시) */
  conceptSummary: string;
  /** 다음 미션을 위한 핵심 단서 (정답 후 모든 사용자에게 표시) */
  clueForNext: string;
}

/** 미션 2 — 이미지 기반 추리 (이미지 관찰 + 4지선다) */
export interface MissionImageGuess {
  type: 'imageGuess';
  /** 이미지 검색용 키워드 (Unsplash 쿼리, 영어 1~2단어) */
  imageKeyword: string;
  /** Gemini로 생성한 이미지 (base64 data URL) */
  imageBase64?: string;
  /** 이미지 관찰 유도 질문 (이미지를 보고 떠올릴 수 있는 질문) */
  question: string;
  /** 4지선다 보기 */
  choices: [string, string, string, string];
  /** 정답 인덱스 (0~3) */
  answerIndex: number;
  /** 단서 텍스트 */
  clue: string;
  /** 제출 전 AI 힌트 */
  aiHint: string;
  /** 오답 시 표시할 힌트 */
  wrongAnswerHint: string;
  /** 해설 */
  explanation: string;
  /** 핵심 개념 한줄 요약 */
  conceptSummary: string;
  /** 다음 미션을 위한 핵심 단서 */
  clueForNext: string;
}

/** 미션 3 — 최종 추리 (토론 후 4지선다) */
export interface MissionFinalDeduction {
  type: 'finalDeduction';
  /** 최종 질문 */
  question: string;
  /** 4지선다 보기 */
  choices: [string, string, string, string];
  /** 정답 인덱스 (0~3) */
  answerIndex: number;
  /** 제출 전 AI 힌트 */
  aiHint: string;
  /** 오답 시 표시할 힌트 */
  wrongAnswerHint: string;
  /** 해설 */
  explanation: string;
  /** 핵심 개념 한줄 요약 */
  conceptSummary: string;
}

export type Mission = MissionRoleShare | MissionImageGuess | MissionFinalDeduction;

/** Gemini가 생성한 전체 게임 데이터 */
export interface CaseData {
  briefing: CaseBriefing;
  missions: [MissionRoleShare, MissionImageGuess, MissionFinalDeduction];
}

/* ────────────────────────────────────────────
 *  Gemini API 호출
 * ──────────────────────────────────────────── */

function getModel() {
  return genAI.getGenerativeModel({
    model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash',
  });
}

/** JSON 응답에서 마크다운 코드블록을 제거하고 파싱합니다. */
function parseJSON<T>(text: string): T {
  const cleaned = text.replace(/```json\n?|```\n?/g, '').trim();
  return JSON.parse(cleaned) as T;
}

/**
 * Gemini REST API로 교육용 일러스트 이미지를 생성합니다.
 * Nano Banana (gemini-2.5-flash-image) 모델을 사용합니다.
 */
async function generateMissionImage(keyword: string): Promise<string | undefined> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[Gemini] API 키가 없어 이미지 생성을 건너뜁니다.');
    return undefined;
  }

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a simple, clean educational illustration for the concept: "${keyword}". The image should be colorful, friendly, suitable for students, and without any text or letters.`,
              },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
        },
      }),
    });

    if (!res.ok) {
      console.warn('[Gemini] 이미지 생성 HTTP 오류:', res.status);
      return undefined;
    }

    const json = await res.json();
    const parts = json?.candidates?.[0]?.content?.parts;
    if (!parts) {
      return undefined;
    }

    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    return undefined;
  } catch (error) {
    console.warn('[Gemini] 이미지 생성 실패:', error);
    return undefined;
  }
}

/**
 * Gemini API로 사건 브리핑 + 미션 3개를 한 번에 생성합니다.
 */
export async function generateCaseData(params: {
  topicLabel: string;
  gradeLabel: string;
  scopeLabel: string;
  scopeDescription?: string;
}): Promise<CaseData> {
  const model = getModel();

  const prompt = `너는 교육용 협동 추리 게임의 시나리오를 만드는 전문가야.
아래 조건에 맞는 게임 데이터를 JSON으로 생성해줘.

[조건]
- 과목: ${params.topicLabel}
- 학년: ${params.gradeLabel}
- 학습 범위: ${params.scopeLabel}${params.scopeDescription ? ` (${params.scopeDescription})` : ''}

[게임 구조]
1. "briefing": 사건 개요
   - "caseTitle": 흥미로운 사건 제목 (예: "사라진 실험 노트의 비밀")
   - "summary": 사건 상황을 1~2문장으로 간략히 설명

2. "missions": 정확히 3개의 미션 배열 (순서대로)

   미션 1 (roleShare): 역할별 정보 공유
   - "type": "roleShare"
   - "hostClueTitle": 호스트만 볼 수 있는 핵심 단서 제목
   - "hostClueDescription": 호스트만 볼 수 있는 단서 설명 (1~2문장)
   - "hostKeywords": 호스트가 설명해야 할 핵심 키워드 배열. 각 항목은 { "keyword": "용어", "definition": "학생 눈높이의 쉬운 설명 1문장" } 형태 (2~3개)
   - "question": 참가자들에게 표시되는 질문
   - "choices": 4지선다 보기 배열 (4개)
   - "answerIndex": 정답 인덱스 (0~3)
   - "aiHint": 참가자용 힌트 — 관련 공식이나 예제를 포함한 1문장 (예: "살인 공식: 동기+수단+기회 — 보기에서 이 세 요소를 찾아보세요")
   - "hostAiHint": 호스트용 힌트 — 어떤 핵심 키워드를 중심으로 설명하면 좋을지 1문장 (예: "'○○'와 '○○' 두 키워드를 먼저 강조하며 팀원에게 설명해 보세요")
   - "wrongAnswerHint": 오답 시 정답으로 유도하는 힌트 (1문장, 정답 직접 노출 금지)
   - "explanation": 해설 (1~2문장)
   - "conceptSummary": 이 미션에서 다룬 핵심 개념을 한 문장으로 정리 (예: "이항분포 B(n,p)의 기댓값은 np이다")
   - "clueForNext": 정답 후 모든 사용자에게 표시할 다음 미션 단서 (1문장)

   미션 2 (imageGuess): 이미지 관찰 추리
   - "type": "imageGuess"
   - "imageKeyword": 영어 키워드 1~2단어 (Unsplash 이미지 검색용, 구체적이고 시각적인 단어)
   - "question": 이미지를 관찰하고 답할 수 있는 질문 (이미지에서 볼 수 있는 시각적 특징과 연결, 예: "이 이미지에서 보이는 현상은 어떤 과학 원리와 연관될까요?")
   - "choices": 4지선다 보기 배열 (4개)
   - "answerIndex": 정답 인덱스 (0~3)
   - "clue": 이미지와 함께 표시할 관찰 유도 단서 (1문장, "이미지에서 ○○ 부분을 자세히 보세요" 형태)
   - "aiHint": 공식이나 학습 개념 예시를 포함한 접근 힌트 1문장 (예: "이 개념은 ○○로 정의됩니다 — 이미지에서 그 특징을 찾아보세요")
   - "wrongAnswerHint": 오답 시 정답으로 유도하는 힌트 (1문장, 정답 직접 노출 금지)
   - "explanation": 해설 (1~2문장)
   - "conceptSummary": 이 미션에서 다룬 핵심 개념 한 문장 정리
   - "clueForNext": 정답 후 모든 사용자에게 표시할 다음 미션 단서 (1문장)

   미션 3 (finalDeduction): 최종 추리
   - "type": "finalDeduction"
   - "question": 앞의 단서를 종합해야 풀 수 있는 최종 질문
   - "choices": 4지선다 보기 배열 (4개)
   - "answerIndex": 정답 인덱스 (0~3)
   - "aiHint": 핵심 공식·원리와 앞 미션 단서를 연결하는 힌트 1문장 (예: "○○ 원리를 미션 1·2의 단서와 종합하면 정답이 보여요")
   - "wrongAnswerHint": 오답 시 정답으로 유도하는 힌트 (1문장, 정답 직접 노출 금지)
   - "explanation": 해설 (1~2문장)
   - "conceptSummary": 이 미션에서 다룬 핵심 개념 한 문장 정리

[규칙]
- ${params.gradeLabel} 수준의 어휘와 난이도를 사용해
- 각 미션은 해당 학습 범위의 핵심 개념을 자연스럽게 포함해
- 미션 간에 스토리가 연결되어야 해 (앞 미션의 단서가 다음 미션에 영향)
- 미션 2의 imageKeyword는 실제 Unsplash에서 사진이 잘 나오는 구체적 시각 단어를 써 (예: "laboratory microscope", "ancient ruins")
- 미션 2의 질문은 이미지 관찰에서 출발해 학습 개념으로 연결되도록 설계해

반드시 아래 JSON 형식만 출력해. 다른 텍스트 없이 JSON만 응답해:
{
  "briefing": { "caseTitle": "string", "summary": "string" },
  "missions": [
    { "type": "roleShare", "hostClueTitle": "string", "hostClueDescription": "string", "hostKeywords": [{"keyword":"string","definition":"string"}], "question": "string", "choices": ["string","string","string","string"], "answerIndex": 0, "aiHint": "string", "hostAiHint": "string", "wrongAnswerHint": "string", "explanation": "string", "conceptSummary": "string", "clueForNext": "string" },
    { "type": "imageGuess", "imageKeyword": "string", "question": "string", "choices": ["string","string","string","string"], "answerIndex": 0, "clue": "string", "aiHint": "string", "wrongAnswerHint": "string", "explanation": "string", "conceptSummary": "string", "clueForNext": "string" },
    { "type": "finalDeduction", "question": "string", "choices": ["string","string","string","string"], "answerIndex": 0, "aiHint": "string", "wrongAnswerHint": "string", "explanation": "string", "conceptSummary": "string" }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const caseData = parseJSON<CaseData>(text);

    // 미션 2의 imageKeyword로 Gemini 이미지 생성
    const imageKeyword = caseData.missions[1].imageKeyword;
    if (imageKeyword) {
      const imageBase64 = await generateMissionImage(imageKeyword);
      if (imageBase64) {
        caseData.missions[1].imageBase64 = imageBase64;
      }
    }

    return caseData;
  } catch (error) {
    console.error('[Gemini] 게임 데이터 생성 실패:', error);
    throw error;
  }
}
