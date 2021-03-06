import type { NextPage } from 'next';
import Head from 'next/head';

import { GamesListPage } from '../../components/pages/GamesList';

const Games: NextPage = () => {
  return (
    <>
      <Head>
        <title>Игры</title>
      </Head>
      <GamesListPage />
    </>
  );
};

export default Games;
