import type { Meta, StoryObj } from '@storybook/react';

import { commonArgTypes } from '../config';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: { control: 'text' },
    color: commonArgTypes.color,
    size: commonArgTypes.size,
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    onClick: { action: 'clicked' },
    disabled: { table: { disable: true } },
    type: { table: { disable: true } },
    className: commonArgTypes.className,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '확인',
    color: 'primary',
    size: 'large',
    fullWidth: false,
    loading: false,
  },
};

export const FullWidth: Story = {
  args: {
    children: '다음으로',
    color: 'primary',
    size: 'large',
    fullWidth: true,
  },
};

export const Loading: Story = {
  args: {
    children: '저장 중…',
    color: 'primary',
    size: 'large',
    loading: true,
  },
};
