import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../../types';

type TInitialState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: function (state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: function (state) {
      console.log(state);
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
