import { RoomPanel } from '@features/room/RoomPanel';
import { RoomStoreProvider } from '@features/room/RoomStoreProvider';
import { DualMobileFrame } from '@shared/layout';

export default function HomePage() {
  return (
    <DualMobileFrame>
      <DualMobileFrame.Left header="김철수 학생 화면">
        <RoomStoreProvider>
          <RoomPanel />
        </RoomStoreProvider>
      </DualMobileFrame.Left>

      <DualMobileFrame.Right header="김영희 학생 화면">
        <RoomStoreProvider>
          <RoomPanel />
        </RoomStoreProvider>
      </DualMobileFrame.Right>
    </DualMobileFrame>
  );
}
