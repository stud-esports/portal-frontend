import type { NextPage } from 'next';
import Head from 'next/head';

import { InDevelopment } from '../components/PlugScreens/InDevelopment';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Новости и Статьи</title>
      </Head>
      <InDevelopment />
    </>
  );
};

export default Home;
