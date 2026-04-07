import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
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
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'error', 'warning', 'black'] },
    size: { control: 'select', options: ['large', 'medium', 'small'] },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '버튼 컴포넌트',
    color: 'primary',
    size: 'large',
    fullWidth: false,
    loading: false,
    disabled: false,
  },
};
