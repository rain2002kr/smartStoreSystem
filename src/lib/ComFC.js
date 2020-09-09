import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Store from "../app/store";
import socketIO from "socket.io-client";

//socket IO 통신 현재 IP 어드레스를 넣어줘야함.
export function GetSocketIO() {
  return socketIO.connect("http://192.168.0.204:5000");
}

//statusCheck() 함수
export function statusCheck(status) {
  switch (status) {
    case 2:
      return "메뉴등록 성공";
    case 91:
      return "메뉴등록 실패, 메뉴가 존재 하고있습니다.";
    case 92:
      return "로그인 실패, 패스워드가 틀렸습니다.";
    case 99:
      return "메뉴등록 실패, 몽고디비 서버 문제입니다.";
    default:
      return "알수없는 오류입니다.";
  }
}
//timeStamp() 함수
export function getTimeStamp() {
  let today = new Date();
  let date = today.toLocaleDateString("en-KR");
  let time = today.toLocaleTimeString("en-KR");
  return { date: date, time: time };
}

//divideFoodType() 함수
export function divideFoodType(food) {
  //food Type 분리하기
  let foodType = [];
  food.map((res) => {
    foodType.push(res.type);
  });
  foodType = Array.from(new Set(foodType));
  //카운터값 보여주기위해 저장
  let buf = [];

  //인덱스 카운트 얻기
  let cnt = new Array(foodType.length).fill(0);
  for (let i in food) {
    for (let j in foodType) {
      if (food[i].type === foodType[j]) {
        cnt[j] = cnt[j] + 1;
      }
    }
  }
  //카운터값 배열로 보여주기위해 저장
  let matrix = [];

  for (let j in foodType) {
    buf.push(cnt[j]);
    //메뉴 카운트 추가하기
    matrix.push({ index: cnt[j] });
  }
  return { foodType: foodType, cnt: cnt };
}
//divideFoodList() 함수
export function divideFoodList(food, cnt) {
  let matrix0 = [];
  let matrix1 = [];
  let matrix2 = [];
  let matrix3 = [];
  let matrix4 = [];
  let matrix5 = [];
  let matrix6 = [];
  let matrix7 = [];
  let matrixes = [];

  let mat0 = [];
  let mat1 = [];
  let mat2 = [];
  let mat3 = [];
  let mat4 = [];
  let mat5 = [];
  let mat6 = [];
  let mat7 = [];
  let mates = [];

  function foodlistMatrix(loop, cnt) {
    for (let j = 0; j < loop; j++) {
      for (let k = 0; k < cnt[j]; k++) {
        let num = 0;
        if (j === 0) {
          matrix0.push(food[k]); // { name : "이런식도 가능"}
          mat0.push({});
        }
        if (j === 1) {
          num = cnt[0];
          matrix1.push(food[k + num]);
          mat1.push({});
        }
        if (j === 2) {
          num = cnt[0] + cnt[1];
          matrix2.push(food[k + num]);
          mat2.push({});
        }
        if (j === 3) {
          num = cnt[0] + cnt[1] + cnt[2];
          matrix3.push(food[k + num]);
          mat3.push({});
        }
        if (j === 4) {
          num = cnt[0] + cnt[1] + cnt[2] + cnt[3];
          matrix4.push(food[k + num]);
          mat4.push({});
        }
        if (j === 5) {
          num = cnt[0] + cnt[1] + cnt[2] + cnt[3] + cnt[4];
          matrix5.push(food[k + num]);
          mat5.push({});
        }
        if (j === 6) {
          num = cnt[0] + cnt[1] + cnt[2] + cnt[3] + cnt[4] + cnt[5];
          matrix6.push(food[k + num]);
          mat6.push({});
        }
        if (j === 7) {
          num = cnt[0] + cnt[1] + cnt[2] + cnt[3] + cnt[4] + cnt[5] + cnt[6];
          matrix7.push(food[k + num]);
          mat7.push({});
        }
      }
    }
  }
  foodlistMatrix(food.length, cnt);
  /* console.log(matrix0);*/

  matrixes.push(matrix0);
  matrixes.push(matrix1);
  matrixes.push(matrix2);
  matrixes.push(matrix3);
  matrixes.push(matrix4);
  matrixes.push(matrix5);
  matrixes.push(matrix6);
  matrixes.push(matrix7);

  mates.push(mat0);
  mates.push(mat1);
  mates.push(mat2);
  mates.push(mat3);
  mates.push(mat4);
  mates.push(mat5);
  mates.push(mat6);
  mates.push(mat7);

  /* console.log(matrixes); */
  return { foodlist: matrixes, emptylist: mates };
}

//getLoginUserinfoFromServer() 함수
export function getLoginUserinfoFromServer(store) {
  const loginStore = store.login;
  const userInfo = loginStore.currentUser;
  return userInfo;
}
//getFoodPerPriceFromTempOrderList() 함수
export function getFoodPerPriceFromTempOrderList(store, userInfo) {
  const orderStore = store.order;
  const tableNO = orderStore.tableNO;
  const tempOrders = orderStore.temp_orders;
  const foodCnt = orderStore.filteredFoodType.cnt;

  let orderLists = []; //합쳐서 저장
  let prices = []; //단품음식가격 * 수량
  let orderList = []; //선택 음식 정보

  //로그인 정보 불러오기
  if (userInfo.status === 2) {
    orderLists.push({ server: userInfo.name, id: userInfo.id });
  } else {
    orderLists.push({ server: "비회원" });
  }
  orderLists.push({ tableNO: tableNO });

  //임시 메뉴 선택 리스트로부터 리스트 생성
  //makeFoodList() -> orderList[] , sum = cnt * price
  for (let i = 0; i < foodCnt.length; i++) {
    for (let j = 0; j < foodCnt[i]; j++) {
      if (tempOrders[i][j] !== {} && tempOrders[i][j].count > 0) {
        prices.push(tempOrders[i][j].count * tempOrders[i][j].price);
        orderList.push({
          index1: i,
          index2: j,
          type: tempOrders[i][j].type,
          name: tempOrders[i][j].name,
          price: tempOrders[i][j].price,
          count: tempOrders[i][j].count,
          sumPrice: tempOrders[i][j].count * tempOrders[i][j].price,
        });
      }
    }
  }

  //price 총합 구하기
  let totalPrice = 0; //합쳐서 저장
  //price 총합 구하기
  for (let i in prices) {
    totalPrice = totalPrice + prices[i];
  }
  orderLists.push({ totalPrice: totalPrice });

  //orderMap[4]
  orderLists.push(orderList);

  //console.log(orderList);
  //console.log(prices);
  return orderLists;
}

//updateOrderinTimeStamp() 함수
export function updateOrderinTimeStamp() {
  const store = Store.getState();
  const orderStore = store.order;
  const order_food = orderStore.order_food;
  //반드시 값을 가져와서 concat()으로 복사
  const copy = order_food.concat();
  const order_InTime = getTimeStamp();
  copy.push({ status: 1 });
  copy.push({ order_InTime: order_InTime });

  return copy;
}

//숫자에 콤마 찍는 함수  numberWithCommas
export function numWithDot(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
