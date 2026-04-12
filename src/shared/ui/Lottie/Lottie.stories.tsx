import mobileNotSupported from '@assets/lotties/mobile-not-supported.json';
import type { Meta, StoryObj } from '@storybook/react';

import { Lottie } from './Lottie';

const meta = {
  title: 'Components/Lottie',
  component: Lottie,
  tags: ['autodocs'],
  argTypes: {
    src: { table: { disable: true } },
    loop: { control: 'boolean' },
    autoplay: { control: 'boolean' },
    speed: { control: { type: 'number', min: 0.1, max: 5, step: 0.1 } },
    renderer: { control: 'select', options: ['svg', 'canvas', 'html'] },
    width: { control: 'text' },
    height: { control: 'text' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Lottie>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: mobileNotSupported,
    loop: true,
    autoplay: true,
    speed: 1,
    width: '300',
    height: '300',
    renderer: 'svg',
  },
};
