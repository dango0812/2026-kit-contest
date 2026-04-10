import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from './Flex';

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
      options: ['none', '2', '4', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64'],
    },
    flexWrap: { control: 'select', options: ['nowrap', 'wrap'] },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full', 'frame'],
    },
    flexGrow: { control: 'select', options: [0, 1] },
    flexShrink: { control: 'select', options: [0, 1] },
    textAlign: { control: 'select', options: ['left', 'center', 'right'] },
    className: { table: { disable: true } },
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

export const JustifyContent: Story = {
  render: () => (
    <Flex direction="column" gap="16">
      {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] as const).map(justify => (
        <div key={justify}>
          <p style={{ marginBottom: 4, fontSize: 12, color: '#6B7684' }}>justify: {justify}</p>
          <Flex justify={justify} gap="8" style={{ background: '#F2F4F6', borderRadius: 8, padding: 8 }}>
            <Box label="A" />
            <Box label="B" />
            <Box label="C" />
          </Flex>
        </div>
      ))}
    </Flex>
  ),
};

export const AlignItems: Story = {
  render: () => (
    <Flex direction="column" gap="16">
      {(['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const).map(align => (
        <div key={align}>
          <p style={{ marginBottom: 4, fontSize: 12, color: '#6B7684' }}>align: {align}</p>
          <Flex align={align} gap="8" style={{ background: '#F2F4F6', borderRadius: 8, padding: 8, height: 80 }}>
            <Box label="A" />
            <Box label="B" />
            <Box label="C" />
          </Flex>
        </div>
      ))}
    </Flex>
  ),
};

export const Gap: Story = {
  render: () => (
    <Flex direction="column" gap="16">
      {(['none', '4', '8', '12', '16', '24', '32'] as const).map(gap => (
        <div key={gap}>
          <p style={{ marginBottom: 4, fontSize: 12, color: '#6B7684' }}>gap: {gap}</p>
          <Flex gap={gap} style={{ background: '#F2F4F6', borderRadius: 8, padding: 8 }}>
            <Box label="A" />
            <Box label="B" />
            <Box label="C" />
          </Flex>
        </div>
      ))}
    </Flex>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Flex flexWrap="wrap" gap="8" style={{ width: 200, background: '#F2F4F6', borderRadius: 8, padding: 8 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} label={String(i + 1)} />
      ))}
    </Flex>
  ),
};
