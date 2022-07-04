import { createAsyncThunk } from '@reduxjs/toolkit';

import { University } from '../../../models/University';
import { UniversitiesService } from '../../../services/universities';
import { RootState } from '../../index';

export const fetchUniversities = createAsyncThunk<
  University[],
  void,
  { state: RootState }
>('universities/fetchUniversities', async (_, thunkAPI) => {
  try {
    const response = await UniversitiesService.getAll();
    return response.data.result;
  } catch (e) {
    return thunkAPI.rejectWithValue('Universities not loaded');
  }
});
