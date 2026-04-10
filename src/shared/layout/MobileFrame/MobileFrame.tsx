import { type CSSProperties, type PropsWithChildren } from 'react';

import { Flex, Text } from '@shared/ui';
import clsx from 'clsx';

import * as styles from './styles.css';

export interface FrameProps extends PropsWithChildren {
  /**
   * 프레임의 헤더 가운데에 위치한 텍스트
   */
  header?: string;
  /**
   * 프레임의 너비(px)
   * @default 375
   */
  width?: number;
  /**
   * 프레임의 높이(px)
   * @default 700
   */
  height?: number;
}

function MobileFrameBase({ children, header, width = 375, height = 700 }: FrameProps) {
  const frameStyle: CSSProperties = { width, height };

  return (
    <Flex direction="column">
      {header && (
        <div className={styles.headerWrapper}>
          <Text as="span" fontSize="title2" fontWeight="semibold">
            {header}
          </Text>
        </div>
      )}

      <div className={styles.frame} style={frameStyle}>
        {children}
      </div>
    </Flex>
  );
}
function Notch({ children, className, ...rest }: PropsWithChildren & { className?: string }) {
  return (
    <div className={clsx(styles.notch, className)} {...rest}>
      {children}
    </div>
  );
}

function Content({ children, className, ...rest }: PropsWithChildren & { className?: string }) {
  return (
    <div className={clsx(styles.content, className)} {...rest}>
      {children}
    </div>
  );
}

Notch.displayName = 'MobileFrame.Notch';
Content.displayName = 'MobileFrame.Content';
MobileFrameBase.displayName = 'MobileFrame';

export const MobileFrame = Object.assign(MobileFrameBase, {
  Notch,
  Content,
});
