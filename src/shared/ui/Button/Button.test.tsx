import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('children을 렌더링한다', () => {
    render(<Button>다음</Button>);
    expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
  });

  it('기본 type은 button이다', () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('클릭 이벤트가 동작한다', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('disabled 상태에서는 클릭이 동작하지 않는다', async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        비활성
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('disabled 상태에서 disabled 속성이 적용된다', () => {
    render(<Button disabled>비활성</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('fullWidth가 적용되면 className이 변경된다', () => {
    const { rerender } = render(<Button>기본</Button>);
    const defaultClass = screen.getByRole('button').className;

    rerender(<Button fullWidth>전체</Button>);
    expect(screen.getByRole('button').className).not.toBe(defaultClass);
  });

  it('loading 상태에서 버튼이 비활성화된다', () => {
    render(<Button loading>로딩 중…</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('loading 상태에서 aria-busy가 설정된다', () => {
    render(<Button loading>로딩 중…</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('loading 상태에서 Loader 컴포넌트가 표시된다', () => {
    render(<Button loading>로딩 중…</Button>);
    const btn = screen.getByRole('button');
    expect(btn.querySelector('svg')).toBeInTheDocument();
  });
});
