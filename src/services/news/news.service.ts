import { AxiosResponse } from 'axios';

import { News } from '../../models/News';
import { axiosInstance } from '../AxiosInstance';
import { BFF_NEWS_URLS } from './constants';

export class NewsService {
  static async getAll(): Promise<AxiosResponse<{ result: News[] }>> {
    return await axiosInstance.get<{ result: News[] }>(BFF_NEWS_URLS.GET_ALL);
  }

  static async getById(): Promise<AxiosResponse<{ result: News }>> {
    return await axiosInstance.get<{ result: News }>(BFF_NEWS_URLS.GET_ALL);
  }
}
