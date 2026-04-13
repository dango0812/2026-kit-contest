import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TopBar } from './TopBar';

describe('TopBar', () => {
  it('뒤로 가기 버튼을 렌더링한다', () => {
    render(
      <TopBar>
        <TopBar.Back onBack={vi.fn()} />
      </TopBar>,
    );
    expect(screen.getByRole('button', { name: '뒤로 가기' })).toBeInTheDocument();
  });

  it('뒤로 가기 클릭 시 onBack이 호출된다', async () => {
    const handleBack = vi.fn();
    render(
      <TopBar>
        <TopBar.Back onBack={handleBack} />
      </TopBar>,
    );

    await userEvent.click(screen.getByRole('button', { name: '뒤로 가기' }));
    expect(handleBack).toHaveBeenCalledOnce();
  });

  it('Title이 없으면 제목을 렌더링하지 않는다', () => {
    render(
      <TopBar>
        <TopBar.Back onBack={vi.fn()} />
      </TopBar>,
    );
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it('Title이 있으면 제목을 렌더링한다', () => {
    render(
      <TopBar>
        <TopBar.Back onBack={vi.fn()} />
        <TopBar.Title>설정</TopBar.Title>
      </TopBar>,
    );
    expect(screen.getByText('설정')).toBeInTheDocument();
  });

  it('nav 요소로 렌더링한다', () => {
    render(
      <TopBar>
        <TopBar.Back onBack={vi.fn()} />
      </TopBar>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('RightContent를 렌더링한다', () => {
    render(
      <TopBar>
        <TopBar.Back onBack={vi.fn()} />
        <TopBar.RightContent>
          <button type="button">액션</button>
        </TopBar.RightContent>
      </TopBar>,
    );
    expect(screen.getByRole('button', { name: '액션' })).toBeInTheDocument();
  });
});
