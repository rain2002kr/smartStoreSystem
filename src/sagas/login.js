/* all,fork,take,call,select, */
import { takeLatest, put, delay } from "redux-saga/effects";
import { pageMove, setMessage, _mode, _data } from "../features/bodySlice";
import { loginSuccess } from "../features/Login/loginSlice";
import * as api from "../lib/api"; //api lib에서 가져오기
function statusCheck(status) {
  switch (status) {
    case 2:
      return "로그인 성공";
    case 91:
      return "로그인 실패, 아이디가 존재 하지않습니다.";
    case 92:
      return "로그인 실패, 패스워드가 틀렸습니다.";
    case 99:
      return "로그인 실패, 몽고디비 서버 문제입니다.";
    default:
      return "알수없는 오류입니다.";
  }
}
function* login() {
  try {
    //api call for server
    const user = yield api.loginUsers();

    //Redux Dispatch for data setup
    console.log(user.data);
    const message = statusCheck(user.data.status);
    yield put(setMessage(message)); //redux 에 data 삽입
    yield delay(500);
    //회원가입에 성공하면 홈으로 이동합니다.
    if (user.data.status === 2) {
      yield put(
        loginSuccess({
          id: user.data.id,
          name: user.data.name,
          status: user.data.status,
        })
      );
      yield put(pageMove("tableSelect"));
    }
  } catch (e) {
    console.error(e);
  }
}

//사가가 로그인이라는 액션이 들어오는지 기다린다.
export function* watchLogin() {
  var test = yield takeLatest("LOG_IN", login); //외부에서 값을 준다.
}
