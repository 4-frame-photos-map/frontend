import { render, screen } from '@testing-library/react';
import SplashLogin from '@components/common/SplashLogin';

describe('loading 상태에 따른 Splash 화면 출력', () => {
  test('loading 중인 경우', () => {
    render(<SplashLogin loading={true} />);
    const splashImage = screen.getByAltText('pin-badge');
    expect(splashImage).toBeInTheDocument();
  });

  test('loading이 끝난 경우', () => {
    render(<SplashLogin loading={false} />);
    const splashImage = screen.queryByAltText('pin-badge');
    expect(splashImage).not.toBeNull();
  });
});
