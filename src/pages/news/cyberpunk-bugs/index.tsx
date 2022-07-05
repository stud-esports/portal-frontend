import type { NextPage } from 'next';
import Head from 'next/head';

import { CyberPunkNewsPage } from '../../../components/pages/CyberPunkNews';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Киберпанк, очередной перезапуск с багами</title>
      </Head>
      <CyberPunkNewsPage />
    </>
  );
};

export default Home;
