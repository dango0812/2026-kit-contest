import { IconCalculator, IconScroll } from '@assets/icons';
import type { ComponentType, SVGProps } from 'react';

export interface Topic {
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  level: string;
}

export const TOPICS = [
  { id: 'history-kr', icon: IconScroll, label: '한국사', level: '중급' },
  { id: 'math', icon: IconCalculator, label: '수학추리', level: '고급' },
] as const satisfies readonly Topic[];

export type TopicId = (typeof TOPICS)[number]['id'];

export function getTopicLabel(topicId: string): string {
  return TOPICS.find(t => t.id === topicId)?.label ?? topicId;
}
