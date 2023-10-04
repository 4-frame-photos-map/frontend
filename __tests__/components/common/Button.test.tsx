import { render, screen } from '@testing-library/react';
import Button from '@components/common/Button';

describe('버튼 텍스트 확인', () => {
  test('초기 버튼 텍스트가 이용리뷰 작성하기로 출력', () => {
    render(<Button />);
    const buttonText = screen.getByRole('button', {
      name: '이용리뷰 작성하기',
    });
    expect(buttonText).toHaveTextContent('이용리뷰 작성하기');
  });
});

describe('오른쪽 버튼 텍스트 확인', () => {
  test('isRightButton의 값이 true로 props로 전달되면 RightButton이 화면에 출력', () => {
    render(<Button isRightButton={true} />);
    const rightButton = screen.getByRole('button', { name: '작성 완료하기' });
    expect(rightButton).toBeInTheDocument();
  });
  test('isRightButton의 값이 true이고 rightText를 지정하여 전달되면 해당 텍스트를 가진 버튼 화면에 출력', () => {
    render(<Button isRightButton={true} rightText="커스텀 텍스트" />);
    const rightButton = screen.getByRole('button', { name: '커스텀 텍스트' });
    expect(rightButton).toBeInTheDocument();
  });
});

describe('props로 전달되는 disabled boolean 값에 따른 버튼 비활성화 확인', () => {
  test('disabled 값이 true일 때 초기 버튼 비활성화', () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole('button', { name: '이용리뷰 작성하기' });
    expect(button).toBeDisabled();
  });
  test('disabled 값이 false일 때 초기 버튼 활성화', () => {
    render(<Button disabled={false} />);
    const button = screen.getByRole('button', { name: '이용리뷰 작성하기' });
    expect(button).toBeEnabled();
  });
  test('disabled 값이 true일 때 RightButton 비활성화', () => {
    render(<Button isRightButton={true} disabled={true} />);
    const rightButton = screen.getByRole('button', { name: '작성 완료하기' });
    expect(rightButton).toBeDisabled();
  });
  test('disabled 값이 false일 때 RightButton 활성화', () => {
    render(<Button isRightButton={true} disabled={false} />);
    const rightButton = screen.getByRole('button', { name: '작성 완료하기' });
    expect(rightButton).toBeEnabled();
  });
});
