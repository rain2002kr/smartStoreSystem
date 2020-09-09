import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login_signup",
  initialState: {
    singup: { id: "", name: "", pwd: "", status: 0 },
    login: { id: "", pwd: "", status: 0 },
    currentUser: [],
    user: "",
  },
  reducers: {
    signup: (state, action) => {
      if (action.payload.password === action.payload.password2) {
        state.singup = {
          id: action.payload.id,
          name: action.payload.name,
          pwd: action.payload.password,
          status: 1,
        };
      }
    },
    login: (state, action) => {
      state.login = {
        id: action.payload.id,
        pwd: action.payload.password,
        status: 1,
      };
    },
    setMessage: (state, action) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
//리듀서 타입은 하나씩 내보낼수밖에 없다.
export const {
  signup,
  login,
  setMessage,
  user,
  loginSuccess,
} = loginSlice.actions;

//액션 타입 내보내기 이부분을 가져가는 부분에 셀렉트로 가져갑니다.
//state. 뒤에 붙는 변수는 store 에 저장되어있는 이름입니다.
export const data = (state) => state.login;

export default loginSlice.reducer;

//시간을 전송할때 사용
/* export const setPageMove = page => dispatch => {
    dispatch(pageMove(page));}
*/
