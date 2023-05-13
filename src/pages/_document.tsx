import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="description"
          content="나와 가까운 네컷 사진 포토부스를 찾아보세요, 네컷 지도"
        />
        <meta
          name="og:description"
          content="나와 가까운 네컷 사진 포토부스를 찾아보세요. 네컷 지도"
        />
        <meta property="og:title" content="네컷지도" />
        <meta property="og:type" content="website" />
        <meta property="og:article:author" content="네컷지도" />
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
