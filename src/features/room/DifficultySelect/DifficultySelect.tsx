import { useState } from 'react';

import { vars } from '@shared/styles';
import { Button, Flex, Text, TopBar } from '@shared/ui';

import * as styles from './styles.css';

type Difficulty = 'easy' | 'normal' | 'hard';

const DIFFICULTIES: Array<{ id: Difficulty; label: string; description: string }> = [
  { id: 'easy', label: '하 (쉬움)', description: '5번까지 틀려도 괜찮아요' },
  { id: 'normal', label: '중 (보통)', description: '3번까지 틀릴 수 있어요' },
  { id: 'hard', label: '상 (어려움)', description: '2번만 틀릴 수 있어요' },
];

interface DifficultySelectProps {
  onBack: () => void;
  onSelect: (difficulty: Difficulty) => void;
}

export function DifficultySelect({ onBack, onSelect }: DifficultySelectProps) {
  const [selected, setSelected] = useState<Difficulty | null>(null);

  return (
    <div className={styles.wrapper}>
      <TopBar>
        <TopBar.Back onBack={onBack} />
      </TopBar>

      <Flex direction="column" gap="10" className={styles.topSection}>
        <Text as="h1" fontSize="h6" fontWeight="bold" role="heading">
          난이도 선택
        </Text>
        <Text as="p" fontSize="body1" lineHeight="large" color={vars.color.grey[600]} className={styles.textPreLine}>
          {`틀릴 수 있는 횟수가 달라져요.\n어려울수록 긴장감이 높아요!`}
        </Text>
      </Flex>

      <div className={styles.grid} role="radiogroup" aria-label="난이도">
        {DIFFICULTIES.map(d => {
          const isSelected = selected === d.id;

          return (
            <button
              key={d.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={isSelected ? styles.cardSelected : styles.card}
              onClick={() => setSelected(d.id)}
            >
              <Text as="span" fontSize="subtitle2" fontWeight="semibold">
                {d.label}
              </Text>
              <Text as="span" fontSize="caption" color={vars.color.grey[500]}>
                {d.description}
              </Text>
            </button>
          );
        })}
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
          선택 완료 →
        </Button>
      </div>
    </div>
  );
}

DifficultySelect.displayName = 'DifficultySelect';
