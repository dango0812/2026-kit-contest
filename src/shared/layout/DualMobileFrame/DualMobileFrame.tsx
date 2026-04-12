import type { PropsWithChildren } from 'react';

import { MobileFrame } from '../MobileFrame';

import * as styles from './styles.css';

function DualMobileFrameBase({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}

function Left({ header, children }: PropsWithChildren<{ header: string }>) {
  return (
    <MobileFrame header={header}>
      <MobileFrame.Notch />
      <MobileFrame.Content>{children}</MobileFrame.Content>
    </MobileFrame>
  );
}

function Right({ header, children }: PropsWithChildren<{ header: string }>) {
  return (
    <MobileFrame header={header}>
      <MobileFrame.Notch />
      <MobileFrame.Content>{children}</MobileFrame.Content>
    </MobileFrame>
  );
}

Left.displayName = 'DualMobileFrame.Left';
Right.displayName = 'DualMobileFrame.Right';
DualMobileFrameBase.displayName = 'DualMobileFrame';

export const DualMobileFrame = Object.assign(DualMobileFrameBase, { Left, Right });
