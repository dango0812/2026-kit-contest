import { type KeyboardEvent, useEffect } from 'react';

import { IconClose } from '@assets/icons';
import { createPortal } from 'react-dom';

import { Text } from '../Text';
import type { ToastProps } from './types';

import * as styles from './styles.css';

export function Toast({
  isOpen,
  message,
  onClose,
  position = 'top-center',
  color = 'primary',
  delay = 3000,
  container,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen || delay === 0) {
      return;
    }

    const id = setTimeout(onClose, delay);

    return () => clearTimeout(id);
  }, [isOpen, delay, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  const portalTarget = container ?? document.body;
  const positionStyle = container ? { position: 'absolute' as const } : undefined;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={styles.toastRecipe({ position, color })}
      style={positionStyle}
    >
      <Text as="span" fontSize="body2">
        {message}
      </Text>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        aria-label="토스트 닫기"
      >
        <IconClose aria-hidden />
      </button>
    </div>,
    portalTarget,
  );
}

Toast.displayName = 'Toast';
