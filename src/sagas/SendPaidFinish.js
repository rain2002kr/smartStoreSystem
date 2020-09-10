/* all,fork,take,call,select, */
import { takeLatest, takeEvery, put, delay } from "redux-saga/effects";
import { user } from "../features/Order/orderSlice";
import Store from "../app/store";
import * as api from "../lib/api"; //api lib에서 가져오기
import * as ComFC from "../lib/ComFC.js";
import { GetSocketIO } from "../lib/ComFC.js";

function* PaidFinish() {
  try {
    const socket = GetSocketIO(); //For Socket.IO
    //Get bodyStore
    console.log("orderFood~~~~~");
    const store = Store.getState();
    //계산 완료
    const paidFinish = store.order.paidFinish;
    yield api.sendPaidFinish(paidFinish);
    yield socket.emit("paid", { name: "paid finish at sendPaidFinish" });
  } catch (e) {
    console.error(e);
  }
}

//사가가  액션이 들어오는지 기다린다.
export function* watchPaidFinish() {
  yield takeLatest("PAID_FINISH", PaidFinish); //계산 완료를 요청합니다.
}
