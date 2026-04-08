import { createContext, useContext } from 'react';

import type { Color } from '../types';

export interface CheckboxContextValue {
  checked: boolean;
  disabled: boolean;
  color: Color;
  handleToggle: () => void;
}

export const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export function useCheckbox() {
  const ctx = useContext(CheckboxContext);
  if (!ctx) {
    throw new Error('Checkbox 하위 컴포넌트는 <Checkbox> 안에서 사용해야 합니다.');
  }
  return ctx;
}
