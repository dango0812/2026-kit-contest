import { IconSearch, IconUsers } from '@assets/icons';
import { vars } from '@shared/styles';
import { Flex, Text } from '@shared/ui';

import * as styles from './styles.css';

interface LobbyActionGroupProps {
  onCreateRoom?: () => void;
  onJoinRoom?: () => void;
}

export function LobbyActionGroup({ onCreateRoom, onJoinRoom }: LobbyActionGroupProps) {
  return (
    <Flex as="section" direction="column" gap="12" aria-label="게임 시작 옵션">
      {/* 수사대 만들기 */}
      <button type="button" className={styles.primaryCard} onClick={onCreateRoom}>
        <Flex direction="column" gap="6">
          <Text as="span" fontSize="subtitle2" fontWeight="bold" color="white">
            수사대 만들기
          </Text>
          <Text as="span" fontSize="body2" color={vars.color.grey[100]} className={styles.textPreLine}>
            {`사건 현장을 개설하고\n동료 요원들을 초대하세요.`}
          </Text>
        </Flex>

        <div className={styles.iconCirclePrimary} aria-hidden="true">
          <IconUsers width={22} height={22} />
        </div>
      </button>

      {/* 참여하기 */}
      <button type="button" className={styles.outlineCard} onClick={onJoinRoom}>
        <Flex direction="column" gap="6">
          <Text as="span" fontSize="subtitle2" fontWeight="bold">
            참여하기
          </Text>
          <Text as="span" fontSize="body2" color={vars.color.grey[600]} className={styles.textPreLine}>
            {`참여 코드를 입력하고\n수사에 참여하세요.`}
          </Text>
        </Flex>

        <div className={styles.iconCircleOutline} aria-hidden="true">
          <IconSearch width={22} height={22} />
        </div>
      </button>
    </Flex>
  );
}
