import type { NextApiRequest, NextApiResponse } from 'next';

import { getSerializedRefreshTokenCookie } from '../../../helpers';
import { User } from '../../../models/User';
import { AUTH_URLS } from '../../../services/auth/constants';
import { SignupResponse } from '../../../services/auth/responses.type';
import { serverAxiosInstance } from '../../../services/AxiosInstance';

type Data = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const result = await serverAxiosInstance.post<SignupResponse>(
      AUTH_URLS.SIGNIN,
      req.body,
    );

    res.setHeader(
      'Set-Cookie',
      getSerializedRefreshTokenCookie(result.data.refresh_token),
    );

    res.status(200).json({ ...result.data });
  } catch (e) {
    res.status(400).json({} as Data);
  }
}
