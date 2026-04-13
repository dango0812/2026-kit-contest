import { useState } from 'react';

import { getCurriculumScopes } from '@constants/curriculum';
import type { TopicId } from '@constants/topics';
import { vars } from '@shared/styles';
import { Button, Flex, Text, TopBar } from '@shared/ui';

import * as styles from './styles.css';

interface ScopeSelectProps {
  topicId: TopicId;
  gradeId: string;
  onBack: () => void;
  onSelect: (scopeId: string) => void;
}

export function ScopeSelect({ topicId, gradeId, onBack, onSelect }: ScopeSelectProps) {
  const scopes = getCurriculumScopes(topicId, gradeId);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <Flex direction="column" gap="10" style={{ flex: 1 }}>
      <TopBar>
        <TopBar.Back onBack={onBack} />
      </TopBar>

      <Flex direction="column">
        <Text as="h2" fontSize="h6" fontWeight="bold" role="heading">
          학습 범위 선택
        </Text>
        <Text as="p" fontSize="body1" lineHeight="large" color={vars.color.grey[600]}>
          AI가 선택한 범위로 사건을 출제해요.
        </Text>
      </Flex>

      <div className={styles.scrollArea} role="radiogroup" aria-label="학습 범위">
        {scopes.map(scope => {
          const isSelected = selected === scope.id;
          const className = isSelected ? styles.scopeItemSelected : styles.scopeItem;

          return (
            <button
              key={scope.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={className}
              onClick={() => setSelected(scope.id)}
            >
              <Text as="span" fontSize="body2" fontWeight={isSelected ? 'semibold' : 'medium'}>
                {scope.label}
              </Text>

              {scope.description && (
                <Text as="span" fontSize="caption" color={vars.color.grey[500]}>
                  {scope.description}
                </Text>
              )}
            </button>
          );
        })}
      </div>

      <div className={styles.submitButton}>
        <Button fullWidth disabled={!selected} onClick={handleSubmit}>
          AI 사건 생성하기 →
        </Button>
      </div>
    </Flex>
  );
}

ScopeSelect.displayName = 'ScopeSelect';
