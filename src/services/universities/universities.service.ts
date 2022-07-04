import { AxiosResponse } from 'axios';

import { University } from '../../models/University';
import { axiosInstance } from '../AxiosInstance';
import { BFF_UNIVERSITIES_URLS } from './constants';

export class UniversitiesService {
  static async getAll(): Promise<AxiosResponse<{ result: University[] }>> {
    return await axiosInstance.get<{ result: University[] }>(
      BFF_UNIVERSITIES_URLS.GET_ALL,
    );
  }
}
