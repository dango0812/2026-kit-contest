import type { Color } from '../types';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastProps {
  /**
   * 표시 여부를 제어합니다.
   */
  isOpen: boolean;
  /**
   * 표시할 텍스트입니다.
   */
  message: string;
  /**
   * 토스트가 닫힐 때 호출되는 콜백입니다.
   */
  onClose: () => void;
  /**
   * 토스트가 표시될 위치입니다.
   * @default 'top-center'
   */
  position?: ToastPosition;
  /**
   * 토스트의 색상 테마입니다.
   * @default 'primary'
   */
  color?: Color;
  /**
   * 자동으로 닫히기까지의 시간(ms)입니다. 0이면 자동으로 닫히지 않습니다.
   * @default 3000
   */
  delay?: number;
  /**
   * 토스트를 렌더링할 컨테이너 요소입니다.
   * 지정하지 않으면 document.body에 포탈됩니다.
   */
  container?: HTMLElement | null;
}
