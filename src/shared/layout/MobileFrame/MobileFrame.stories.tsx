import { Flex, Text } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react';

import { MobileFrame } from './MobileFrame';

const meta = {
  title: 'Layout/MobileFrame',
  component: MobileFrame,
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text' },
    width: { control: { type: 'number', min: 280, max: 500, step: 1 } },
    height: { control: { type: 'number', min: 400, max: 960, step: 1 } },
  },
} satisfies Meta<typeof MobileFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MobileFrame>
      <MobileFrame.Notch />
      <MobileFrame.Content>
        <Text fontSize="body1">컨텐츠 영역</Text>
      </MobileFrame.Content>
    </MobileFrame>
  ),
};

export const Header: Story = {
  render: () => (
    <MobileFrame header="페이지 제목">
      <MobileFrame.Notch />
      <MobileFrame.Content>
        <Text fontSize="body1">헤더가 있는 레이아웃입니다.</Text>
      </MobileFrame.Content>
    </MobileFrame>
  ),
};

export const NotchContent: Story = {
  render: () => (
    <MobileFrame>
      <MobileFrame.Notch>
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          <Text fontSize="body1" color="#ffffff">
            09:41
          </Text>
        </Flex>
      </MobileFrame.Notch>
      <MobileFrame.Content>
        <Text fontSize="body1">노치에 컨텐츠를 추가할 수 있습니다.</Text>
      </MobileFrame.Content>
    </MobileFrame>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <MobileFrame width={390} height={844}>
      <MobileFrame.Notch />
      <MobileFrame.Content>
        <Text fontSize="body1">390 x 844 프레임</Text>
      </MobileFrame.Content>
    </MobileFrame>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <MobileFrame header="스크롤">
      <MobileFrame.Notch />
      <MobileFrame.Content>
        {Array.from({ length: 50 }, (_, i) => (
          <Text key={i} fontSize="body1">
            항목 {i + 1}
          </Text>
        ))}
      </MobileFrame.Content>
    </MobileFrame>
  ),
};
