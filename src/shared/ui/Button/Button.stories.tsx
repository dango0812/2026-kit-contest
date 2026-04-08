import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: { control: 'text' },
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'error', 'warning', 'black'] },
    size: { control: 'select', options: ['large', 'medium', 'small'] },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    onClick: { action: 'clicked' },
    disabled: { table: { disable: true } },
    type: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '확인',
    color: 'primary',
    size: 'large',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="error">Error</Button>
      <Button color="warning">Warning</Button>
      <Button color="black">Black</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: '다음으로',
    color: 'primary',
    size: 'large',
    fullWidth: true,
  },
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button loading size="small">
        Small
      </Button>
      <Button loading size="medium">
        Medium
      </Button>
      <Button loading size="large">
        Large
      </Button>
    </div>
  ),
};
