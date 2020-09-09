/* all,fork,take,call,select, */
import { takeLatest, takeEvery, put, delay } from "redux-saga/effects";
import {
  getOrderListfromServer,
  setCookingCount,
  setPaiyingCount,
} from "../features/Order/orderSlice";
import Store from "../app/store";
import * as api from "../lib/api"; //api lib에서 가져오기

function* getOrderFoodList() {
  try {
    //Get bodyStore
    //console.log("getOrderFoodList~~~~~");
    const store = Store.getState();
    yield delay(100); //클라이언트들이 음식주문후,다른 클라이언트들의 값을 업데이트하기 위해 필요함.
    const getOrderFoodListFromServer = yield api.getOrderFoodList();

    if (getOrderFoodListFromServer.statusText === "OK") {
      yield put(getOrderListfromServer(getOrderFoodListFromServer.data));
    } else {
    }
  } catch (e) {
    console.error(e);
  }
}

//사가가  액션이 들어오는지 기다린다.
export function* watchOrderListFromServer() {
  yield takeLatest("GET_ORDER_LIST", getOrderFoodList); //음식을 주문합니다.
}
