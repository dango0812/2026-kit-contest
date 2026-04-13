import { AVATAR_URLS } from '@assets/avatars';
import { IconUsers } from '@assets/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { commonArgTypes } from '../config';
import { Flex } from '../Flex';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: commonArgTypes.size,
    variant: { control: 'select', options: ['filled', 'empty'] },
    src: { control: 'text' },
    alt: { control: 'text' },
    fallback: { control: 'text' },
    className: commonArgTypes.className,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 'medium',
    variant: 'filled',
  },
};

export const AllAvatars: Story = {
  render: () => (
    <Flex direction="column" gap="12">
      {Array.from({ length: 4 }, (_, row) => (
        <Flex key={row} gap="12">
          {AVATAR_URLS.slice(row * 5, row * 5 + 5).map((url, i) => (
            <Avatar key={i} src={url} size="medium" alt={`avatar-${row * 5 + i + 1}`} />
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const Fallback: Story = {
  args: {
    size: 'medium',
    variant: 'filled',
    fallback: '김',
  },
};

export const SvgIcon: Story = {
  args: {
    size: 'medium',
    variant: 'filled',
    icon: IconUsers,
  },
};

export const Empty: Story = {
  args: {
    size: 'medium',
    variant: 'empty',
  },
};
