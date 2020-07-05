import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/Login/loginSlice';
/* import loginReducer from '../in_component/Login/loginSlice';
import loginReducer2 from '../features/Login/loginSlice2';
 */
export default configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,

  },
});
