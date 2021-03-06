import type { NextPage } from 'next';
import Head from 'next/head';

import { HomePage } from '../components/pages/Home';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Новости и Статьи</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
