/* all,fork,take,call,select, */
import { takeLatest, takeEvery, put, delay } from "redux-saga/effects";
import Store from "../app/store";
import { getCookedListfromServer } from "../features/Order/orderSlice";

import * as api from "../lib/api";
import { GetSocketIO } from "../lib/ComFC.js";
function cookedfinish(e) {
  const socket = GetSocketIO(); //For Socket.IO
  socket.emit("cooked", { name: "cooked finish at sendCookedFinish" });
}

function* CookedFinish() {
  try {
    const socket = GetSocketIO(); //For Socket.IO
    //Get bodyStore
    console.log("orderFood~~~~~");
    const store = Store.getState();
    //음식 주문 완료
    const cookedFinish = store.order.cookedFinish;
    yield api.sendCookedFinish(cookedFinish);
    const cookedlist = yield api.getCookedList();
    if (cookedlist.statusText === "OK") {
      yield put(getCookedListfromServer(cookedlist.data));
    } else {
    }
    yield socket.emit("cooked", { name: "cooked finish at sendCookedFinish" });
    //yield cookedfinish();
  } catch (e) {
    console.error(e);
  }
}

//사가가  액션이 들어오는지 기다린다.
export function* watchCookedFinish() {
  yield takeLatest("COOKED_FINISH", CookedFinish); //음식을 주문합니다.
}
