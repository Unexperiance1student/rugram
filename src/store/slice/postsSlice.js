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
  async function (page = '', { rejectWithValue, getState }) {
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

const initialState = {
  posts: [],
  totalCount: 0,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsTotalCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsTotalCount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCount = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addMatcher(isError, (state, action) => {
        state.error = Number(action.payload);
        state.loading = false;
      });
  },
});

function isError(action) {
  return action.type.endsWith('rejected');
}

export default postsSlice.reducer;
export const {} = postsSlice.actions;
