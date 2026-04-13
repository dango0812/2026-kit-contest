import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { COLOR_OPTIONS } from '../config';
import { Flex } from '../Flex';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: [...COLOR_OPTIONS] },
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
