import type { NextApiRequest, NextApiResponse } from 'next';

import { User } from '../../../models/User';
import { AUTH_URLS } from '../../../services/auth/constants';
import { serverAxiosInstance } from '../../../services/AxiosInstance';

type Data = User;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({} as User);
    }
    const result = await serverAxiosInstance.get<Data>(
      AUTH_URLS.USER_INFO_BY_TOKEN,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      },
    );
    res.status(200).json(result.data);
  } catch (e) {
    res.status(400).json({} as User);
  }
}
