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

export const sendComment = createAsyncThunk(
  'posts/sendComment',
  async function ({ user, text, postId }, { rejectWithValue, getState }) {
    const post = getState().posts.posts.find((post) => post.id === postId);
    if (post) {
      const newPost = { ...post, comments: [...post.comments] };
      const comment = {
        nickname: user,
        text: text,
      };
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comments: newPost.comments.concat(comment),
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
  reducers: {},
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
        const idPost = state.posts.find(
          (post) => post.id === action.payload.id
        );
        if (idPost) {
          idPost.likes = action.payload.likes;
        }
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        const idPost = state.posts.find(
          (post) => post.id === action.payload.id
        );

        if (idPost) {
          idPost.comments = action.payload.comments;
        }
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
export const {} = postsSlice.actions;
