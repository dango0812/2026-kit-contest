import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

describe('Badge', () => {
  it('children을 렌더링한다', () => {
    const { getByText } = render(<Badge>새로운 소식</Badge>);
    expect(getByText('새로운 소식')).toBeInTheDocument();
  });

  it('dot 옵션이 true일 때 장식용 점을 렌더링하며, 보조공학기기에는 숨겨야 한다', () => {
    const { container } = render(<Badge dot>알림</Badge>);
    const dotElement = container.querySelector('span > span');
    expect(dotElement).toBeInTheDocument();
    expect(dotElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('className을 통해 외부 스타일을 받을 수 있다', () => {
    const { container } = render(<Badge className="custom-class">배지</Badge>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
