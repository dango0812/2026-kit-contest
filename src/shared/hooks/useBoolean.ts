import { type Dispatch, type SetStateAction, useCallback, useState } from 'react';

interface ReturnType {
  value: boolean;
  handleTrue: () => void;
  handleFalse: () => void;
  handleToggle: () => void;
  setValue: Dispatch<SetStateAction<boolean>>;
}

export function useBoolean(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(Boolean(defaultValue));

  const handleTrue = useCallback(() => {
    setValue(true);
  }, []);

  const handleFalse = useCallback(() => {
    setValue(false);
  }, []);

  const handleToggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return {
    value,
    handleTrue,
    handleFalse,
    handleToggle,
    setValue,
  };
}
