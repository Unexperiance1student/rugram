import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './api/postsApi';
import postsSlice from './slice/postsSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(postsApi.middleware),
});

export default store;
