import { useState } from 'react';

import { GRADE_GROUPS, type GradeId } from '@constants/grades';
import { vars } from '@shared/styles';
import { Button, Flex, Text, TopBar } from '@shared/ui';

import * as styles from './styles.css';

interface GradeSelectProps {
  onBack: () => void;
  onSelect: (gradeId: GradeId) => void;
}

export function GradeSelect({ onBack, onSelect }: GradeSelectProps) {
  const [selected, setSelected] = useState<GradeId | null>(null);

  return (
    <Flex direction="column" gap="10">
      <TopBar>
        <TopBar.Back onBack={onBack} />
      </TopBar>

      <Flex direction="column">
        <Text as="h2" fontSize="h6" fontWeight="bold" role="heading">
          학년 선택
        </Text>
        <Text as="p" fontSize="body1" lineHeight="large" color={vars.color.grey[600]}>
          학년을 선택해 주세요.
        </Text>
      </Flex>

      <div className={styles.scrollArea} role="radiogroup" aria-label="학년 선택">
        {GRADE_GROUPS.map(group => (
          <Flex key={group.id} direction="column" gap="10">
            <Text as="span" fontSize="subtitle2" fontWeight="semibold">
              {group.label}
            </Text>

            <div className={styles.gradeList}>
              {group.grades.map(grade => {
                const isSelected = selected === grade.id;
                return (
                  <button
                    key={grade.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={isSelected ? styles.gradeButtonSelected : styles.gradeButton}
                    onClick={() => setSelected(grade.id)}
                  >
                    <Text as="span" fontSize="body2" fontWeight={isSelected ? 'semibold' : 'regular'}>
                      {grade.shortLabel}
                    </Text>
                  </button>
                );
              })}
            </div>
          </Flex>
        ))}
      </div>

      <div className={styles.submitButton}>
        <Button
          fullWidth
          disabled={selected === null}
          onClick={() => {
            if (selected) {
              onSelect(selected);
            }
          }}
        >
          범위 선택하기 →
        </Button>
      </div>
    </Flex>
  );
}

GradeSelect.displayName = 'GradeSelect';
