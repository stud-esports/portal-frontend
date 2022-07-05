import type { NextPage } from 'next';
import Head from 'next/head';

import { CommentUserPage } from '../../../components/pages/CommentUser';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Лосев Александр</title>
      </Head>
      <CommentUserPage />
    </>
  );
};

export default Home;
