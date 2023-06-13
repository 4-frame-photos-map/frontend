import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="description"
          content="네컷지도에서 나와 가까운 네컷 사진 포토부스를 찾아보세요."
        />
        <meta name="keywords" content="네컷지도" />
        <meta
          name="og:description"
          content="네컷지도에서 나와 가까운 네컷 사진 포토부스를 찾아보세요."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://d18tllc1sxg8cp.cloudfront.net/logo/main_logo.png"
        />
        <link
          href="https://webfontworld.github.io/pretendard/Pretendard.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
