import { createAsyncThunk } from '@reduxjs/toolkit';

import { News } from '../../../models/News';
import { NewsService } from '../../../services/news';
import { RootState } from '../../index';

export const fetchNews = createAsyncThunk<News[], void, { state: RootState }>(
  'news/fetchNews',
  async (_, thunkAPI) => {
    try {
      const response = await NewsService.getAll();
      return response.data.result;
    } catch (e) {
      return thunkAPI.rejectWithValue('News not loaded');
    }
  },
);
