import { render, screen } from '@testing-library/react';
import Checkbox from '@components/common/Checkbox';

describe('label과 value에 따른 체크박스 확인', () => {
  test('label의 값이 악세사리인 경우', () => {
    render(
      <Checkbox
        id="item"
        label="악세사리"
        leftValue="많음"
        rightValue="적음"
        setValue={jest.fn()}
      />,
    );
    const checkboxLable = screen.getByText('악세사리');
    expect(checkboxLable).toBeInTheDocument();
  });
  test('하나의 레이블에 많음, 적음 값을 가지는 두개의 체크박스 존재', () => {
    render(
      <Checkbox
        id="item"
        label="악세사리"
        leftValue="많음"
        rightValue="적음"
        setValue={jest.fn()}
      />,
    );
    const checkboxMany = screen.getByText('많음', { exact: false });
    expect(checkboxMany).toBeInTheDocument();
    const checkboxFew = screen.getByText('적음', { exact: false });
    expect(checkboxFew).toBeInTheDocument();
  });
});
