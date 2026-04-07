import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
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
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: '텍스트 컴포넌트',
    fontSize: 'body1',
    fontWeight: 'medium',
    lineHeight: 'medium',
    as: 'p',
  },
};
