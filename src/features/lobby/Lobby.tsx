import { vars } from '@shared/styles';
import { Flex, Text } from '@shared/ui';

import { LobbyActionGroup } from './LobbyActionGroup';

import * as styles from './styles.css';

export function Lobby() {
  return (
    <Flex direction="column" justify="center" gap="40" className={styles.lobbyWrapper}>
      <Flex direction="column" gap="10">
        <Text as="h1" fontSize="h6" fontWeight="bold" role="heading">
          KEG 수사대
        </Text>
        <Text as="p" fontSize="body1" lineHeight="large" color={vars.color.grey[600]} className={styles.textPreLine}>
          {`주제를 선택하여 동료와 함께\n토론하며 사건을 해결해보세요.`}
        </Text>
      </Flex>

      <LobbyActionGroup />
    </Flex>
  );
}
