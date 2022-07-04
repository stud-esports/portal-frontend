import type { NextApiRequest, NextApiResponse } from 'next';

import { University } from '../../../models/University';
import { serverAxiosInstance } from '../../../services/AxiosInstance';
import { UNIVERSITIES_URLS } from '../../../services/universities/constants';

type Data = {
  result: University[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const result = await serverAxiosInstance.get(UNIVERSITIES_URLS.GET_ALL);
    return res.status(200).json({ result: result.data });
  } catch (e) {
    res.status(400).json({ result: [] });
  }
}
