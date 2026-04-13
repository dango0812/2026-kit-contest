import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_OPTIONS, commonArgTypes } from '../config';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Card } from './Card';

const VARIANT_OPTIONS = ['solid', 'outline'] as const;
const ROUNDED_OPTIONS = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'frame'] as const;
const SHADOW_OPTIONS = ['none', 'light', 'medium', 'strong'] as const;

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    color: commonArgTypes.color,
    variant: {
      control: 'select',
      options: VARIANT_OPTIONS,
    },
    rounded: {
      control: 'select',
      options: ROUNDED_OPTIONS,
    },
    shadow: {
      control: 'select',
      options: SHADOW_OPTIONS,
    },
    className: commonArgTypes.className,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = ({ title, description }: { title?: string; description?: string }) => (
  <Flex direction="column" gap="10">
    <Text as="span" fontSize="subtitle1">
      {title || 'Card 컴포넌트'}
    </Text>
    <Text fontSize="body1">{description || 'Card 컴포넌트 디자인 입니다.'}</Text>
  </Flex>
);

export const Primary: Story = {
  args: {
    color: 'secondary',
    variant: 'solid',
    shadow: 'light',
  },
  render: args => (
    <Card {...args} style={{ width: 320 }}>
      <SampleContent />
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="20">
      <Card variant="solid" color="secondary" rounded="lg" style={{ width: 240 }}>
        <SampleContent title="Solid Card 컴포넌트" description="Solid Card 컴포넌트 디자인 입니다." />
      </Card>
      <Card variant="outline" color="secondary" rounded="lg" style={{ width: 240 }}>
        <SampleContent title="Outline Card 컴포넌트" description="Outline Card 컴포넌트 디자인 입니다." />
      </Card>
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="16">
      <Flex gap="12" flexWrap="wrap">
        {COLOR_OPTIONS.map(color => (
          <Card key={color} color={color} variant="solid" rounded="lg" style={{ width: 180 }}>
            <Text as="span" fontSize="body2" fontWeight="semibold">
              solid / {color}
            </Text>
          </Card>
        ))}
      </Flex>
      <Flex gap="12" flexWrap="wrap">
        {COLOR_OPTIONS.map(color => (
          <Card key={color} color={color} variant="outline" rounded="lg" style={{ width: 180 }}>
            <Text as="span" fontSize="body2" fontWeight="semibold">
              outline / {color}
            </Text>
          </Card>
        ))}
      </Flex>
    </Flex>
  ),
};
