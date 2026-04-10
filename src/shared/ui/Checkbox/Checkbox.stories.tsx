import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from '../Flex';
import { Checkbox } from './Checkbox';

const COLOR_OPTIONS = ['primary', 'secondary', 'success', 'error', 'warning', 'black'] as const;

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLOR_OPTIONS },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
    disabled: false,
    children: null,
  },
  render: ({ color, disabled, checked, onChange }) => (
    <Flex gap="20">
      <Checkbox color={color} disabled={disabled} checked={checked} onChange={onChange}>
        <Checkbox.Squircle />
      </Checkbox>
      <Checkbox color={color} disabled={disabled} checked={checked} onChange={onChange}>
        <Checkbox.Circle />
      </Checkbox>
      <Checkbox color={color} disabled={disabled} checked={checked} onChange={onChange}>
        <Checkbox.Line />
      </Checkbox>
    </Flex>
  ),
};

export const Squircle: Story = {
  args: { children: null },
  render: () => (
    <Checkbox>
      <Checkbox.Squircle />
    </Checkbox>
  ),
};

export const Circle: Story = {
  args: { children: null },
  render: () => (
    <Checkbox>
      <Checkbox.Circle />
    </Checkbox>
  ),
};

export const Line: Story = {
  args: { children: null },
  render: () => (
    <Checkbox>
      <Checkbox.Line />
    </Checkbox>
  ),
};

export const Colors: Story = {
  args: { children: null },
  render: () => (
    <Flex direction="column" gap="20">
      <Flex gap="20">
        {COLOR_OPTIONS.map(color => (
          <Checkbox key={color} color={color} checked>
            <Checkbox.Squircle />
          </Checkbox>
        ))}
      </Flex>
      <Flex gap="20">
        {COLOR_OPTIONS.map(color => (
          <Checkbox key={color} color={color} checked>
            <Checkbox.Circle />
          </Checkbox>
        ))}
      </Flex>
      <Flex gap="20">
        {COLOR_OPTIONS.map(color => (
          <Checkbox key={color} color={color} checked>
            <Checkbox.Line />
          </Checkbox>
        ))}
      </Flex>
    </Flex>
  ),
};

export const Disabled: Story = {
  args: { children: null },
  render: () => (
    <Flex gap="20">
      <Checkbox disabled>
        <Checkbox.Squircle />
      </Checkbox>
      <Checkbox disabled checked>
        <Checkbox.Squircle />
      </Checkbox>
      <Checkbox disabled>
        <Checkbox.Circle />
      </Checkbox>
      <Checkbox disabled checked>
        <Checkbox.Circle />
      </Checkbox>
      <Checkbox disabled>
        <Checkbox.Line />
      </Checkbox>
      <Checkbox disabled checked>
        <Checkbox.Line />
      </Checkbox>
    </Flex>
  ),
};

export const Controlled: Story = {
  args: { children: null },
  render: () => <ControlledCheckbox />,
};

function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Flex gap="20">
      <Checkbox checked={checked} onChange={setChecked}>
        <Checkbox.Squircle />
      </Checkbox>
      <Checkbox checked={checked} onChange={setChecked}>
        <Checkbox.Circle />
      </Checkbox>
      <Checkbox checked={checked} onChange={setChecked}>
        <Checkbox.Line />
      </Checkbox>
    </Flex>
  );
}
