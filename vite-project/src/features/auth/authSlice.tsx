import { createSlice } from '@reduxjs/toolkit';
import {AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'


type SaveTokenPayload = string;
type RemoveTokenPayload = void;
export const saveTokenToLocalStorage: AsyncThunk<SaveTokenPayload, string, object> = createAsyncThunk(
  'auth/saveTokenToLocalStorage',
  async (token) => {
    localStorage.setItem('token', token);
    return token;
  }
);
export const removeTokenFromLocalStorage: AsyncThunk<RemoveTokenPayload, void, object> = createAsyncThunk(
  'auth/removeTokenFromLocalStorage',
  async () => {
    localStorage.removeItem('token');
  }
);

export const clearAllRatings = () => {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('rating_')) {
      localStorage.removeItem(key);
    }
  });
};
 

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
      clearAllRatings(); // Очищаем все оценки при logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;