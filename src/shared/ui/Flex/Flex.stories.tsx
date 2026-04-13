import type { Meta, StoryObj } from '@storybook/react';

import { commonArgTypes } from '../config';
import { Flex } from './Flex';

const GAP_OPTIONS = ['none', '2', '4', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64'] as const;
const ROUNDED_OPTIONS = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'frame'] as const;

const meta = {
  title: 'Components/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    },
    gap: {
      control: 'select',
      options: GAP_OPTIONS,
    },
    flexWrap: { control: 'select', options: ['nowrap', 'wrap'] },
    rounded: {
      control: 'select',
      options: ROUNDED_OPTIONS,
    },
    flexGrow: { control: 'select', options: [0, 1] },
    flexShrink: { control: 'select', options: [0, 1] },
    textAlign: { control: 'select', options: ['left', 'center', 'right'] },
    className: commonArgTypes.className,
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ label }: { label: string }) => (
  <div
    style={{
      width: 60,
      height: 60,
      background: '#3182F6',
      color: '#fff',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 600,
    }}
  >
    {label}
  </div>
);

export const Primary: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'flex-start',
    gap: '12',
  },
  render: args => (
    <Flex {...args}>
      <Box label="A" />
      <Box label="B" />
      <Box label="C" />
    </Flex>
  ),
};

export const Directions: Story = {
  render: () => (
    <Flex direction="column" gap="24">
      {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map(direction => (
        <div key={direction}>
          <p style={{ marginBottom: 8, fontSize: 12, color: '#6B7684' }}>direction: {direction}</p>
          <Flex direction={direction} gap="8" style={{ background: '#F2F4F6', borderRadius: 8, padding: 8 }}>
            <Box label="1" />
            <Box label="2" />
            <Box label="3" />
          </Flex>
        </div>
      ))}
    </Flex>
  ),
};
