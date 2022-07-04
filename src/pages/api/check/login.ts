import type { NextApiRequest, NextApiResponse } from 'next';

import { serverAxiosInstance } from '../../../services/AxiosInstance';
import { CHECK_URLS } from '../../../services/check/constants';

type Data = {
  result: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (!req.query.login) {
      res.status(400).json({ result: false });
    }

    const checkResult = await serverAxiosInstance.get(CHECK_URLS.CHECK_LOGIN, {
      params: {
        login: req.query.login,
      },
    });
    res.status(200).json({ result: checkResult.data });
  } catch (e) {
    res.status(400).json({ result: false });
  }
}
