import Head from 'next/head';

type SeoProps = {
  title: string;
  url: string;
};

const Seo = ({ title, url }: SeoProps) => {
  return (
    <Head>
      <title>{`${title} | 네컷지도`}</title>
      <meta name="og:title" content={`${title} | 네컷지도`} />
      <meta name="og:url" content={`https://photosmap.vercel.app/${url}`} />
      <meta name="viewport" content="width=device-width" />
    </Head>
  );
};

export default Seo;
