import { Suspense } from 'react';

import MobileNotSupported from '@assets/lotties/mobile-not-supported.json';
import { Flex, Lottie, Text } from '@shared/ui';
import { Outlet } from 'react-router-dom';

import * as styles from './styles.css';

export function RootLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.desktopContent}>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>

      <Flex direction="column" align="center" justify="center" className={styles.mobileContent}>
        <Lottie src={MobileNotSupported} width={300} height={200} />

        <Text fontSize="title2" fontWeight="medium" color="secondary">
          {`공모전 작품으로 넓은 화면에 최적화 되어있어요.\n원활한 이용을 위해 가로가 넓은 화면으로 이용해 주세요.`}
        </Text>
      </Flex>
    </div>
  );
}
