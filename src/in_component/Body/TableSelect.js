import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMove, _data, _mode } from "../../features/bodySlice.js";
import {
  setTableNo,
  setMessage,
  resetOrderCount,
} from "../../features/Order/orderSlice.js";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TableCard } from "../Template/TableCard";
import { tableList } from "../../lib/Data.js";

export function TableSelect() {
  const dispatch = useDispatch();

  //useEffect 함수
  useEffect(() => {
    dispatch(setMessage(""));
    dispatch({ type: "FOOD_GET" });
    dispatch(resetOrderCount());
  }, []);
  //CSS

  //유저핸들 및 유저함수

  //테이블 번호 입력
  var tableLists = tableList;

  //메뉴설정
  const welcomeMessage = "테이블 번호를 입력하세요.";
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
  const classes = useStyles();
  const getTableCardList = (CardObj, index) => {
    return (
      <Grid item xs={6} sm={4} lg={2}>
        <TableCard {...CardObj} />
      </Grid>
    );
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <Typography variant="h6" component="h5" color="textSecondary">
            테이블 번호
          </Typography>
        </Grid>
        {tableLists.map((Obj, index) => getTableCardList(Obj, index))}
      </Grid>
    </div>
  );
}
