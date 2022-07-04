import type { NextApiRequest, NextApiResponse } from 'next';

import { getSerializedDeleteTokenCookie } from '../../../helpers';
import { AUTH_URLS } from '../../../services/auth/constants';
import { serverAxiosInstance } from '../../../services/AxiosInstance';

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (!req.cookies.refresh_token) {
      res.setHeader('Set-Cookie', getSerializedDeleteTokenCookie());
      return res.status(400).json({} as Data);
    }

    await serverAxiosInstance.get<Data>(AUTH_URLS.LOGOUT, {
      headers: {
        Cookie: `refresh_token=${req.cookies.refresh_token};`,
      },
    });

    res.setHeader('Set-Cookie', getSerializedDeleteTokenCookie());
    res.status(200).json({});
  } catch (e) {
    res.setHeader('Set-Cookie', getSerializedDeleteTokenCookie());
    res.status(400).json({});
  }
}
