import { Suspense } from 'react';

import { breakpoints } from '@constants/breakpoints';
import { RoomPanel } from '@features/room/RoomPanel';
import { RoomStoreProvider } from '@features/room/RoomStoreProvider';
import { ToastProvider } from '@providers/ToastProvider';
import { useMediaQuery } from '@shared/hooks/useMediaQuery';
import { vars } from '@shared/styles';
import { Flex, Text } from '@shared/ui';
import { Outlet } from 'react-router-dom';

import * as styles from './styles.css';

export function RootLayout() {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  const tip = (
    <Flex align="center" gap="6" className={styles.tip}>
      <Text as="span" fontSize="body1" fontWeight="semibold" color={vars.color.green[500]}>
        TIP
      </Text>
      <Text as="span" fontSize="body1" color={vars.color.grey[600]}>
        공모전 작품으로 2인 플레이만 지원되고 있어요
      </Text>
    </Flex>
  );

  if (isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        <ToastProvider>
          <RoomStoreProvider>
            <RoomPanel />
          </RoomStoreProvider>
        </ToastProvider>
        {tip}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Suspense>
        <Outlet />
      </Suspense>
      {tip}
    </div>
  );
}
