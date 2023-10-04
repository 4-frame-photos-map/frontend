import Textarea from '@components/common/Textarea';
import { render, screen, logRoles } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockRegister = jest.fn();
// 모의 함수에 원하는 동작 정의 (예: 성공적인 등록)
mockRegister.mockReturnValue({
  ref: { current: null },
  name: 'mockedInput',
});

describe('Textarea 요소확인', () => {
  test('prop으로 넘겨준 label 텍스트 확인', () => {
    const { container } = render(
      <Textarea
        label="이용리뷰"
        placeholder="리뷰를 남겨주세요! (100자 이내)"
        register={mockRegister()}
      />,
    );
    const label = screen.getByText('이용리뷰');
    expect(label).toBeInTheDocument();
    logRoles(container);
  });
  test('prop으로 넘겨준 placeholder 텍스트 확인', () => {
    render(
      <Textarea
        label="이용리뷰"
        placeholder="리뷰를 남겨주세요! (100자 이내)"
        register={mockRegister()}
      />,
    );
    const holder = screen.getByPlaceholderText(
      '리뷰를 남겨주세요! (100자 이내)',
    );
    expect(holder).toBeInTheDocument();
  });
  test('필수 작성 별표 표시 확인', () => {
    render(
      <Textarea
        label="이용리뷰"
        placeholder="리뷰를 남겨주세요! (100자 이내)"
        register={mockRegister()}
      />,
    );
    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveClass('text-status-error');
  });
  test('textarea에 입력한 내용 확인', async () => {
    const user = userEvent.setup();
    render(
      <Textarea
        label="이용리뷰"
        placeholder="리뷰를 남겨주세요! (100자 이내)"
        register={mockRegister()}
      />,
    );
    const textareaText = screen.getByRole('textbox');
    await user.clear(textareaText);
    await user.type(textareaText, '좋아요');
    expect(textareaText).toHaveValue('좋아요');
  });
});
