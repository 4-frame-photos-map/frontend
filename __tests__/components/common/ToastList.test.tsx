import ToastList from '@components/common/ToastList';
import useToast from '@hooks/useToast';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

describe('useToast를 테스트한다.', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <Button />
        <ToastList />
      </RecoilRoot>,
    );
  });

  test('버튼을 누르면 토스트 목록에 ToastItem을 렌더링한다.', () => {
    const button = screen.getByRole('button', {
      name: 'button-label',
    });

    fireEvent.click(button);

    expect(screen.getByText(/토스트 메시지/)).toBeInTheDocument();
  });
});

const Button = () => {
  const { showToast } = useToast();

  return (
    <button
      onClick={() =>
        showToast({
          message: '토스트 메시지입니다.',
        })
      }
      aria-label="button-label"
    >
      버튼
    </button>
  );
};
