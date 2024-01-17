import { configureStore } from '@reduxjs/toolkit';
import signInDataReducer from './signInDataSlice'; // 修改此处

export const store = configureStore({
  reducer: {
    signInData: signInDataReducer, // 使用 reducer，而不是 action
  },
});
