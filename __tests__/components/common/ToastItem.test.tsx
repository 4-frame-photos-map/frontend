import { render, screen, waitFor } from '@testing-library/react';
import ToastItem from '@components/common/ToastItem';

describe('토스트 메시지 출력 확인', () => {
  test('토스트 메시지 초기 스타일 확인', async () => {
    render(<ToastItem duration={1000}>토스트 메시지</ToastItem>);
    const toastText = screen.getByText('토스트 메시지');
    expect(toastText).toHaveStyle('opacity: 0');
    await waitFor(() => {
      expect(toastText).toHaveStyle('opacity: 1');
    });
  });
  test('토스트가 화면에 렌더링 되는지 확인', async () => {
    render(<ToastItem duration={1000}>토스트 메시지</ToastItem>);
    const toastText = screen.getByText('토스트 메시지');
    expect(toastText).toHaveStyle('opacity: 0');
    await waitFor(() => {
      expect(toastText).toHaveStyle('opacity: 1');
    });
  });
});
