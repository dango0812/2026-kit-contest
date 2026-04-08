import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

function renderCheckbox(props?: Partial<Parameters<typeof Checkbox>[0]>) {
  return render(
    <Checkbox {...props}>
      <Checkbox.Squircle />
    </Checkbox>,
  );
}

describe('Checkbox', () => {
  it('Indicator(버튼)를 렌더링한다', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('초기 상태는 체크 해제다', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
  });

  it('클릭 시 체크 상태로 변경된다', async () => {
    renderCheckbox();
    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('다시 클릭하면 체크 해제된다', async () => {
    renderCheckbox();
    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);
    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('checked prop으로 외부 상태를 제어한다', () => {
    renderCheckbox({ checked: true });
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('checked=false prop을 전달하면 체크 해제 상태다', () => {
    renderCheckbox({ checked: false });
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
  });

  it('클릭 시 onChange 콜백을 호출한다', async () => {
    const handleChange = vi.fn();
    renderCheckbox({ onChange: handleChange });

    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('disabled 상태에서 클릭해도 상태가 변경되지 않는다', async () => {
    renderCheckbox({ disabled: true });
    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('disabled 상태에서 버튼이 비활성화된다', () => {
    renderCheckbox({ disabled: true });
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('disabled 상태에서 onChange가 호출되지 않는다', async () => {
    const handleChange = vi.fn();
    renderCheckbox({ disabled: true, onChange: handleChange });

    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('Circle variant를 렌더링한다', () => {
    render(
      <Checkbox>
        <Checkbox.Circle />
      </Checkbox>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('Line variant를 렌더링한다', () => {
    render(
      <Checkbox>
        <Checkbox.Line />
      </Checkbox>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('<Checkbox> 밖에서 Squircle을 사용하면 에러가 발생한다', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Checkbox.Squircle />)).toThrow();
    spy.mockRestore();
  });

  it('<Checkbox> 밖에서 Circle을 사용하면 에러가 발생한다', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Checkbox.Circle />)).toThrow();
    spy.mockRestore();
  });

  it('<Checkbox> 밖에서 Line을 사용하면 에러가 발생한다', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Checkbox.Line />)).toThrow();
    spy.mockRestore();
  });
});
