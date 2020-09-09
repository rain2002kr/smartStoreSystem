import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  order_store,
  SendCookedFinish,
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

export function CookingCard(props) {
  //import UseForm and dispatch
  const dispatch = useDispatch();
  const audio = new Audio(soundfile);
  const { _id, tableNO, server, order_InTime, orderList, totalPrice } = props;
  const orderLists = orderList;

  const handleCookedFinish = (e) => {
    console.log(orderLists);
    console.log(e.currentTarget.id);
    //리덕스에 조리완료 등록
    audio.play();
    dispatch(
      SendCookedFinish({
        id: e.currentTarget.id,
        date: COM.getTimeStamp(),
      })
    );
    //리덕스 사가에 내용 전달
    dispatch({ type: "COOKED_FINISH" });
    dispatch(setMessage(""));
  };
  const lists = orderLists.map((list) => {
    return (
      <TableRow>
        <TableCell scope="row">{list.name}</TableCell>
        <TableCell align="center">{list.count}EA</TableCell>
      </TableRow>
    );
  });

  //UI 구성 및 Material UI
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      width: "100%",
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Button className={classes.title} id={_id} onClick={handleCookedFinish}>
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
              <TableContainer component={Paper} size="small">
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>{lists}</TableBody>
                </Table>
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
