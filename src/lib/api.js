import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMove, signup, _mode } from "../features/Login/loginSlice";
import axios from "axios";
import store from "../app/store";

function Api() {
  var user = store.getState();
  return user.login.singup;
}
//test functon
/* export function* test(id) {
  var user = store.getState();
  //Redux store value check
  console.log("api check");
  console.log(user.login.singup);
  var target = user.login.singup;

  console.log(JSON.stringify(target));

  //yield axios.post('/api/user/ssss',[{ "id" : "rain" },{ "pwd" : "123" }])
  yield axios
    .post("/api/user/ssss", [JSON.stringify(target)])
    .then(function (response) {
      // handle success
      console.log(response.data[0]);
      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      user = error;
    })
    .then(function () {
      // always executed
      console.log("axios exe");
    });
  return user;
} */
//로그인 함수
export function* loginUsers() {
  var user = store.getState();
  //Redux store value check
  /* console.log("api check");
  console.log(user.login.login); */
  var target = user.login.login;

  /*  console.log(JSON.stringify(target)); */

  var user = "";
  yield axios
    .post("/api/user/login", [JSON.stringify(target)])
    .then(function (response) {
      // handle success
      //console.log(response.data[0]);
      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      //console.log(error);
      user = error;
    })
    .then(function () {
      // always executed
      //console.log("axios exe");
    });
  return user;
}
//회원가입 함수
export function* signupUsers() {
  var target = Api();
  var user = "";
  yield axios
    .post("/api/user/signup", [JSON.stringify(target)])
    .then(function (response) {
      // handle success
      console.log(response.data[0]);
      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      user = error;
    })
    .then(function () {
      // always executed
      console.log("axios exe");
    });
  return user;
}
//음식등록 함수
export function* foodRegist() {
  const slice = store.getState();
  const target = slice.order.regist_food; //Api();
  let user = "";
  yield axios
    .post("/api/food/regist", [JSON.stringify(target)])
    .then(function (response) {
      // handle success
      console.log(response.data[0]);
      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      user = error;
    })
    .then(function () {
      // always executed
      console.log("axios exe");
    });
  return user;
}
//등록된 음식을 가져오는 함수
export function* foodList() {
  //const slice = store.getState();
  //const target = slice.order.regist_food; //Api();
  //console.log("axios api foodList");
  let user = "";
  yield axios
    .get("/api/food/list")
    .then(function (response) {
      // handle success
      /* console.log("response.data[i] start: ");
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
      } */

      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      user = error;
    })
    .then(function () {
      // always executed
      //console.log("axios exe");
    });
  return user;
}
//음식을 주문하는 함수
export function* sendOrderFood() {
  const slice = store.getState();
  const target = slice.order.order_food; //Api();
  let user = "";
  yield axios
    .post("/api/order/food", [JSON.stringify(target)])
    .then(function (response) {
      // handle success
      //console.log(response.data[0]);
      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      user = error;
    })
    .then(function () {
      // always executed
      //console.log("axios exe : sendOrderFood");
    });
  return user;
}
//음식주문한 내역을 가져오는 함수
export function* getOrderFoodList() {
  //console.log("axios api getOrderFoodList");
  let user = "";
  yield axios
    .get("/api/order/list")
    .then(function (response) {
      // handle success
      /* console.log("response.data[i] start: ");
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
      } */
      //console.log(response.data.length);

      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      user = error;
    })
    .then(function () {
      // always executed
      //console.log("axios exe");
    });
  return user;
}
//음식을 조리를 완료하는 함수 sendCookedFinish
export function* sendCookedFinish(target) {
  /* const slice = store.getState();
  const target = slice.order.cookedFinish;  */
  //console.log(target);
  let user = "";
  yield axios
    .post("/api/cooked/finish", [JSON.stringify(target)])
    .then(function (response) {
      // handle success
      console.log(response.data[0]);
      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      user = error;
    })
    .then(function () {
      // always executed
      //console.log("axios exe : sendOrderFood");
    });
  return user;
}

//계산 완료하는 함수 sendPaidFinish
export function* sendPaidFinish(target) {
  /* const slice = store.getState();
  const target = slice.order.paidFinish; */
  let user = "";
  yield axios
    .post("/api/paid/finish", [JSON.stringify(target)])
    .then(function (response) {
      // handle success
      //console.log(response.data[0]);
      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      user = error;
    })
    .then(function () {
      // always executed
      //console.log("axios exe : sendOrderFood");
    });
  return user;
}

//계산 완료된 내역 가져오는 함수 getPaidList
export function* getPaidList() {
  //console.log("axios api getOrderFoodList");
  let user = "";
  yield axios
    .get("/api/paid/list")
    .then(function (response) {
      // handle success
      /* console.log("response.data[i] start: ");
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
      } */
      //console.log(response.data.length);

      user = response;
      //console.log(response.data[0]);
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      user = error;
    })
    .then(function () {
      // always executed
      //console.log("axios exe");
    });
  return user;
}
