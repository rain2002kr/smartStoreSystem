import { createSlice } from "@reduxjs/toolkit";

export const bodySlice = createSlice({
  name: "body",
  initialState: {
    mode: "home",
    user: "",
    viewMenu: "",
  },
  reducers: {
    pageMove: (state, action) => {
      state.mode = action.payload;
    },
    setMessage: (state, action) => {
      state.user = action.payload;
    },
    setViewMenu: (state, action) => {
      state.viewMenu = action.payload;
    },
  },
});

//리듀서 타입은 하나씩 내보낼수밖에 없다.
export const { pageMove, setMessage, setViewMenu } = bodySlice.actions;

//액션 타입 내보내기 이부분을 가져가는 부분에 셀렉트로 가져갑니다.
//state. 뒤에 붙는 변수는 store 에 저장되어있는 이름입니다.
export const _data = (state) => state.body;
export const _mode = (state) => state.body.mode;
export const body_store = (state) => state.body;

export default bodySlice.reducer;
