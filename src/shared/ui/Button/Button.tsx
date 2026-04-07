import { IconLoader } from '@assets/icons';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ButtonHTMLAttributes } from 'react';

import { button, content, spinner, spinnerOverlay } from './Button.css';

type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonVariants['color'];
  size?: ButtonVariants['size'];
  /** 부모 너비에 맞춤 */
  fullWidth?: boolean;
  /** 로딩 상태 (버튼 크기 유지, 스피너 표시) */
  loading?: boolean;
};

export function Button({
  color,
  size,
  fullWidth,
  loading,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      type={type}
      className={button({ color, size, disabled: isDisabled, fullWidth })}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
    >
      <span className={content}>{children}</span>

      {loading && (
        <span className={spinnerOverlay}>
          <IconLoader className={spinner} aria-hidden="true" />
        </span>
      )}
    </button>
  );
}
