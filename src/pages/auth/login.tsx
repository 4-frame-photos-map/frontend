import Modal from '@components/common/Modal';
import AuthLayout from '@components/layout/AuthLayout';
import { CONFIG } from '@config';
import { deleteToken } from '@utils/token';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);

  const leftEvent = () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${CONFIG.API_KEYS.LOGIN}&redirect_uri=${CONFIG.LOCAL}/auth/kakao&response_type=code`,
    );
  };

  const rightEvent = () => {
    router.push('/home');
  };

  useEffect(() => {
    deleteToken();
  }, []);
  return (
    <AuthLayout>
      <Image
        src="/svg/login-logo.svg"
        alt="logo"
        width={183}
        height={48}
        priority={true}
      />
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${CONFIG.API_KEYS.LOGIN}&redirect_uri=${CONFIG.LOCAL}/auth/kakao&response_type=code`}
        className="mx-[35px] mt-[140px] flex h-[45px] items-center justify-center gap-[8px] rounded-[6px] bg-[#FEE500] px-[80px]"
      >
        <Image src="/svg/kakao.svg" alt="Kakao Icon" width={18} height={18} />
        <p className="cursor-pointer whitespace-nowrap text-label2 leading-[17px] text-black">
          카카오 로그인
        </p>
      </Link>

      <div
        onClick={() => {
          setIsModal(true);
        }}
      >
        <p className="mt-[24px] cursor-pointer text-center text-caption1 text-black underline">
          로그인 없이 이용하기
        </p>
      </div>
      {isModal && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Modal
            isModal={isModal}
            isKakao={false}
            title="반가워요!"
            message={
              <>
                로그인 없이 이용하시면 서비스 이용에 제한이 있<br />
                어요.
                <br />
                이대로 로그인 없이 이용하시겠어요?
              </>
            }
            left="로그인 하기"
            right="이대로 진행"
            leftEvent={() => {
              setIsModal(false);
              leftEvent();
            }}
            rightEvent={() => {
              rightEvent();
              setIsModal(false);
            }}
          />
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;
