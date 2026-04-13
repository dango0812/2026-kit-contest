import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { COLOR_OPTIONS } from '../config';
import { Flex } from '../Flex';
import { Toast } from './Toast';
import type { ToastPosition } from './types';

const POSITION_OPTIONS: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    message: { control: 'text' },
    position: { control: 'select', options: POSITION_OPTIONS },
    color: { control: 'select', options: [...COLOR_OPTIONS] },
    delay: { control: 'number' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
    message: '이것은 토스트 컴포넌트예요',
    position: 'top-center',
    color: 'primary',
    delay: 0,
    onClose: () => {},
  },
  render: args => <Toast {...args} />,
};

export const Playground: Story = {
  args: {
    isOpen: false,
    message: '이것은 토스트 컴포넌트예요',
    color: 'primary',
    position: 'top-center',
    onClose: () => {},
    delay: 3000,
  },
  render: props => <ToastPlayground {...props} />,
};

function ToastPlayground({ isOpen: initialIsOpen, message, position, color, delay }: Story['args']) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <Flex direction="column" align="center" gap="16">
      <Button onClick={() => setIsOpen(true)}>토스트 열기</Button>
      <Toast
        isOpen={isOpen}
        message={message}
        position={position}
        color={color}
        delay={delay}
        onClose={() => setIsOpen(false)}
      />
    </Flex>
  );
}
