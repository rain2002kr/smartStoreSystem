import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { order_store } from "../../features/Order/orderSlice.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { MenuCard } from "../Template/MenuCard.js";
import "../../css/Table.css";

import { menuListW } from "../../lib/Data.js";
export function FoodSelect_Main() {
  //Get order Store
  const orderStore = useSelector(order_store);
  const tableNumber = orderStore.tableNO;
  const foodType = orderStore.foodType;
  //CSS
  const menuList = { margin: "2px", height: "30px", width: "100%" };

  //UI 구성 및 Material UI
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  //유저핸들 및 유저함수
  const classes = useStyles();
  const menuLists = menuListW; //foodType;
  const getSimpleCardList = (simpleCardObj) => {
    return (
      <Grid item xs={6} sm={4} lg={2}>
        <MenuCard {...simpleCardObj} />
      </Grid>
    );
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <Typography variant="h6" component="h5" color="textSecondary">
            테이블 번호 : {tableNumber}
          </Typography>
        </Grid>
        {menuLists.map((Obj) => getSimpleCardList(Obj))}
      </Grid>
    </div>
  );
}
