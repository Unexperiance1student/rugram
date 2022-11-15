import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: '',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase((state, action) => {});
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
