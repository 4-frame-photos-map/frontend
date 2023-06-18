import '@styles/globals.css';
import tw from 'tailwind-styled-components';
import Layout from '@components/layout/Layout';
import Modal from '@components/common/Modal';
import type { AppProps } from 'next/app';
import { getLocalStorage } from '@utils/localStorage';
import { useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

declare global {
  interface Window {
    kakao: any;
    Kakao: any;
  }
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const loginRequiredPages = ['/my', '/wish'];
  if (typeof window !== 'undefined') {
    if (
      loginRequiredPages.includes(router.pathname) &&
      !getLocalStorage('@token')
    ) {
      return (
        <LayoutBox>
          <Modal
            isModal={true}
            isKakao={true}
            title="로그인 상태가 아니에요!"
            message="해당 페이지는 카카오톡 로그인을 하셔야 이용가능한 페이지에요. 로그인 하시겠어요?"
            left="아니요"
            leftEvent={() => router.back()}
          />
        </LayoutBox>
      );
    }
  }
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

const LayoutBox = tw.div`
flex h-full w-screen justify-center overflow-hidden font-Pretendard
`;

export { queryClient };
