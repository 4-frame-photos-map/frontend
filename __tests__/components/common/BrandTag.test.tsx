import { render, screen } from '@testing-library/react';
import BrandTag from '@components/common/BrandTag';

describe('전달받는 브랜드 이름에 따른 정확한 색상 도출', () => {
  test('인생네컷을 전달받은 경우 배경 색상 분홍색', () => {
    render(<BrandTag name="인생네컷" />);
    const brandHeading = screen.getByRole('heading', { name: '인생네컷' });
    expect(brandHeading).toHaveClass('bg-brand-pink');
  });
  test('하루필름을 전달받은 경우 배경 색상 파란색', () => {
    render(<BrandTag name="하루필름" />);
    const brandHeading = screen.getByRole('heading', { name: '하루필름' });
    expect(brandHeading).toHaveClass('bg-brand-blue');
  });
  test('포토이즘을 전달받은 경우 배경 색상 검은색', () => {
    render(<BrandTag name="포토이즘" />);
    const brandHeading = screen.getByRole('heading', { name: '포토이즘' });
    expect(brandHeading).toHaveClass('bg-brand-black');
  });
  test('포토그레이를 전달받은 경우 배경 색상 회색', () => {
    render(<BrandTag name="포토그레이" />);
    const brandHeading = screen.getByRole('heading', { name: '포토그레이' });
    expect(brandHeading).toHaveClass('bg-brand-gray');
  });
});
