import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Toast } from './Toast';

function renderToast(props?: Partial<Parameters<typeof Toast>[0]>) {
  return render(<Toast isOpen={true} message="저장되었습니다." onClose={vi.fn()} {...props} />);
}

describe('Toast', () => {
  it('isOpen=true일 때 텍스트를 렌더링한다', () => {
    renderToast({ message: '저장되었습니다.' });
    expect(screen.getByText('저장되었습니다.')).toBeInTheDocument();
  });

  it('isOpen=false일 때 렌더링하지 않는다', () => {
    renderToast({ isOpen: false });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('role="status"와 aria-live="polite"를 가진다', () => {
    renderToast();
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('닫기 버튼 클릭 시 onClose를 호출한다', async () => {
    const onClose = vi.fn();
    renderToast({ onClose });

    await userEvent.click(screen.getByRole('button', { name: '토스트 닫기' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('닫기 버튼에 Space 키 입력 시 onClose를 호출한다', async () => {
    const onClose = vi.fn();
    renderToast({ onClose });

    const closeBtn = screen.getByRole('button', { name: '토스트 닫기' });
    closeBtn.focus();
    await userEvent.keyboard(' ');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('color prop이 적용된 상태로 렌더링된다', () => {
    const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'black'] as const;

    colors.forEach(color => {
      const { unmount } = renderToast({ color });
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    });
  });

  describe('자동 닫힘', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('delay 이후 onClose를 호출한다', () => {
      const onClose = vi.fn();
      renderToast({ onClose, delay: 2000 });

      act(() => vi.advanceTimersByTime(2000));
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('delay=0이면 onClose를 자동 호출하지 않는다', () => {
      const onClose = vi.fn();
      renderToast({ onClose, delay: 0 });

      act(() => vi.advanceTimersByTime(10000));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('isOpen=false이면 타이머를 시작하지 않는다', () => {
      const onClose = vi.fn();
      renderToast({ isOpen: false, onClose, delay: 1000 });

      act(() => vi.advanceTimersByTime(1000));
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
