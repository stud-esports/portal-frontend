import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { News } from '../../../models/News';
import { fetchNews } from './ActionCreators';

interface UniversitiesState {
  news: News[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UniversitiesState = {
  news: [],
  isLoading: true,
  error: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNewsState(state) {
      state.news = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.news = action.payload;
    });

    builder.addCase(fetchNews.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchNews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});
