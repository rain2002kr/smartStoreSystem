import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store, pageMove } from "../../features/bodySlice.js";
import {
  order_store,
  updateOrderFood,
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
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export function TempCard() {
  //import UseForm and dispatch
  const dispatch = useDispatch();

  //Get orderstore
  let item = {};
  const orderStore = useSelector(order_store);
  const updateTempOrderItem = orderStore.updateTempOrderItem;
  const updateTempOrderItemCount = orderStore.updateTempOrderItemCount;

  //useEffect 함수
  /*   useEffect(() => {
    console.log("useEffect--FoodCard------");
  }, []);
 */
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

  const handleShoplist = (e) => {
    dispatch({ type: "ORDER_FOOD" });
  };
  const handlePageMove = () => {
    handleShoplist();
    dispatch(pageMove("OrderFood_Menu"));
  };
  const handleItemPlus = () => {
    dispatch(updateOrderFood({ item: updateTempOrderItem, order: "+" }));
    //handleShoplist();
  };
  const handleItemMinus = () => {
    {
      dispatch(updateOrderFood({ item: updateTempOrderItem, order: "-" }));
    }
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center" //가로축
        alignItems="center" //새로축
      >
        <Grid item xs={12}>
          <Button
            elevation={0}
            fullWidth
            variant="elevation" //can be selted outlined, elevation
            squareclassName={classes.paper}
            onClick={handlePageMove}
          >
            <ArrowBackIcon></ArrowBackIcon>
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={0}
            variant="elevation" //can be selted outlined, elevation
            squareclassName={classes.paper}
          >
            <Typography variant="h6" component="h6" color="primary">
              {updateTempOrderItem.name}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Button
            elevation={0}
            variant="outlined" //can be selted outlined, elevation
            squareclassName={classes.paper}
            onClick={handleItemPlus}
          >
            <AddIcon></AddIcon>
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Paper
            elevation={0}
            variant="elevation" //can be selted outlined, elevation
            squareclassName={classes.paper}
          >
            <Typography variant="h6" component="h6" color="primary">
              {updateTempOrderItemCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Button
            elevation={0}
            variant="outlined" //can be selted outlined, elevation
            squareclassName={classes.paper}
            onClick={handleItemMinus}
          >
            <RemoveIcon></RemoveIcon>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
