/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  token: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
  },
});

export const {addAuth} = authSlice.actions;

export default authSlice.reducer;
