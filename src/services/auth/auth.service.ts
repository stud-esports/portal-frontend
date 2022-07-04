import { AxiosResponse } from 'axios';

import { User } from '../../models/User';
import { axiosInstance } from '../AxiosInstance';
import { BFF_AUTH_URLS } from './constants';
import {
  LogoutResponse,
  RefreshTokensResponse,
  SigninResponse,
  SignupResponse,
  UserCreationData,
} from './responses.type';

export class AuthService {
  static async refreshTokens(): Promise<AxiosResponse<RefreshTokensResponse>> {
    return await axiosInstance.get<RefreshTokensResponse>(
      BFF_AUTH_URLS.REFRESH_TOKENS,
    );
  }

  static async signin(
    email: string,
    password: string,
  ): Promise<AxiosResponse<SigninResponse>> {
    return await axiosInstance.post<SigninResponse>(BFF_AUTH_URLS.SIGNIN, {
      email,
      password,
    });
  }

  static async signup(
    data: UserCreationData,
  ): Promise<AxiosResponse<SignupResponse>> {
    return await axiosInstance.post<SignupResponse>(BFF_AUTH_URLS.SIGNUP, data);
  }

  static async getUserInfoByToken(
    access_token: string,
  ): Promise<AxiosResponse<User>> {
    return await axiosInstance.get<User>(BFF_AUTH_URLS.USER_INFO_BY_TOKEN, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  static async logout(): Promise<AxiosResponse<LogoutResponse>> {
    return await axiosInstance.get<LogoutResponse>(BFF_AUTH_URLS.LOGOUT);
  }
}
