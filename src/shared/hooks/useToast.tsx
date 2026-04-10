import { createContext, useContext } from 'react';

import type { ToastProps } from '@shared/ui';

export type ToastOptions = Pick<ToastProps, 'color' | 'position' | 'delay'>;

export interface ShowToast {
  (message: string, options?: ToastOptions): void;
  close: () => void;
}

export const ToastContext = createContext<ShowToast | null>(null);

/**
 *
 * 토스트 메시지를 표시하기 위한 커스텀 훅입니다.
 *
 * @example
 * const showToast = useToast();
 *
 * showToast('성공 메시지', { color: 'success' });
 * showToast('에러 메시지', { color: 'error', position: "top-right"});
 * showToast('사라지지 않는 메시지', { delay: 0 });
 * showToast.close(); // 현재 표시중인 토스트를 닫습니다.
 */
export function useToast(): ShowToast {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error('useToast는 ToastProvider 안에서 사용되어야 합니다.');
  }

  return ctx;
}
