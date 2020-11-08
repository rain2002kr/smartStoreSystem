import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store, pageMove } from "../../features/bodySlice.js";
import {
  order_store,
  resetOrderCount,
} from "../../features/Order/orderSlice.js";
import { FoodCard } from "../Template/FoodCard.js";
//import "../../css/Table.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { MenuFilterList } from "../Template/MenuFilterList.js";

export function FoodSelect_Menu(props) {
  const dispatch = useDispatch();
  //Get orderstore
  const orderStore = useSelector(order_store);
  const tableNumber = orderStore.tableNO;
  const foodLists = orderStore.foodList;
  const orderCNT = orderStore.orderCNT;

  const seletedFoodType = orderStore.seletedFoodType.name;
  const filteredList = foodLists.filter((foodlist) => {
    return foodlist.type === seletedFoodType;
  });
  console.log(filteredList);

  const foodType = orderStore.foodType;

  //CSS
  const menuList = { margin: "2px", height: "30px", width: "20%" };
  //유저핸들 및 유저함수
  const handleShoplist = (e) => {
    e.preventDefault();
    dispatch({ type: "ORDER_FOOD" });
    dispatch(pageMove("OrderFood_Menu"));
  };

  const handleRequsetOrderFood = (e) => {
    e.preventDefault();
    dispatch({ type: "ORDER_FOOD" });
    dispatch({ type: "ORDER_FOOD_SERVER" });
  };
  const getSimpleCardList = (simpleCardObj, index) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={2} xl={1}>
        <FoodCard {...simpleCardObj} index={index} />
      </Grid>
    );
  };

  //UI 구성 및 Material UI
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      //color: theme.palette.text.secondary,
      color: "white",
      background: "blue",
      margin: 0,
      padding: 3,
    },
    tableNumber: {
      color: "blue",
    },
    buttonStyle: {
      color: "white",
      background: "blue",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <Typography className={classes.paper}>
            테이블 번호 {tableNumber}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} lg={12}>
          <MenuFilterList />
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handleShoplist}
          >
            전표 {orderCNT}
          </Button>
        </Grid>

        <Grid item xs={6} sm={6} lg={6}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handleRequsetOrderFood}
          >
            음식주문
          </Button>
        </Grid>

        {filteredList.map((Obj, index) => getSimpleCardList(Obj, index))}
      </Grid>
    </div>
  );
}

/* 
<Fragment key="FoodSelect_Menu">
      <div className="main-container">
        <button onClick={handleShoplist}>주문내역화면</button>
        <MenuList styled_input={menuList}></MenuList>
        <header className="main">
          <p>선택된 테이블번호: {tableNumber}</p>
        </header>
        <FoodList></FoodList>
      </div>
    </Fragment> */
