import { type PropsWithChildren, useMemo, useState } from 'react';

import { ToastContext, type ToastOptions } from '@shared/hooks/useToast';
import { Toast } from '@shared/ui';

interface ToastState {
  isOpen: boolean;
  message: string;
  options?: ToastOptions;
}

interface ToastProviderProps extends PropsWithChildren {
  container?: HTMLElement | null;
}

export function ToastProvider({ children, container }: ToastProviderProps) {
  const [state, setState] = useState<ToastState>({ isOpen: false, message: '' });

  const showToast = useMemo(() => {
    const fn = (message: string, options?: ToastOptions) => {
      setState({ isOpen: true, message, options });
    };

    fn.close = () => setState(prev => ({ ...prev, isOpen: false }));

    return fn;
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast
        isOpen={state.isOpen}
        message={state.message}
        onClose={showToast.close}
        container={container}
        {...state.options}
      />
    </ToastContext.Provider>
  );
}
