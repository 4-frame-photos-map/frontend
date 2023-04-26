import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { getLocalStorage } from '@utils/localStorage';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Layout from '@components/layout/Layout';
import Modal from '@components/common/Modal';

declare global {
  interface Window {
    kakao: any;
    Kakao: any;
  }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const loginRequiredPages = ['/my', '/wish'];
  if (typeof window !== 'undefined') {
    if (
      loginRequiredPages.includes(router.pathname) &&
      !getLocalStorage('@token')
    ) {
      return (
        <Layout>
          <Modal
            isModal={true}
            isKakao={true}
            title="로그인 상태가 아니에요!"
            message="해당 페이지는 카카오톡 로그인을 하셔야 이용가능한 페이지에요. 로그인 하시겠어요?"
            left="아니요"
            leftEvent={() => router.back()}
          />
        </Layout>
      );
    }
  }
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>,
  );
}

export { queryClient };
