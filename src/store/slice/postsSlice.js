import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPostsTotalCount = createAsyncThunk(
  'posts/fetchPosts',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`http://localhost:3001/posts?_page=1`);

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const dataCount = response.headers.get('X-Total-Count');
    return dataCount;
  }
);

const initialState = {
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
// export const {} = postsSlice.actions;
