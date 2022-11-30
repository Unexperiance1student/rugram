import { configureStore } from '@reduxjs/toolkit';
import postsByUserSlice from './slice/postsByUserSlice';
// import { postsApi } from './api/postsApi';
import postsSlice from './slice/postsSlice';
import userSlice from './slice/userSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: userSlice,
    userPosts: postsByUserSlice,
    // [postsApi.reducerPath]: postsApi.reducer,
  },
  // middleware: (getDefaultMiddlware) =>
  //   getDefaultMiddlware().concat(postsApi.middleware),
});

export default store;
