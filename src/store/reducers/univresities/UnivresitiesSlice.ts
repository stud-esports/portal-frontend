import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { University } from '../../../models/University';
import { fetchUniversities } from './ActionCreators';

interface UniversitiesState {
  universities: University[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UniversitiesState = {
  universities: [],
  isLoading: true,
  error: null,
};

export const univresitiesSlice = createSlice({
  name: 'univresities',
  initialState,
  reducers: {
    clearUniversitiesState(state) {
      state.universities = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUniversities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.universities = action.payload;
    });

    builder.addCase(fetchUniversities.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUniversities.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});
