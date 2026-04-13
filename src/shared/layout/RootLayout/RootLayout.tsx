import { Suspense } from 'react';

import { vars } from '@shared/styles';
import { Flex, Text } from '@shared/ui';
import { Outlet } from 'react-router-dom';

import * as styles from './styles.css';

export function RootLayout() {
  const tip = (
    <Flex align="center" gap="6" className={styles.tip}>
      <Text as="span" fontSize="body1" fontWeight="semibold" color={vars.color.green[500]}>
        TIP
      </Text>
      <Text as="span" fontSize="body1" color={vars.color.grey[600]}>
        공모전 작품으로 2인 플레이를 권장해요
      </Text>
    </Flex>
  );

  return (
    <div className={styles.wrapper}>
      <Suspense>
        <Outlet />
      </Suspense>
      {tip}
    </div>
  );
}
