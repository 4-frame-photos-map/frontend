import authApi from '@apis/auth/authApi';
import AuthLayout from '@components/layout/AuthLayout';
import { setToken } from '@utils/token';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const Kakao = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    setIsLogin(true);
  }, []);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    async function login() {
      const { access_token, refresh_token } = await authApi.kakaoLogin(code);
      const token = {
        accessToken: access_token,
        refreshToken: refresh_token,
      };
      if (token) {
        setToken(token);
        router.push('/home');
      } else {
        router.push('/auth/login');
      }
    }
    if (isLogin) {
      login();
    }
  }, [isLogin]);
  return (
    <AuthLayout>
      <SuccessContainer>
        <Image
          src={'/svg/login/pin-badge-orange.svg'}
          width={66}
          height={66}
          alt="pin-badge"
        />
        <SuccessText>로그인 성공!</SuccessText>
        <Image
          src="/svg/login/success-image.svg"
          width={375}
          height={390}
          priority={true}
          alt="success-image"
        />
      </SuccessContainer>
    </AuthLayout>
  );
};

const SuccessContainer = tw.div`
flex flex-col items-center pt-12
`;

const SuccessText = tw.p`
font-semibold text-title1 mt-3
`;

export default Kakao;
