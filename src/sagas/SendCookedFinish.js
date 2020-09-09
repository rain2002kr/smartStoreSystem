/* all,fork,take,call,select, */
import { takeLatest, takeEvery, put, delay } from "redux-saga/effects";
import Store from "../app/store";
import * as api from "../lib/api";
import { GetSocketIO } from "../lib/ComFC.js";

function* CookedFinish() {
  try {
    const socket = GetSocketIO(); //For Socket.IO
    //Get bodyStore
    console.log("orderFood~~~~~");
    const store = Store.getState();
    //음식 주문 완료
    const cookedFinish = store.order.cookedFinish;
    yield api.sendCookedFinish(cookedFinish);
    yield socket.emit("init", { name: "on" });
  } catch (e) {
    console.error(e);
  }
}

//사가가  액션이 들어오는지 기다린다.
export function* watchCookedFinish() {
  yield takeLatest("COOKED_FINISH", CookedFinish); //음식을 주문합니다.
}
