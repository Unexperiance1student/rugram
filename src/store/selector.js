import { createSelector } from '@reduxjs/toolkit';

export const post = (state) => state.posts;
export const user = (state) => state.user;
export const userPosts = (state) => state.userPosts;

export const memoPost = createSelector([post], (post) => {
  return post;
});

export const memoUser = createSelector([user], (user) => {
  return user;
});

export const memoUserPosts = createSelector([userPosts], (userPosts) => {
  return userPosts;
});
