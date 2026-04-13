import { ToastProvider } from '@providers/ToastProvider';
import type { PropsWithChildren } from 'react';

import { MobileFrame, useFrameContainer } from '../MobileFrame';

import * as styles from './styles.css';

function DualMobileFrameBase({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}

function FrameContent({ children }: PropsWithChildren) {
  const container = useFrameContainer();

  return (
    <MobileFrame.Content>
      <ToastProvider container={container}>{children}</ToastProvider>
    </MobileFrame.Content>
  );
}

function Left({ header, children }: PropsWithChildren<{ header: string }>) {
  return (
    <MobileFrame header={header}>
      <MobileFrame.Notch />
      <FrameContent>{children}</FrameContent>
    </MobileFrame>
  );
}

function Right({ header, children }: PropsWithChildren<{ header: string }>) {
  return (
    <div className={styles.rightWrapper}>
      <MobileFrame header={header}>
        <MobileFrame.Notch />
        <FrameContent>{children}</FrameContent>
      </MobileFrame>
    </div>
  );
}

FrameContent.displayName = 'DualMobileFrame.FrameContent';
Left.displayName = 'DualMobileFrame.Left';
Right.displayName = 'DualMobileFrame.Right';
DualMobileFrameBase.displayName = 'DualMobileFrame';

export const DualMobileFrame = Object.assign(DualMobileFrameBase, { Left, Right });
