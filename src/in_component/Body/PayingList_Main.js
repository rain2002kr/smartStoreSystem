import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  order_store,
  SendPaidFinish,
} from "../../features/Order/orderSlice.js";
import { GetSocketIO } from "../../lib/ComFC.js";
import * as COM from "../../lib/ComFC";
import { PayingCard } from "../Template/PayingCard.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper } from "@material-ui/core";

import "../../css/Table.css";

export function PayingList_Main() {
  //import UseForm and dispatch
  const dispatch = useDispatch();
  const socket = GetSocketIO(); //For Socket.IO
  //Get order Store
  const STATUS_PAYING = 2;
  const orderStore = useSelector(order_store);
  const orderListfromServer = orderStore.orderListfromServer;
  const cookedListfromServer = orderStore.cookedListfromServer;
  let orderQuntity = 0;

  /* let payingList = orderListfromServer.filter((req, index) => {
    if (req.status === STATUS_PAYING) {
      orderQuntity++; 
      return req;
    }
  }); */

  let payingList = cookedListfromServer.map((req) => {
    orderQuntity++; //음식조리대기 수량 증가
    return req;
  });

  //useEffect 함수
  useEffect(() => {
    console.log("useEffect---PayingList_Main-----");
    socket.emit("init", { name: "on" });
    //dispatch({ type: "GET_ORDER_LIST" });
  }, []);

  //메뉴설정
  const title = "계산 대기 현황 화면 : 총 ";
  //UI 구성 및 Material UI
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: "left",
      margin: 0,
      padding: 3,
    },
  }));
  const classes = useStyles();
  //유저핸들 및 유저함수
  const getSimpleCardList = (simpleCardObj) => {
    return (
      <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
        <PayingCard {...simpleCardObj} />
      </Grid>
    );
  };
  return (
    <Fragment key="PayingList_Main">
      <div className={classes.root}>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start" //가로축
          alignItems="flex-star" //새로축
        >
          <Grid item xs={12}>
            <Typography variant="h6" component="h5" color="textSecondary">
              {title} {orderQuntity}
            </Typography>
          </Grid>
          {payingList.map((Obj) => getSimpleCardList(Obj))}
        </Grid>
      </div>
    </Fragment>
  );
}
/* 
<div className="main-container">
        <header className="main">
          <p>
            {title}
            {orderQuntity}
          </p>
        </header>
        {payingList}
      </div> 
      
      
  //유저핸들 및 유저함수
  let payingList = orderListfromServer.map((req, index) => {
    let foods = [];
    if (req.status === STATUS_PAYING) {
      orderQuntity++; //음식조리대기 수량 증가
      req.orderList.map((list, index) => {
        foods.push(list.name);
        foods.push(`: ${list.price}원 `);
        foods.push(`: ${list.count}개 `);
        foods.push(`: ${list.sumPrice}원 `, <br />);
      });
    }
    //결제완료 핸들
    const handlePaidFinish = (e) => {
      dispatch(
        SendPaidFinish({
          index: e.target.value,
          id: e.target.id,
          date: COM.getTimeStamp(),
        })
      );
      dispatch({ type: "PAID_FINISH" });
      socket.emit("init", { name: "on" });
      //dispatch({ type: "GET_ORDER_LIST" });
    };
    //오더리스트의 상태값이 결제완료 전일때만 보여주기
    if (req.status === STATUS_PAYING) {
      return (
        <div key={req._id}>
          <div style={TitleCSS}>테이블 번호 : {req.tableNO}</div>
          <p style={ListCSS}>주문 정보: {req.server}</p>
          <p style={ListCSS}>음식 주문시간: {req.order_InTime}</p>
          <p style={ListCSS}>조리 완료시간: {req.cooked_InTime}</p>
          <p style={ListCSS}>{foods !== undefined ? foods : "null"}</p>
          <p style={ListCSS}>총 금액: {req.totalPrice}</p>
          <button
            style={box}
            onClick={handlePaidFinish}
            id={req._id}
            value={index}
          >
            계산완료
          </button>
        </div>
      );
    } else {
      return false;
    }
  });
      
      
      */
