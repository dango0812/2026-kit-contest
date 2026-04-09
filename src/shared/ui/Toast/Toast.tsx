import { type KeyboardEvent, useEffect } from 'react';

import { IconClose } from '@assets/icons';
import { createPortal } from 'react-dom';

import { Text } from '../Text';
import type { ToastProps } from './types';

import { closeButton, toastRecipe } from './styles.css';

export function Toast({
  isOpen,
  message,
  onClose,
  position = 'top-center',
  color = 'primary',
  delay = 3000,
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

  return createPortal(
    <div role="status" aria-live="polite" aria-atomic="true" className={toastRecipe({ position, color })}>
      <Text as="span" fontSize="body2">
        {message}
      </Text>
      <button
        type="button"
        className={closeButton}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        aria-label="토스트 닫기"
      >
        <IconClose aria-hidden />
      </button>
    </div>,
    document.body,
  );
}

Toast.displayName = 'Toast';
