import { IconArrowLeft } from '@assets/icons';
import type { PropsWithChildren } from 'react';

import { Text } from '../Text';

import * as styles from './styles.css';

function TopBarRoot({ children }: PropsWithChildren) {
  return <nav className={styles.topBar}>{children}</nav>;
}

function Back({ onBack }: { onBack: () => void }) {
  return (
    <button type="button" className={styles.backButton} onClick={onBack} aria-label="뒤로 가기">
      <IconArrowLeft width={20} height={20} />
    </button>
  );
}

function Title({ children }: PropsWithChildren) {
  return (
    <Text as="span" fontSize="subtitle1" fontWeight="semibold" className={styles.title}>
      {children}
    </Text>
  );
}

function RightContent({ children }: PropsWithChildren) {
  return <div className={styles.rightContent}>{children}</div>;
}

export const TopBar = Object.assign(TopBarRoot, {
  Back,
  Title,
  RightContent,
});

TopBarRoot.displayName = 'TopBar';
Back.displayName = 'TopBar.Back';
Title.displayName = 'TopBar.Title';
RightContent.displayName = 'TopBar.RightContent';
