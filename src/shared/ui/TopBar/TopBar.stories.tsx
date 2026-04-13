import type { Meta, StoryObj } from '@storybook/react';

import { TopBar } from './TopBar';

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: 360, border: '1px solid #E5E8EB', borderRadius: 8, padding: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <TopBar>
      <TopBar.Back onBack={() => {}} />
    </TopBar>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <TopBar>
      <TopBar.Back onBack={() => {}} />
      <TopBar.Title>학습 주제 선택</TopBar.Title>
    </TopBar>
  ),
};

export const WithRightContent: Story = {
  render: () => (
    <TopBar>
      <TopBar.Back onBack={() => {}} />
      <TopBar.Title>설정</TopBar.Title>
      <TopBar.RightContent>
        <button type="button" style={{ fontSize: 14, color: '#3182F6' }}>
          완료
        </button>
      </TopBar.RightContent>
    </TopBar>
  ),
};
