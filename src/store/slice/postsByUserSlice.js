import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  isPostsLoading: true,
  postError: null,
};

export const fetchUserPosts = createAsyncThunk(
  'userPosts/fetchUserPosts',
  async function (userId, { rejectWithValue }) {
    const response = await fetch(
      `http://localhost:3001/postsByUser?id=${userId}`
    );

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await response.json();

    return data[0].posts;
  }
);

export const likeUserPost = createAsyncThunk(
  'userPosts/likeUserPost',
  async function (
    { userId, postId, postAuthorId },
    { rejectWithValue, getState }
  ) {
    const posts = getState().userPosts.posts;
    const newPosts = [...posts];
    const postIndex = posts.findIndex((post) => post.id === postId);
    const postForEdit = { ...newPosts[postIndex] };

    if (postForEdit.likes.includes(userId)) {
      postForEdit.likes = postForEdit.likes.filter((like) => like !== userId);
    } else {
      postForEdit.likes = postForEdit.likes.concat(userId);
    }

    newPosts[postIndex] = { ...postForEdit };

    if (postForEdit) {
      const response = await fetch(
        `http://localhost:3001/postsByUser/${postAuthorId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: postAuthorId,
            posts: newPosts,
          }),
        }
      );
      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }
      const data = await response.json();

      return data;
    }

    return rejectWithValue('No post!');
  }
);

const postsByUserSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.isPostsLoading = true;
        state.postError = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isPostsLoading = false;

        state.posts = action.payload;
      })
      .addCase(likeUserPost.fulfilled, (state, action) => {
        // const idPost = state.posts.findIndex(
        //   (post) => post.id === action.payload.posts
        // );
        // console.log(idPost);
        // if (idPost) {
        //   idPost.likes = action.payload.likes;
        // }
        state.posts = action.payload.posts;
        // console.log(idPost);
        // console.log(action.payload.posts[0]);
      })
      .addMatcher(ispostError, (state, action) => {
        state.postError = Number(action.payload);
        state.isPostsLoading = false;
        state.posts = [];
      });
  },
});

function ispostError(action) {
  return action.type.endsWith('rejected');
}

export default postsByUserSlice.reducer;
export const {} = postsByUserSlice.actions;
