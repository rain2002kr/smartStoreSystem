import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store } from "../../features/bodySlice.js";
import {
  order_store,
  setMessage,
  resetOrderCount,
} from "../../features/Order/orderSlice.js";
import { TempOrderList } from "../Template/TempOrderList.js";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Typography, Grid } from "@material-ui/core";
import "../../css/Table.css";

export function OrderFood_Menu(props) {
  //import props
  const { msg } = props;
  //import UseForm and dispatch
  const dispatch = useDispatch();
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
    item: {
      alignSelf: "center",
      justifyContent: "center",
      maxWidth: "80ch",
    },
  }));
  const classes = useStyles();
  //유저핸들 및 유저함수
  const handleFoodListClear = () => {
    dispatch({ type: "FOOD_GET" });
    dispatch(resetOrderCount());
  };
  return (
    <Fragment key="OrderFood_Menu">
      <div className={classes.root}>
        {msg !== undefined ? msg : ""}
        <TempOrderList></TempOrderList>
      </div>
    </Fragment>
  );
}
/* 
<div className="main-container">
        <header className="main"></header>
        <button onClick={handleFoodListClear}>주문리스트초기화</button>
        {msg !== undefined ? msg : ""}
        <TempOrderList></TempOrderList>
      </div> */
