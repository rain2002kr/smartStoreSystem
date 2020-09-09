/* all,fork,take,call,select, */
import { takeLatest, put, delay } from "redux-saga/effects";
import { pageMove, setMessage, _mode, _data } from "../features/bodySlice";
import * as api from "../lib/api";
import * as ComFC from "../lib/ComFC.js";

function* foodRegist() {
  try {
    //api call for server
    const food = yield api.foodRegist();
    //Redux Dispatch for data setup
    const message = ComFC.statusCheck(food.data.status);
    yield put(setMessage(message)); //redux 에 data 삽입
    yield delay(1000);
  } catch (e) {
    console.error(e);
  }
}

//사가가 로그인이라는 액션이 들어오는지 기다린다.
export function* watchfoodRegist() {
  var test = yield takeLatest("FOOD_REGIST", foodRegist); //외부에서 값을 준다.
}
