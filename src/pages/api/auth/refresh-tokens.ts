import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getSerializedDeleteTokenCookie,
  getSerializedRefreshTokenCookie,
} from '../../../helpers';
import { AUTH_URLS } from '../../../services/auth/constants';
import { serverAxiosInstance } from '../../../services/AxiosInstance';

type Data = {
  refresh_token: string;
  access_token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (!req.cookies.refresh_token) {
      res.setHeader('Set-Cookie', getSerializedDeleteTokenCookie());
      return res.status(400).json({} as Data);
    }
    const result = await serverAxiosInstance.get<Data>(
      AUTH_URLS.REFRESH_TOKENS,
      {
        headers: {
          Cookie: `refresh_token=${req.cookies.refresh_token};`,
        },
      },
    );

    res.setHeader(
      'Set-Cookie',
      getSerializedRefreshTokenCookie(result.data.refresh_token),
    );

    res.status(200).json(result.data);
  } catch (e) {
    res.setHeader('Set-Cookie', getSerializedDeleteTokenCookie());
    res.status(400).json({} as Data);
  }
}
