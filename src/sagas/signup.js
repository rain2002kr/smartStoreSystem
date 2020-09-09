/* all,fork,take,call,select, */
import { takeLatest, put, delay } from "redux-saga/effects";
import { pageMove, setMessage, _mode, _data } from "../features/bodySlice";
import * as api from "../lib/api";
import * as ComFC from "../lib/ComFC.js";

function statusCheck(status) {
  switch (status) {
    case 2:
      return "회원가입 성공";
    case 91:
      return "회원가입 실패,이미 아이디가 존재 합니다.";
    default:
      return "알수없는 오류입니다.";
  }
}
function* signUp() {
  try {
    //api call for server
    const user = yield api.signupUsers();
    //Redux Dispatch for data setup
    const message = statusCheck(user.data.status);
    yield put(setMessage(message)); //redux 에 data 삽입
    yield delay(2000);

    //회원가입에 성공하면 홈으로 이동합니다.
    if (user.data.status === 2) yield put(pageMove("home"));
  } catch (e) {
    console.error(e);
  }
}

//사가가 로그인이라는 액션이 들어오는지 기다린다.
export function* watchSignup() {
  yield takeLatest("SIGN_UP", signUp); //외부에서 값을 준다.
}
