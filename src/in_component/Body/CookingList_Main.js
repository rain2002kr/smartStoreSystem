import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  order_store,
  setCookingCount,
} from "../../features/Order/orderSlice.js";
import { GetSocketIO } from "../../lib/ComFC.js";
import { CookingCard } from "../Template/CookingCard.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper } from "@material-ui/core";
import "../../css/Table.css";

export function CookingList_Main(props) {
  //import UseForm and dispatch
  const dispatch = useDispatch();
  const socket = GetSocketIO(); //For Socket.IO

  //Get order Store
  const STATUS_COOKING = 1;
  const orderStore = useSelector(order_store);
  const orderListfromServer = orderStore.orderListfromServer;
  let orderQuntity = 0;

  let cookingList = orderListfromServer.filter((req, index) => {
    if (req.status === STATUS_COOKING) {
      orderQuntity++; //음식조리대기 수량 증가
      return req;
    }
  });
  //useEffect 함수
  useEffect(() => {
    console.log("useEffect--CookingList_Main------");
    socket.emit("init", { name: "on" });
  }, []);

  //메뉴설정
  const title = "조리 대기 현황 화면 : 총 ";
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
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <CookingCard {...simpleCardObj} />
      </Grid>
    );
  };
  return (
    <Fragment key="CookingList_Main">
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
          {cookingList.map((Obj) => getSimpleCardList(Obj))}
        </Grid>
      </div>
    </Fragment>
  );
}
