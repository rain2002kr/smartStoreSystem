import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login_signup',
    initialState: {
      mode:'login',
      singup:{id:'',name:'', pwd:''}

    },
    reducers: 
    {
      pageMove : (state,action) => {
        state.mode = action.payload;
      },
      signup : (state,action) => {
        const id = action.payload.id;
        const _name = action.payload.name;
        const password = action.payload.password;
        const password2 = action.payload.password2;
        if(password === password2){
          state.singup={
            id:id,
            name:_name,
            pwd:password
          }
        }
      },
    }
  });
  
  export const { pageMove, signup } = loginSlice.actions;
  

  //액션 타입 내보내기 이부분을 가져가는 부분에 셀렉트로 가져갑니다. 
  //state. 뒤에 붙는 변수는 store 에 저장되어있는 이름입니다. 
  export const _mode = state => state.login.mode;
  export const data = state => state.login;
  
  //시간을 전송할때 사용 
  /* export const setPageMove = page => dispatch => {
    dispatch(pageMove(page));}
   */  
  
  export default loginSlice.reducer;