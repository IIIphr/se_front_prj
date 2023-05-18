import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: -1,
    user_type: null,
    user_name: "",
    user_email: "",
    user_phone: ""
  },
  reducers: {
    change_id: (state, action) => {
      state.user_id = action.payload;
    },
    change_type: (state, action) => {
      state.user_type = action.payload;
    },
    change_name: (state, action) => {
      state.user_name = action.payload;
    },
    change_email: (state, action) => {
      state.user_email = action.payload;
    },
    change_phone: (state, action) => {
      state.user_phone = action.payload;
    }
  },
});

export const { change_id, change_type, change_name, change_email, change_phone } = userSlice.actions;

export default userSlice.reducer;