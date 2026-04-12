import { DualMobileFrame } from '@shared/layout';

export default function HomePage() {
  return (
    <DualMobileFrame>
      <DualMobileFrame.Left header="김철수 학생">김철수의 화면</DualMobileFrame.Left>

      <DualMobileFrame.Right header="김영희 학생">김영희의 화면</DualMobileFrame.Right>
    </DualMobileFrame>
  );
}
