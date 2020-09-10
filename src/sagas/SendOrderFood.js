/* all,fork,take,call,select, */
import { takeLatest, takeEvery, put, delay } from "redux-saga/effects";
import { pageMove, setMessage, _mode, _data } from "../features/bodySlice";
import {
  SendOrder_food,
  getOrderListfromServer,
  prevOrderCheck,
} from "../features/Order/orderSlice";
import soundfile from "../Audio/ring.mp3";
import Store from "../app/store";
import * as api from "../lib/api";
import * as ComFC from "../lib/ComFC.js";
import { GetSocketIO } from "../lib/ComFC.js";

function* requsetOrderFoodToServer() {
  try {
    const socket = GetSocketIO(); //For Socket.IO
    //전송타임 및 상태저장
    const copy = ComFC.updateOrderinTimeStamp();
    yield put(SendOrder_food(copy));
    yield delay(500);

    //api call for server 오더 보내기
    const store = Store.getState();
    const orderList = store.order.order_food[3].map((orderList) => orderList);
    const orderInTime = store.order.order_food[5]; //orderInTime
    const audio = new Audio(soundfile);

    if (orderInTime !== store.order.prevOrder)
      if (orderList.join() !== "") {
        //오더시간이 동일하면 전송하지 않습니다.
        yield socket.emit("order", { name: "order finish at SendOrderFood" });
        console.log("주문성공");
        audio.play();
        yield put(prevOrderCheck(orderInTime));
        yield api.sendOrderFood(); //const resFromServer
        const getOrderFoodListFromServer = yield api.getOrderFoodList();
        //요청이 정상 처리 되었을때, 메시지와 화면 이동합니다.
        //메뉴 요청 리스트도 저장합니다.
        if (getOrderFoodListFromServer.statusText === "OK") {
          yield put(setMessage("주문 완료되었습니다."));
          yield put(getOrderListfromServer(getOrderFoodListFromServer.data));
          yield delay(500);
          yield put(setMessage(""));
          yield put(pageMove("tableSelect"));
        } else {
          yield put(setMessage("서버에 주문을 실패하였습니다."));
          yield delay(2000);
          yield put(setMessage(""));
        }
      } else {
        console.log("requsetOrderFoodToServer");
        console.log("주문실패, 메뉴를 담으세요.");
        yield put(setMessage("주문실패, 메뉴를 담으세요."));
        yield delay(2000);
        yield put(setMessage(""));
      }
  } catch (e) {
    console.error(e);
  }
}

function* orderFood() {
  try {
    //Get bodyStore
    console.log("orderFood~~~~~");
    const store = Store.getState();
    //주문자 정보 가져오기
    const userInfo = ComFC.getLoginUserinfoFromServer(store);
    let tempOrderList = ComFC.getFoodPerPriceFromTempOrderList(store, userInfo);

    yield put(SendOrder_food(tempOrderList));

    //api call for server from orderFood
    yield takeLatest("ORDER_FOOD_SERVER", requsetOrderFoodToServer);
  } catch (e) {
    console.error(e);
  }
}

//사가가  액션이 들어오는지 기다린다.
export function* watchOrderFood() {
  yield takeLatest("ORDER_FOOD", orderFood); //음식을 주문합니다.
}
