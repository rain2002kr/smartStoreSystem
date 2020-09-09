import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  order_store,
  SendPaidFinish,
  setMessage,
} from "../../features/Order/orderSlice.js";
import * as COM from "../../lib/ComFC";
import soundfile from "../../Audio/ring.mp3";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { Card, CardActions, CardContent } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Avatar, Tooltip } from "@material-ui/core";

export function PaidCard(props) {
  //import UseForm and dispatch
  const dispatch = useDispatch();
  const audio = new Audio(soundfile);
  const {
    _id,
    tableNO,
    server,
    order_InTime,
    cooked_InTime,
    paid_InTime,
    orderList,
    totalPrice,
  } = props;
  const orderLists = orderList;

  const handlepaidFinish = (e) => {
    console.log(orderLists);
    console.log(props);
    console.log(e.currentTarget.id);
    //리덕스에 조리완료 등록
    //audio.play();
    /* dispatch(
      SendPaidFinish({
        id: e.currentTarget.id,
        date: COM.getTimeStamp(),
      })
    ); */
    //리덕스 사가에 내용 전달
    /* dispatch({ type: "PAID_FINISH" });
    dispatch(setMessage("")); */
  };

  const lists = orderLists.map((list) => {
    return (
      <TableRow>
        <TableCell scope="row">{list.name}</TableCell>
        <TableCell align="center">{list.count}</TableCell>
        <TableCell align="center">{COM.numWithDot(list.price)}</TableCell>
        <TableCell align="center">{COM.numWithDot(list.sumPrice)}</TableCell>
      </TableRow>
    );
  });

  //UI 구성 및 Material UI
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    textTitle: {
      align: "right",
      color: theme.palette.primary.main,
      fontSize: theme.typography.subtitle2.fontSize,
    },
  }));
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Button className={classes.title} id={_id} onClick={handlepaidFinish}>
        <CardContent>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start" //가로축
            alignItems="center" //새로축
          >
            <Grid item xs={6}>
              <Typography variant="subtitle1" align="left">
                테이블번호: {tableNO}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" align="right">
                주문자: {server}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="right">
                주문시간 : {order_InTime}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="right">
                조리완료 : {cooked_InTime}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="right">
                계산완료 : {paid_InTime}
              </Typography>
            </Grid>

            <Grid item xs={12}>
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
                  <TableBody>{lists}</TableBody>
                </Table>
                <TableCell>
                  <Typography>
                    <b>총 금액</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    <b>{COM.numWithDot(totalPrice)}</b>
                  </Typography>
                </TableCell>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {/*  <Tooltip title="메뉴이동" placement="top"></Tooltip> */}
        </CardActions>
      </Button>
    </Card>
  );
}
