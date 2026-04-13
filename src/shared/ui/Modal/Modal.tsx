import { useEffect, useRef } from 'react';

import { useClickOutside } from '@shared/hooks/useClickOutside';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Text';

import * as styles from './styles.css';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Modal({
  isOpen,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside(panelRef, onCancel);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.panel} ref={panelRef} tabIndex={-1}>
        <Flex direction="column" gap="8">
          <Text as="h2" fontSize="subtitle1" fontWeight="bold" id="modal-title">
            {title}
          </Text>
          {description && (
            <Text as="p" fontSize="body2" lineHeight="large" color="#6B7280">
              {description}
            </Text>
          )}
        </Flex>

        <div className={styles.buttonGroup}>
          <Button color="secondary" size="medium" fullWidth onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button color="error" size="medium" fullWidth onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

Modal.displayName = 'Modal';
