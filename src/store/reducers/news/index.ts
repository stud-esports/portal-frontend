import { newsSlice } from './NewsSlice';

const { actions, reducer } = newsSlice;

export const { clearNewsState } = actions;

export default reducer;
