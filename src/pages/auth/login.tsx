import AuthLayout from '@components/layout/AuthLayout';
import { CONFIG } from '@config';
import { deleteToken } from '@utils/token';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const Login = () => {
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
        <p className="cursor-pointer whitespace-nowrap text-label2 font-normal not-italic leading-[17px] text-black">
          카카오 로그인
        </p>
      </Link>
      <div>
        <p className="mt-[24px] h-[17px] w-[121px] cursor-pointer text-label2 font-normal not-italic leading-[17px] text-black underline">
          로그인 없이 이용하기
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
