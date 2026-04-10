import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    fontSize: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'title1',
        'title2',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
      ],
    },
    fontWeight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
    },
    lineHeight: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: { control: 'color' },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const SCALE: Array<{ fontSize: NonNullable<Parameters<typeof Text>[0]['fontSize']>; label: string }> = [
  { fontSize: 'h1', label: 'H1 · 56px Bold' },
  { fontSize: 'h2', label: 'H2 · 48px Bold' },
  { fontSize: 'h3', label: 'H3 · 40px Semibold' },
  { fontSize: 'h4', label: 'H4 · 36px Semibold' },
  { fontSize: 'h5', label: 'H5 · 32px Semibold' },
  { fontSize: 'h6', label: 'H6 · 28px Semibold' },
  { fontSize: 'title1', label: 'Title1 · 24px Semibold' },
  { fontSize: 'title2', label: 'Title2 · 22px Semibold' },
  { fontSize: 'subtitle1', label: 'Subtitle1 · 20px Semibold' },
  { fontSize: 'subtitle2', label: 'Subtitle2 · 18px Semibold' },
  { fontSize: 'body1', label: 'Body1 · 16px Regular' },
  { fontSize: 'body2', label: 'Body2 · 14px Regular' },
  { fontSize: 'caption', label: 'Caption · 12px Regular' },
];

export const Primary: Story = {
  args: {
    children: '텍스트 컴포넌트',
    fontSize: 'body1',
    fontWeight: 'medium',
    lineHeight: 'medium',
    as: 'p',
  },
};

export const Sizes: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {SCALE.map(({ fontSize, label }) => (
        <div key={fontSize} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontSize: 12, color: '#8B95A1', minWidth: 180 }}>{label}</span>
          <Text fontSize={fontSize}>가나다라마바사 AaBbCc 123</Text>
        </div>
      ))}
    </div>
  ),
};
