import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="나와 가까운 네컷 사진 포토부스를 찾아보세요. 네컷 지도"
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
