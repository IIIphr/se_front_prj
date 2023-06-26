import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_uni_id: -1,
    user_stu_id: -1,
    user_id: -1,
    user_type: null,
    user_f_name: "",
    user_l_name: "",
    user_credit: 0,
    user_password: null
  },
  reducers: {
    change_id: (state, action) => {
      state.user_id = action.payload;
    },
    change_uni_id: (state, action) => {
      state.user_uni_id = action.payload;
    },
    change_stu_id: (state, action) => {
      state.user_stu_id = action.payload;
    },
    change_type: (state, action) => {
      state.user_type = action.payload;
    },
    change_f_name: (state, action) => {
      state.user_f_name = action.payload;
    },
    change_l_name: (state, action) => {
      state.user_l_name = action.payload;
    },
    change_credit: (state, action) => {
      state.user_credit = action.payload;
    },
    change_password: (state, action) => {
      state.user_password = action.payload;
    }
  },
});

export const { change_id, change_uni_id, change_stu_id, change_type, change_f_name, change_l_name, change_credit, change_password } = userSlice.actions;

export default userSlice.reducer;