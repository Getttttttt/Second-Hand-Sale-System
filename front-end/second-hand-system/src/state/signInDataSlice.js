import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerID: "", // 确保这里是正确的字段名
  merchantID: ""
};

const signInDataSlice = createSlice({
  name: "signInData",
  initialState,
  reducers: {
    updateSignInData(state, action) {
      // 直接修改 state，Redux Toolkit 内部使用了 Immer
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSignInData } = signInDataSlice.actions;

export default signInDataSlice.reducer;
