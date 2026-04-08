import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import type { Color } from '../types';

export type CheckboxControlProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'checked' | 'disabled' | 'onChange'
>;

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 체크박스의 색상을 지정합니다.
   * @default 'primary'
   */
  color?: Color;
  /**
   * 컴포넌트 상태를 제어합니다. 이 값을 설정하면 체크박스는 제어 컴포넌트가 됩니다.
   * onChange 콜백에서 이 값을 변경하는 방식으로 체크 상태를 업데이트해야 합니다.
   */
  checked?: boolean;
  /**
   * 컴포넌트 초기 상태를 설정합니다.
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 체크 상태 변경 콜백입니다.
   */
  onChange?: (checked: boolean) => void;
  /**
   * 비활성화 여부를 지정합니다.
   * @default false
   */
  disabled?: boolean;
  children: ReactNode;
}
