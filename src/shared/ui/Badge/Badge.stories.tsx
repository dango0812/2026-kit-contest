import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from '../Flex';
import { Badge } from './Badge';

const COLOR_OPTIONS = ['primary', 'secondary', 'success', 'error', 'warning', 'black'] as const;
const SIZE_OPTIONS = ['small', 'medium', 'large'] as const;
const VARIANT_OPTIONS = ['solid', 'subtle'] as const;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLOR_OPTIONS },
    size: { control: 'select', options: SIZE_OPTIONS },
    variant: { control: 'radio', options: VARIANT_OPTIONS },
    dot: { control: 'boolean' },
    children: { control: 'text' },
    className: { table: { disable: true } },
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

export const Sizes: Story = {
  render: args => (
    <Flex gap="8" align="center">
      <Badge {...args} size="small">
        Small
      </Badge>
      <Badge {...args} size="medium">
        Medium
      </Badge>
      <Badge {...args} size="large">
        Large
      </Badge>
    </Flex>
  ),
  args: {
    color: 'primary',
    variant: 'solid',
    children: '',
  },
};

export const Dot: Story = {
  render: args => (
    <Flex direction="column" gap="20">
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
    dot: true,
    children: '',
  },
};
