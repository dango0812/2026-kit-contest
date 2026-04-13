import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { TextField } from './TextField';

describe('TextField', () => {
  it('input 요소를 렌더링한다', () => {
    render(<TextField id="test" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('label이 있으면 렌더링한다', () => {
    render(<TextField id="test" label="닉네임" />);
    expect(screen.getByLabelText('닉네임')).toBeInTheDocument();
  });

  it('label이 없으면 wrapper 없이 input만 렌더링한다', () => {
    const { container } = render(<TextField id="test" />);
    expect(container.firstChild?.nodeName).toBe('INPUT');
  });

  it('placeholder가 표시된다', () => {
    render(<TextField id="test" placeholder="입력하세요" />);
    expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
  });

  it('값 입력이 동작한다', async () => {
    render(<TextField id="test" />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, '안녕');
    expect(input).toHaveValue('안녕');
  });

  it('disabled 상태가 적용된다', () => {
    render(<TextField id="test" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('error가 있으면 에러 메시지를 렌더링한다', () => {
    render(<TextField id="test" error="필수 입력입니다" />);
    expect(screen.getByRole('alert')).toHaveTextContent('필수 입력입니다');
  });

  it('error가 있으면 aria-invalid가 설정된다', () => {
    render(<TextField id="test" error="에러" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('error가 있으면 aria-describedby로 연결된다', () => {
    render(<TextField id="test" error="에러" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-error');
    expect(document.getElementById('test-error')).toHaveTextContent('에러');
  });

  it('className이 병합된다', () => {
    render(<TextField id="test" className="custom" />);
    expect(screen.getByRole('textbox').className).toContain('custom');
  });

  it('readOnly가 적용된다', () => {
    render(<TextField id="test" readOnly defaultValue="읽기전용" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readOnly');
  });
});
