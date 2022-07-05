import type { NextPage } from 'next';
import Head from 'next/head';

import { CommentTeamPage } from '../../../components/pages/CommentTeam';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Progafute Team</title>
      </Head>
      <CommentTeamPage />
    </>
  );
};

export default Home;
