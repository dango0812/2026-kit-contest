import { ROUTES } from '@constants/routes';
import { vars } from '@shared/styles';
import { Button, Flex, Text } from '@shared/ui';
import { useNavigate } from 'react-router-dom';

import { description } from './styles.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center" style={{ minHeight: '100dvh' }}>
      <Flex direction="column" align="center" justify="center" gap="20">
        <Text as="span" fontSize="h1" fontWeight="bold" color={vars.color.primary}>
          404 Error
        </Text>

        <Flex direction="column" align="center" gap="8">
          <Text as="h1" fontSize="h5" fontWeight="semibold">
            페이지를 찾을 수 없습니다
          </Text>
          <Text fontSize="body1" className={description}>
            {`요청하신 페이지를 찾을 수 없습니다.\n입력하신 주소가 정확한지 다시 한번 확인해주세요.`}
          </Text>
        </Flex>
        <Button color="primary" size="medium" onClick={() => navigate(ROUTES.HOME)}>
          홈으로 돌아가기
        </Button>
      </Flex>
    </Flex>
  );
}
