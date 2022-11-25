import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async function (id, { rejectWithValue }) {
    const response = await fetch(`http://localhost:3001/users?_id=${id}`);

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await response.json();
    return data;
  }
);

export const fetchAuthorizedUser = createAsyncThunk(
  'user/fetchAuthorizedUser',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`http://localhost:3001/users?id=1`);

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  user: {},
  isUserLoading: false,
  userError: null,
  authorizedUser: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
        state.userError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload;
      })

      .addCase(fetchAuthorizedUser.pending, (state) => {
        state.isUserLoading = true;
        state.userError = null;
      })
      .addCase(fetchAuthorizedUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        if (action.payload.length === 0) {
          state.authorizedUser = undefined;
        } else {
          state.authorizedUser = action.payload;
        }
      })

      .addMatcher(isuserError, (state, action) => {
        state.userError = Number(action.payload);
        state.isUserLoading = false;
      });
  },
});

function isuserError(action) {
  return action.type.endsWith('rejected');
}

export default userSlice.reducer;
export const {} = userSlice.actions;
