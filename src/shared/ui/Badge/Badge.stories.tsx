import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_OPTIONS, commonArgTypes } from '../config';
import { Flex } from '../Flex';
import { Badge } from './Badge';

const VARIANT_OPTIONS = ['solid', 'subtle'] as const;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: commonArgTypes.color,
    size: commonArgTypes.size,
    variant: { control: 'radio', options: VARIANT_OPTIONS },
    dot: { control: 'boolean' },
    children: { control: 'text' },
    className: commonArgTypes.className,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
    size: 'large',
    variant: 'solid',
    children: 'Badge',
    dot: false,
  },
};

export const Variants: Story = {
  render: args => (
    <Flex gap="12" align="center">
      <Badge {...args} variant="solid">
        Solid
      </Badge>
      <Badge {...args} variant="subtle">
        Subtle
      </Badge>
    </Flex>
  ),
  args: {
    size: 'large',
    color: 'primary',
    children: '',
  },
};

export const Colors: Story = {
  render: args => (
    <Flex direction="column" gap="12">
      <Flex gap="8" align="center">
        {COLOR_OPTIONS.map(color => (
          <Badge key={color} {...args} color={color} variant="solid">
            {color}
          </Badge>
        ))}
      </Flex>
      <Flex gap="8" align="center">
        {COLOR_OPTIONS.map(color => (
          <Badge key={color} {...args} color={color} variant="subtle">
            {color}
          </Badge>
        ))}
      </Flex>
    </Flex>
  ),
  args: {
    size: 'large',
    children: '',
  },
};
