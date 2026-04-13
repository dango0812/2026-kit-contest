import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

import { Text } from '../Text';
import type { Size } from '../types';

import * as styles from './styles.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 입력 필드의 크기를 지정합니다.
   * @default 'medium'
   */
  size?: Size;
  /**
   * 레이블 텍스트를 지정합니다.
   */
  label?: string;
  /**
   * 에러 메시지를 지정합니다. 값이 있으면 에러 스타일이 적용됩니다.
   */
  error?: string;
  /**
   * 추가적인 CSS 클래스를 지정합니다.
   */
  className?: string;
}

export function TextField({ size, label, error, id, className, ...rest }: TextFieldProps) {
  const hasError = Boolean(error);

  return (
    <div className={label || error ? styles.wrapper : undefined}>
      {label && (
        <label htmlFor={id}>
          <Text as="span" fontSize="body2" fontWeight="medium" color="secondary">
            {label}
          </Text>
        </label>
      )}

      <input
        id={id}
        className={clsx(styles.textFieldRecipe({ size, error: hasError }), className)}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...rest}
      />

      {hasError && (
        <Text as="span" id={`${id}-error`} fontSize="caption" color="error" aria-live="polite">
          {error}
        </Text>
      )}
    </div>
  );
}

TextField.displayName = 'TextField';
