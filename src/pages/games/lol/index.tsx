import type { NextPage } from 'next';
import Head from 'next/head';

import { LoLPage } from '../../../components/pages/LoL';

const Games: NextPage = () => {
  return (
    <>
      <Head>
        <title>LoL</title>
      </Head>
      <LoLPage />
    </>
  );
};

export default Games;
