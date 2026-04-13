import type { Meta, StoryObj } from '@storybook/react';

import { commonArgTypes } from '../config';
import { Loader } from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: commonArgTypes.size,
    color: commonArgTypes.color,
    duration: { control: { type: 'number', min: 500, max: 3000, step: 100 } },
    className: commonArgTypes.className,
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
