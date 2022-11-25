import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPostsTotalCount = createAsyncThunk(
  'posts/fetchPostsTotalCount',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`http://localhost:3001/posts?_page=1`);

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const dataCount = response.headers.get('X-Total-Count');
    return dataCount;
  }
);
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async function (page = '1', { rejectWithValue, getState }) {
    const response = await fetch(
      `http://localhost:3001/posts?${page && `_page=${page}`}&_limit=4`
    );

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const store = getState();
    const data = await response.json();
    return [...store.posts.posts, ...data];
  }
);
export const likePost = createAsyncThunk(
  'posts/likePost',
  async function ({ userId, postId }, { rejectWithValue, getState, dispatch }) {
    const post = getState().posts.posts.find((post) => post.id === postId);
    if (post) {
      const newPost = { ...post, likes: [...post.likes] };
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: post.likes.includes(userId)
            ? (newPost.likes = newPost.likes.filter(
                (like) => Number(like) !== Number(userId)
              ))
            : newPost.likes.concat(userId),
        }),
      });

      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }
      const data = await response.json();

      return data;
    }

    return rejectWithValue('No post!');
  }
);

const initialState = {
  posts: [],
  totalCount: 0,
  isPostsLoading: false,
  postError: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePosts: (state, action) => {
      const likePost = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      console.log(likePost);
      console.log(action.payload.postId);
      console.log(action.payload.userId);

      if (likePost) {
        likePost.likes.includes(action.payload.userId)
          ? (likePost.likes = likePost.likes.filter(
              (like) => like === action.payload.userId
            ))
          : likePost.likes.push(action.payload.userId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsTotalCount.pending, (state) => {
        state.isPostsLoading = true;
        state.postError = null;
      })
      .addCase(fetchPostsTotalCount.fulfilled, (state, action) => {
        state.isPostsLoading = false;
        state.totalCount = action.payload;
      })

      .addCase(fetchPosts.pending, (state) => {
        state.isPostsLoading = true;
        state.postError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isPostsLoading = false;
        state.posts = action.payload;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const likePost = state.posts.find(
          (post) => post.id === action.payload.id
        );

        // if (likePost) {
        //   likePost.likes.includes(action.payload.userId)
        //     ? likePost.likes.filter((like) => like === action.payload.userId)
        //     : likePost.likes.push(action.payload.userId);
        // }
        // likePosts({
        //   userId: action.payload.userId,
        //   postId: action.payload.postId,
        // });
        likePost.likes = action.payload.likes;
      })

      .addMatcher(ispostError, (state, action) => {
        state.postError = Number(action.payload);
        state.isPostsLoading = false;
      });
  },
});

function ispostError(action) {
  return action.type.endsWith('rejected');
}

export default postsSlice.reducer;
export const { likePosts } = postsSlice.actions;
