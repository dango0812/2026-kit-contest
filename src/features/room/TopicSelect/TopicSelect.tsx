import { useState } from 'react';

import { type TopicId, TOPICS } from '@constants/topics';
import { vars } from '@shared/styles';
import { Button, Flex, Text, TopBar } from '@shared/ui';

import * as styles from './styles.css';

interface TopicSelectProps {
  onBack: () => void;
  onSelect: (topicId: string) => void;
}

export function TopicSelect({ onBack, onSelect }: TopicSelectProps) {
  const [selected, setSelected] = useState<TopicId | null>(null);

  return (
    <div className={styles.wrapper}>
      <TopBar>
        <TopBar.Back onBack={onBack} />
      </TopBar>

      <Flex direction="column" gap="10" className={styles.topSection}>
        <Text as="h1" fontSize="h6" fontWeight="bold" role="heading">
          학습 주제 선택
        </Text>
        <Text as="p" fontSize="body1" lineHeight="large" color={vars.color.grey[600]} className={styles.textPreLine}>
          {`AI가 선택한 주제에 맞춰\n사건을 만들어요.`}
        </Text>
      </Flex>

      <div className={styles.grid} role="radiogroup" aria-label="학습 주제">
        {TOPICS.map(topic => {
          const isSelected = selected === topic.id;

          return (
            <button
              key={topic.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={isSelected ? styles.topicCardSelected : styles.topicCard}
              onClick={() => setSelected(topic.id)}
            >
              <span className={styles.topicIcon} aria-hidden="true">
                <topic.icon width={32} height={32} />
              </span>
              <Text as="span" fontSize="subtitle2" fontWeight="semibold">
                {topic.label}
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
          AI 사건 생성하기 →
        </Button>
      </div>
    </div>
  );
}

TopicSelect.displayName = 'TopicSelect';
