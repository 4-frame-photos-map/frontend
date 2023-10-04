import { logRoles, render, screen } from '@testing-library/react';
import Menu from '@components/common/Menu';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
  pathname: '/location', // 테스트에 필요한 경로
}));

describe('url 경로에 따른 메뉴바', () => {
  test('url 경로가 location을 포함', () => {
    const { container } = render(<Menu />);
    const router = require('next/router');
    expect(router.useRouter().pathname).toBe('/location');
    logRoles(container);
    screen.debug();
  });
  test('url 경로에 해당되는 MenuItem 텍스트 색상 검정', () => {
    render(<Menu />);
    const menuItemText = screen.getByText('내 주변');
    expect(menuItemText).toHaveClass('text-black');
  });
  test('url 경로에 해당하지 않는 MenuItem 텍스트 색상 assitive', () => {
    render(<Menu />);
    const menuItemText = screen.getByText('홈');
    expect(menuItemText).toHaveClass('text-text-assitive');
  });
});
