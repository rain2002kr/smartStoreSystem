import { all, call } from "redux-saga/effects";
import { watchSignup } from "./signup";
import { watchLogin } from "./login";
import { watchfoodRegist } from "./foodRegist";
import { watchfoodList } from "./foodList";
import { watchOrderFood } from "./SendOrderFood";
import { watchCookedFinish } from "./SendCookedFinish";
import { watchPaidFinish } from "./SendPaidFinish";

import { watchOrderListFromServer } from "./OrderListFromServer";
import { watchPaidListFromServer } from "./PaidListFromServer";

export function* rootSaga() {
  yield all([
    call(watchLogin),
    call(watchSignup),
    call(watchfoodRegist),
    call(watchfoodList),
    call(watchOrderFood),
    call(watchCookedFinish),
    call(watchPaidFinish),
    call(watchOrderListFromServer),
    call(watchPaidListFromServer),
  ]);
}
