import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { order_store } from "../../features/Order/orderSlice.js";
import { GetSocketIO } from "../../lib/ComFC.js";
import * as COM from "../../lib/ComFC";
import { PaidCard } from "../Template/PaidCard.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper } from "@material-ui/core";

export function PaidList_Main() {
  //import UseForm and dispatch
  const dispatch = useDispatch();
  const socket = GetSocketIO(); //For Socket.IO
  //Get order Store
  const STATUS_PAID = 3;
  const orderStore = useSelector(order_store);
  const paidListfromServer = orderStore.paidListfromServer;
  let orderQuntity = 0;
  let paidList = paidListfromServer.filter((req, index) => {
    if (req.status === STATUS_PAID) {
      orderQuntity++; //음식조리대기 수량 증가
      return req;
    }
  });
  //useEffect 함수
  useEffect(() => {
    console.log("useEffect---PaidList_Main-----");
    dispatch({ type: "GET_PAID_LIST" });
  }, []);

  //메뉴설정
  const title = "계산 완료 현황 화면 : 총 ";
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
        <PaidCard {...simpleCardObj} />
      </Grid>
    );
  };
  return (
    <Fragment key="PaidList_Main">
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
          {paidList.map((Obj) => getSimpleCardList(Obj))}
        </Grid>
      </div>
    </Fragment>
  );
}

/*
<Fragment key="PaidList_Main">
      <div className="main-container">
        <header className="main">
          <p>
            {title}
            {orderQuntity}
          </p>
        </header>
        {paidList}
      </div>
    </Fragment>
 //CSS
 const TitleCSS = { fontSize: "16px" };
 const ListCSS = { fontSize: "12px", margin: "0px" };
 const box = { marginBottom: "10px" };
 const err = { fontSize: "12px", color: "red", margin: "0px" };
 //유저핸들 및 유저함수
 let paidList = paidListfromServer.map((req, index) => {
   let foods = [];
   if (req.status === STATUS_PAID) {
     orderQuntity++; //음식조리대기 수량 증가
     req.orderList.map((list, index) => {
       foods.push(list.name);
       foods.push(`: ${list.price}원 `);
       foods.push(`: ${list.count}개 `);
       foods.push(`: ${list.sumPrice}원 `, <br />);
     });
   }

   //오더리스트의 상태값이 결제완료일때만 보여주기
   if (req.status === STATUS_PAID) {
     return (
       <div key={req._id}>
         <div style={TitleCSS}>테이블 번호 : {req.tableNO}</div>
         <p style={ListCSS}>주문 정보: {req.server}</p>
         <p style={ListCSS}>음식 주문시간: {req.order_InTime}</p>
         <p style={ListCSS}>조리 완료시간: {req.cooked_InTime}</p>
         <p style={ListCSS}>계산 완료시간: {req.paid_InTime}</p>
         <p style={ListCSS}>{foods !== undefined ? foods : "null"}</p>
         <p style={ListCSS}>총 금액: {req.totalPrice}</p>
         <br />
       </div>
     );
   } else {
     return false;
   }
 });
 */
