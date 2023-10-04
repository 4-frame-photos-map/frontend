import { render, logRoles, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '@components/common/Modal';

describe('모달 구조 확인', () => {
  test('카카오 로그인 요청 모달', () => {
    render(
      <Modal
        isModal={true}
        isKakao={true}
        title="로그인 상태가 아니에요!"
        message="해당 페이지는 카카오톡 로그인을 하셔야 이용가능한 페이지에요. 로그인 하시겠어요?"
        left="아니요"
      />,
    );
    const modalHeading = screen.getByRole('heading');
    expect(modalHeading).toHaveTextContent('로그인 상태가 아니에요!');
    const modalMessage = screen.getByText('해당 페이지는', { exact: false });
    expect(modalMessage).toBeInTheDocument();
    const leftButton = screen.getByRole('button', { name: '아니요' });
    expect(leftButton).toBeInTheDocument();
    const kakaoLink = screen.getByRole('link', {
      name: 'kakao 카카오 로그인',
    });
    expect(kakaoLink).toBeInTheDocument();
  });
  test('기본 모달', () => {
    render(
      <Modal
        isModal={true}
        isKakao={false}
        title="저장 취소"
        message="해당 지점이 삭제돼요. 저장 페이지에서 삭제 진행하시겠어요?"
        left="저장 유지"
        right="저장 취소"
      />,
    );
    const modalHeading = screen.getByRole('heading', { name: '저장 취소' });
    expect(modalHeading).toBeInTheDocument();
    const modalMessage = screen.getByText('해당 지점이 삭제돼요.', {
      exact: false,
    });
    expect(modalMessage).toBeInTheDocument();
    const leftButton = screen.getByRole('button', { name: '저장 유지' });
    expect(leftButton).toBeInTheDocument();
    const rightButton = screen.getByRole('button', { name: '저장 취소' });
    expect(rightButton).toBeInTheDocument();
  });
  test('isModal 값이 false인 경우 모달이 나타나지 않음', () => {
    render(
      <Modal
        isModal={false}
        isKakao={false}
        title="저장 취소"
        message="해당 지점이 삭제돼요. 저장 페이지에서 삭제 진행하시겠어요?"
        left="저장 유지"
        right="저장 취소"
      />,
    );
    const modalHeading = screen.queryByRole('heading', { name: '저장 취소' });
    expect(modalHeading).not.toBeInTheDocument();
    const leftButton = screen.queryByRole('button', { name: '저장 유지' });
    expect(leftButton).not.toBeInTheDocument();
    const rightButton = screen.queryByRole('button', { name: '저장 취소' });
    expect(rightButton).not.toBeInTheDocument();
  });
});

// describe('링크 이동', () => {
//   test('카카오 버튼 클릭 시 카카오 로그인 페이지로 이동', async () => {
//     const user = userEvent.setup();
//     render(
//       <Modal
//         isModal={true}
//         isKakao={true}
//         title="로그인 상태가 아니에요!"
//         message="해당 페이지는 카카오톡 로그인을 하셔야 이용가능한 페이지에요. 로그인 하시겠어요?"
//         left="아니요"
//       />,
//     );
//     const kakaoLink = screen.getByRole('link', { name: /카카오 로그인/ });
//     expect(kakaoLink).toBeInTheDocument();
//     await user.click(kakaoLink);
//   });
// });
