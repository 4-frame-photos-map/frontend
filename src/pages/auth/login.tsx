import AuthLayout from '@components/common/AuthLayout';
import Image from 'next/image';

const Login = () => {
  return (
    <AuthLayout>
      <Image
        src="/svg/login-logo.svg"
        alt="logo"
        width={183}
        height={48}
        priority={true}
      />
      <div className="mx-[35px] mt-[140px] flex h-[45px] items-center justify-center gap-[8px] rounded-[6px] bg-[#FEE500] px-[80px]">
        <Image src="/svg/kakao.svg" alt="Kakao Icon" width={18} height={18} />
        <p className="cursor-pointer whitespace-nowrap text-label2 font-normal not-italic leading-[17px] text-black">
          카카오 로그인
        </p>
      </div>
      <div>
        <p className="mt-[24px] h-[17px] w-[121px] cursor-pointer text-label2 font-normal not-italic leading-[17px] text-black underline">
          로그인 없이 이용하기
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
