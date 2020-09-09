import {
  combineReducers,
  createStore,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas/index";

//import { watchLogin } from "../sagas/signup";
//import counterReducer from "../features/counter/counterSlice";
import bodyReducer from "../features/bodySlice";
import loginReducer from "../features/Login/loginSlice";
import orderReducer from "../features/Order/orderSlice";

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  //counter: counterReducer,
  body: bodyReducer,
  login: loginReducer,
  order: orderReducer,

});
const logger = createLogger();

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [logger, sagaMiddleware], //미들웨어 사용등록
});
//반드시 store 밑에서 실행 해줘야 함.
//sagaMiddleware.run(watchLogin);
sagaMiddleware.run(rootSaga);

export default store ;
