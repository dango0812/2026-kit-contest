import { type CSSProperties, type KeyboardEvent, useMemo } from 'react';

import { IconCheck } from '@assets/icons';
import { useBoolean } from '@shared/hooks/useBoolean';
import clsx from 'clsx';

import type { CheckboxControlProps, CheckboxProps } from './types';
import { CheckboxContext, useCheckbox } from './useCheckbox';

import * as styles from './styles.css';

const DASH_TOTAL = 22;

const DRAW_HIDDEN: CSSProperties = {
  strokeDasharray: DASH_TOTAL,
  strokeDashoffset: DASH_TOTAL,
  transition: 'stroke-dashoffset 0.25s ease 0.05s',
};

const DRAW_VISIBLE: CSSProperties = {
  strokeDasharray: DASH_TOTAL,
  strokeDashoffset: 0,
  transition: 'stroke-dashoffset 0.25s ease 0.05s',
};

export function Checkbox({
  color = 'primary',
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className,
  children,
  ...rest
}: CheckboxProps) {
  const { value: isChecked, handleToggle: onToggle } = useBoolean(defaultChecked);

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    if (checked === undefined) {
      onToggle();
    }

    onChange?.(!(checked ?? isChecked));
  };

  const value = useMemo(
    () => ({ checked: checked ?? isChecked, disabled, color, handleToggle }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checked, isChecked, disabled, color],
  );

  return (
    <CheckboxContext.Provider value={value}>
      <div className={clsx(styles.wrapper, className)} {...rest}>
        {children}
      </div>
    </CheckboxContext.Provider>
  );
}

interface CheckboxIndicatorProps extends CheckboxControlProps {
  shape: 'squircle' | 'circle' | 'line';
  /** draw 애니메이션 사용 여부. Line variant는 false로 고정됩니다. @default true */
  showAnimation?: boolean;
}

function CheckboxIndicator({ shape, className, showAnimation = true, ...rest }: CheckboxIndicatorProps) {
  const { checked, disabled, color, handleToggle } = useCheckbox();

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={clsx(styles.indicatorRecipe({ shape, color, checked, disabled }), className)}
      {...rest}
    >
      <IconCheck
        className={styles.checkIconRecipe({ animation: showAnimation ? 'draw' : 'none', checked })}
        style={showAnimation ? (checked ? DRAW_VISIBLE : DRAW_HIDDEN) : undefined}
        aria-hidden
      />
    </button>
  );
}

Checkbox.displayName = 'Checkbox';
Checkbox.Circle = (props: CheckboxControlProps) => <CheckboxIndicator shape="circle" {...props} />;
Checkbox.Squircle = (props: CheckboxControlProps) => <CheckboxIndicator shape="squircle" {...props} />;
Checkbox.Line = (props: CheckboxControlProps) => <CheckboxIndicator shape="line" showAnimation={false} {...props} />;
