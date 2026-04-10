import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'error', 'warning', 'black'] },
    duration: { control: { type: 'number', min: 500, max: 3000, step: 100 } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 'medium',
    color: 'primary',
  },
};

export const Sizes: Story = {
  render: args => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Loader {...args} size="small" />
      <Loader {...args} size="medium" />
      <Loader {...args} size="large" />
    </div>
  ),
  args: {
    color: 'primary',
  },
};

export const Colors: Story = {
  render: args => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Loader {...args} color="primary" />
      <Loader {...args} color="secondary" />
      <Loader {...args} color="success" />
      <Loader {...args} color="error" />
      <Loader {...args} color="warning" />
      <Loader {...args} color="black" />
    </div>
  ),
  args: {
    size: 'medium',
  },
};

export const Delay: Story = {
  args: {
    size: 'large',
    color: 'primary',
    duration: 2000,
  },
};
