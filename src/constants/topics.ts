import {
  IconBook,
  IconCalculator,
  IconFlask,
  IconGlobe,
  IconLandmark,
  IconMusic,
  IconPalette,
  IconScroll,
} from '@assets/icons';
import type { ComponentType, SVGProps } from 'react';

export interface Topic {
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}

export const TOPICS = [
  { id: 'korean', icon: IconBook, label: '국어' },
  { id: 'math', icon: IconCalculator, label: '수학' },
  { id: 'science', icon: IconFlask, label: '과학' },
  { id: 'social', icon: IconGlobe, label: '사회' },
  { id: 'history-kr', icon: IconScroll, label: '한국사' },
  { id: 'english', icon: IconLandmark, label: '영어' },
  { id: 'art', icon: IconPalette, label: '미술' },
  { id: 'music', icon: IconMusic, label: '음악' },
] as const satisfies readonly Topic[];

export type TopicId = (typeof TOPICS)[number]['id'];

export function getTopicLabel(topicId: string): string {
  return TOPICS.find(t => t.id === topicId)?.label ?? topicId;
}
