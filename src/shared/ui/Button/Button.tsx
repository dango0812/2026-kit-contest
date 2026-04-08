import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

import { Loader } from '../Loader';
import type { Color, Size } from '../types';

import { buttonRecipe, content, loaderOverlay } from './styles.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 색상을 지정합니다.
   * @default 'primary'
   */
  color?: Color;
  /**
   * 버튼의 크기를 지정합니다.
   * @default 'large'
   */
  size?: Size;
  /**
   * 값이 `true`라면 버튼이 부모 요소의 전체 너비를 차지합니다.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * 값이 `true`라면 버튼이 비활성화되고 로더가 표시됩니다.
   * @default false
   */
  loading?: boolean;
  /**
   * 추가적인 CSS 클래스를 지정합니다.
   */
  className?: string;
}

export function Button({
  type = 'button',
  color,
  size,
  fullWidth,
  loading,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      {...rest}
      className={clsx(buttonRecipe({ color, size, disabled: isDisabled, fullWidth }), className)}
      disabled={isDisabled}
      aria-label={typeof children === 'string' ? children : 'button'}
      aria-busy={loading || undefined}
    >
      <span className={content}>{children}</span>
      {loading && (
        <span className={loaderOverlay}>
          <Loader size={size} color="secondary" />
        </span>
      )}
    </button>
  );
}

Button.displayName = 'Button';
