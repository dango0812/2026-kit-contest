import type { Meta, StoryObj } from '@storybook/react';

import { commonArgTypes } from '../config';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: commonArgTypes.size,
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    className: commonArgTypes.className,
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 'primary',
    size: 'medium',
    label: '닉네임',
    placeholder: '닉네임을 입력하세요',
    disabled: false,
    readOnly: false,
  },
};

export const WithError: Story = {
  args: {
    id: 'with-error',
    size: 'medium',
    label: '입장 코드',
    error: '올바른 입장 코드를 입력해 주세요',
    defaultValue: 'INVALID',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    size: 'medium',
    label: '비활성',
    defaultValue: '수정 불가',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    id: 'readonly',
    size: 'medium',
    label: '읽기 전용',
    defaultValue: 'A7B-2C0',
    readOnly: true,
  },
};
