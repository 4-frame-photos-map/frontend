import ReviewItem from '@components/common/ReviewItem';
import { logRoles, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const reviewData = {
  create_date: [2023, 8, 25, 15, 5, 51, 622394000],
  star_rating: 4,
  content: '리뷰 아이템 컴포넌트 테스트',
  purity: 'GOOD',
  retouch: 'GOOD',
  item: 'BAD',
  member_info: {
    id: 123,
    nickname: 'testuser',
    main_member_title: '뉴비',
  },
};

const reviewData2 = {
  create_date: [2023, 8, 25, 15, 5, 51, 622394000],
  star_rating: 4,
  content: '리뷰 아이템 컴포넌트 테스트',
  purity: 'GOOD',
  retouch: 'GOOD',
  item: 'UNSELECTED',
  member_info: {
    id: 123,
    nickname: 'testuser',
    main_member_title: '뉴비',
  },
};

describe('리뷰 아이템 요소 확인', () => {
  test('별점이 4점인 경우 별 이미지', () => {
    render(<ReviewItem {...reviewData} />);
    const starImages: HTMLImageElement[] = screen.getAllByRole('img', {
      name: /별/,
    });
    const altText = starImages.map((ele) => ele.alt);
    expect(altText).toEqual([
      '검정색 별',
      '검정색 별',
      '검정색 별',
      '검정색 별',
      '검정색 빈 별',
    ]);
  });
  test('리뷰 작성일', () => {
    render(<ReviewItem {...reviewData} />);
    const reviewDate = screen.getByText(/23-08-25/);
    expect(reviewDate).toBeInTheDocument();
  });
  test('유저 아이디', () => {
    render(<ReviewItem {...reviewData} />);
    const userId = screen.getByText(/testuser/);
    expect(userId).toBeInTheDocument();
  });
  test('유저 칭호', () => {
    render(<ReviewItem {...reviewData} />);
    const userTitle = screen.getByText(/뉴비/);
    expect(userTitle).toBeInTheDocument();
  });
  test('리뷰 컨텐츠', () => {
    render(<ReviewItem {...reviewData} />);
    const reviewContent = screen.getByText(/리뷰 아이템 컴포넌트 테스트/);
    expect(reviewContent).toBeInTheDocument();
  });
});

describe('리뷰 value', () => {
  test('청결상태 좋음인 경우 리뷰 value', () => {
    render(<ReviewItem {...reviewData} />);
    const reviewPurityValue = screen.getByAltText(/청결상태 좋음/);
    expect(reviewPurityValue).toBeInTheDocument();
  });
  test('보정정도 높음인 경우 리뷰 value', () => {
    render(<ReviewItem {...reviewData} />);
    const reviewPurityValue = screen.getByAltText(/보정정도 높음/);
    expect(reviewPurityValue).toBeInTheDocument();
  });
  test('악세사리 적음인 경우 리뷰 value', () => {
    render(<ReviewItem {...reviewData} />);
    const reviewItemValue = screen.getByAltText(/악세사리 적음/);
    expect(reviewItemValue).toBeInTheDocument();
  });
});
