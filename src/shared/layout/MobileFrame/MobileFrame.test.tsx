import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MobileFrame } from './MobileFrame';

describe('MobileFrame', () => {
  it('Content의 children을 렌더링한다', () => {
    render(
      <MobileFrame>
        <MobileFrame.Content>컨텐츠</MobileFrame.Content>
      </MobileFrame>,
    );
    expect(screen.getByText('컨텐츠')).toBeInTheDocument();
  });

  it('Content는 main 역할의 요소로 렌더링된다', () => {
    render(
      <MobileFrame>
        <MobileFrame.Content>내용</MobileFrame.Content>
      </MobileFrame>,
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('header prop이 없으면 렌더링되지 않는다', () => {
    render(
      <MobileFrame>
        <MobileFrame.Content>내용</MobileFrame.Content>
      </MobileFrame>,
    );
    expect(screen.queryByText('페이지 제목')).not.toBeInTheDocument();
  });

  it('header prop을 전달하면 텍스트가 렌더링된다', () => {
    render(
      <MobileFrame header="페이지 제목">
        <MobileFrame.Content>내용</MobileFrame.Content>
      </MobileFrame>,
    );
    expect(screen.getByText('페이지 제목')).toBeInTheDocument();
  });

  it('header가 Content보다 먼저 DOM에 위치한다', () => {
    render(
      <MobileFrame header="헤더">
        <MobileFrame.Content>
          <span>바디</span>
        </MobileFrame.Content>
      </MobileFrame>,
    );
    const header = screen.getByText('헤더');
    const body = screen.getByText('바디');
    expect(header.compareDocumentPosition(body) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('Notch에 children을 넣으면 렌더링된다', () => {
    render(
      <MobileFrame>
        <MobileFrame.Notch>
          <span>09:41</span>
        </MobileFrame.Notch>
        <MobileFrame.Content>내용</MobileFrame.Content>
      </MobileFrame>,
    );
    expect(screen.getByText('09:41')).toBeInTheDocument();
  });

  it('width/height를 전달하면 프레임에 인라인 스타일로 적용된다', () => {
    render(
      <MobileFrame width={390} height={844}>
        <MobileFrame.Content>내용</MobileFrame.Content>
      </MobileFrame>,
    );
    const frame = screen.getByRole('main').parentElement;
    expect(frame).toHaveStyle({ width: '390px', height: '844px' });
  });
});
