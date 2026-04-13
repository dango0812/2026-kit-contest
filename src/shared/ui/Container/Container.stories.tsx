import { breakpoints } from '@constants/breakpoints';
import type { Meta, StoryObj } from '@storybook/react';

import { vars } from '@/shared/styles';

import { Card } from '../Card';
import { commonArgTypes } from '../config';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Container, type MaxWidth as MaxWidthType } from './Container';

const MAX_WIDTH_OPTIONS: MaxWidthType[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const DECORATORS: Story['decorators'] = [
  Story => (
    <div style={{ width: '100vw', maxWidth: '100%' }}>
      <Story />
    </div>
  ),
];

const meta = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    maxWidth: { control: 'select', options: MAX_WIDTH_OPTIONS },
    fullWidth: { control: 'boolean' },
    className: commonArgTypes.className,
  },
  args: {
    maxWidth: 'lg',
    fullWidth: false,
    as: 'div',
  },
} satisfies Meta<typeof Container>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: DECORATORS,
  render: args => (
    <Container {...args}>
      <Card color="primary" variant="outline" rounded="md">
        <Text fontSize="body1">
          {args.maxWidth} - max {breakpoints[args.maxWidth as MaxWidthType]}px
        </Text>
      </Card>
    </Container>
  ),
};

export const MaxWidth: Story = {
  decorators: DECORATORS,
  render: () => (
    <Flex direction="column" gap="16">
      {MAX_WIDTH_OPTIONS.map(size => (
        <div key={size} style={{ background: vars.color.grey[200], width: '100%' }}>
          <Container maxWidth={size}>
            <Card color="secondary" variant="solid" rounded="md">
              <Text fontSize="body2" fontWeight="medium">
                {size} - max {breakpoints[size]}px
              </Text>
            </Card>
          </Container>
        </div>
      ))}
    </Flex>
  ),
};

export const FullWidth: Story = {
  decorators: DECORATORS,
  render: () => (
    <Container fullWidth>
      <Card color="secondary" variant="solid" rounded="md">
        <Text fontSize="body2">fullWidth - 너비 제한 없음</Text>
      </Card>
    </Container>
  ),
};
