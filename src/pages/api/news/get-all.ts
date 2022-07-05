import type { NextApiRequest, NextApiResponse } from 'next';

import { News } from '../../../models/News';
import { serverAxiosInstance } from '../../../services/AxiosInstance';
import { NEWS_URLS } from '../../../services/news/constants';

type Data = {
  result: News[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const result = await serverAxiosInstance.get<News[]>(NEWS_URLS.GET_ALL);
    return res.status(200).json({ result: result.data });
  } catch (e) {
    res.status(400).json({ result: [] });
  }
}
