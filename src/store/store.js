import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './api/postsApi';

const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(postsApi.middleware),
});

export default store;
