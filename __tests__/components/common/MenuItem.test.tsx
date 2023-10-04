import { render, screen } from '@testing-library/react';
import MenuItem from '@components/common/MenuItem';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  pathname: '/home', // 테스트에 필요한 경로
}));

describe('url 경로에 따른 MenuItem', () => {
  test('url 경로가 home을 포함', () => {
    render(<MenuItem key={1} name="홈" path="home" />);
    const router = require('next/router');
    expect(router.useRouter().pathname).toBe('/home');
  });
  test('prop으로 전달받은 path에 대응하는 이미지 출력', () => {
    render(<MenuItem key={1} name="홈" path="home" />);
    const menuItemImg: HTMLImageElement = screen.getByRole('img', {
      name: '홈',
    });
    expect(menuItemImg.alt).toBe('홈');
  });
  test('해당 메뉴 아이템 텍스트 색상 검정', () => {
    render(<MenuItem key={1} name="홈" path="home" />);
    const menuItemText = screen.getByText('홈');
    expect(menuItemText).toHaveClass('text-black');
  });
});
