/* all,fork,take,call,select, */
import { takeLatest, takeEvery, put, delay } from "redux-saga/effects";
import {
  setFoodList,
  setFilteredFoodType,
  setFliteredFoodlist,
} from "../features/Order/orderSlice";
import * as api from "../lib/api.js";
import * as ComFC from "../lib/ComFC.js";

function* foodList() {
  try {
    //api call for server
    const food = yield api.foodList();
    yield put(setFoodList(food.data));

    //foodList 분리 하기 !! 좀더 세분화 및 펑션화 하기 리덕스사가에 쓰기
    const filteredfoodType = yield ComFC.divideFoodType(food.data); //foodType and index value
    const filteredFoodlist = yield ComFC.divideFoodList(
      food.data,
      filteredfoodType.cnt
    );

    yield put(setFilteredFoodType(filteredfoodType));
    yield put(setFliteredFoodlist(filteredFoodlist));
  } catch (e) {
    console.error(e);
  }
}

//사가가 로그인이라는 액션이 들어오는지 기다린다.
export function* watchfoodList() {
  yield takeLatest("FOOD_GET", foodList); //외부에서 값을 준다.
}
