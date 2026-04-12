import { Lobby } from '@features/lobby/Lobby';
import { DualMobileFrame } from '@shared/layout';

export default function HomePage() {
  return (
    <DualMobileFrame>
      <DualMobileFrame.Left header="김철수 학생 화면">
        <Lobby />
      </DualMobileFrame.Left>

      <DualMobileFrame.Right header="김영희 학생 화면">
        <Lobby />
      </DualMobileFrame.Right>
    </DualMobileFrame>
  );
}
