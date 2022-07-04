import { AxiosResponse } from 'axios';

import { axiosInstance } from '../AxiosInstance';
import { BFF_CHECK_URLS } from './constants';

export class CheckService {
  static async checkEmail(
    email: string,
  ): Promise<AxiosResponse<{ result: boolean }>> {
    return await axiosInstance.get<{ result: boolean }>(
      BFF_CHECK_URLS.CHECK_EMAIL,
      {
        params: { email },
      },
    );
  }
  static async checkPhone(
    phone: string,
  ): Promise<AxiosResponse<{ result: boolean }>> {
    return await axiosInstance.get<{ result: boolean }>(
      BFF_CHECK_URLS.CHECK_PHONE,
      {
        params: { phone },
      },
    );
  }
  static async checkLogin(
    login: string,
  ): Promise<AxiosResponse<{ result: boolean }>> {
    return await axiosInstance.get<{ result: boolean }>(
      BFF_CHECK_URLS.CHECK_LOGIN,
      {
        params: { login },
      },
    );
  }
}
