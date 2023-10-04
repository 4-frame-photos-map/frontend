import { render, screen } from '@testing-library/react';
import StarRate from '@components/common/StarRate';

describe('color props에 따른 별 image', () => {
  test('color prop의 값이 true이고 별점이 3점일 때', () => {
    render(<StarRate color={true} rate={3} />);
    const starImages: HTMLImageElement[] = screen.getAllByRole('img');
    const altText = starImages.map((ele) => ele.alt);
    expect(altText).toEqual(['별', '별', '별', '빈 별', '빈 별']);
  });
  test('color prop의 값이 false 이고 별점이 2.5점일 때', () => {
    render(<StarRate color={false} rate={2.5} />);
    const starImages: HTMLImageElement[] = screen.getAllByRole('img');
    const altText = starImages.map((ele) => ele.alt);
    expect(altText).toEqual([
      '검정색 별',
      '검정색 별',
      '검정색 반 별',
      '검정색 빈 별',
      '검정색 빈 별',
    ]);
  });
});

describe('별점에 따른 image 확인', () => {
  test('별점이 3점일 때', () => {
    render(<StarRate color={true} rate={3} />);
    const starImages: HTMLImageElement[] = screen.getAllByRole('img');
    const altText = starImages.map((ele) => ele.alt);
    expect(altText).toEqual(['별', '별', '별', '빈 별', '빈 별']);
  });
  test('별점이 1점일 때', () => {
    render(<StarRate color={true} rate={1} />);
    const starImages: HTMLImageElement[] = screen.getAllByRole('img');
    const altText = starImages.map((ele) => ele.alt);
    expect(altText).toEqual(['별', '빈 별', '빈 별', '빈 별', '빈 별']);
  });
  test('별점이 3.8점일 때', () => {
    render(<StarRate color={true} rate={3.8} />);
    const starImages: HTMLImageElement[] = screen.getAllByRole('img');
    const altText = starImages.map((ele) => ele.alt);
    expect(altText).toEqual(['별', '별', '별', '반 별', '빈 별']);
  });
});
