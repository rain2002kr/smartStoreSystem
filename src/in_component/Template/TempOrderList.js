import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store, pageMove } from "../../features/bodySlice.js";
import {
  order_store,
  setMessage,
  resetOrderCount,
  saveUpdateOrderItem,
} from "../../features/Order/orderSlice.js";
import * as COM from "../../lib/ComFC";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Typography, Grid } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export function TempOrderList() {
  //import UseForm and dispatch
  const dispatch = useDispatch();
  //Get orderstore
  const orderStore = useSelector(order_store);
  const tableNumber = orderStore.tableNO;
  let orderFood = orderStore.order_food;
  const server = orderFood[0];
  const tableNO = orderFood[1];
  let totalPrice = orderFood[2].totalPrice;
  const orderList = [];
  //order 리스트 뽑기
  for (let i in orderFood[3]) {
    orderList.push(orderFood[3][i]);
  }
  const rows = orderList;

  //UI 구성 및 Material UI
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 20,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    textTitle: {
      align: "right",
      color: theme.palette.primary.main,
      fontSize: theme.typography.subtitle2.fontSize,
    },
  }));

  //유저핸들 및 유저함수
  const classes = useStyles();
  const handleRequsetOrderFood = (e) => {
    e.preventDefault()
    dispatch({ type: "ORDER_FOOD_SERVER" });
  };
  const handleFoodListClear = () => {
    dispatch({ type: "FOOD_GET" });
    dispatch(resetOrderCount());
  };
  const handlePageMove = () => {
    dispatch(pageMove("FoodSelect_Menu"));
  };
  const handleMenuPopup = (e, target, index) => {
    e.preventDefault()
    console.log("handleMenuPopup");
    console.log(target);
    console.log(index);
    dispatch(saveUpdateOrderItem(target)); //수정할 주문 아이템 리덕스로 전송
    dispatch(pageMove("TempCard"));
  };

  return (
    <div className={classes.root}>
      <Paper
        elevation={0}
        variant="elevation" //can be selted outlined, elevation
        textAlign="left"
      >
        <Button fullWidth color="primary" onClick={handlePageMove}>
          <ArrowBackIcon />
        </Button>
      </Paper>
      <Typography variant="subtitle1" component="h2" gutterBottom align="left">
        테이블 번호 : {tableNumber}
      </Typography>
      <TableContainer component={Paper} size="small">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.textTitle}>
                  <b>품목</b>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={classes.textTitle}>
                  <b>수량</b>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={classes.textTitle}>
                  <b>가격</b>
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={classes.textTitle}>
                  <b>합계</b>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name}
                onClick={(e) => {
                  handleMenuPopup(e, row, index);
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.count}</TableCell>
                <TableCell align="center">
                  {COM.numWithDot(row.price)}
                </TableCell>
                <TableCell align="center">
                  {COM.numWithDot(row.sumPrice)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell scope="row">
                <Typography>
                  <b>총 금액</b>
                </Typography>
              </TableCell>
              <TableCell colSpan={3} component="th" scope="row" align="right">
                <Typography>
                  <b>{COM.numWithDot(totalPrice)}</b>
                </Typography>
                {/* {totalPrice !== undefined ? totalPrice : 0} */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <hr></hr>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-start" //가로축
        alignItems="center" //새로축
      >
        <Grid item xs={12}>
          <Paper
            elevation={6}
            variant="outlined" //can be selted outlined, elevation
            squareclassName={classes.paper}
          >
            <Button fullWidth color="primary" onClick={handleRequsetOrderFood}>
              음식주문
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
