import Head from 'next/head';

type MetaHeadProps = {
  title: string;
  description: string;
};

const MetaHead = ({ title, description }: MetaHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
    </Head>
  );
};

export default MetaHead;
