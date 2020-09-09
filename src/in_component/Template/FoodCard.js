import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store, pageMove } from "../../features/bodySlice.js";
import {
  order_store,
  setOrderCount,
  selectFood,
} from "../../features/Order/orderSlice.js";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainButtonStyle: {
    width: "100%",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "white",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export function FoodCard(props) {
  const dispatch = useDispatch();
  //Get orderstore
  const orderStore = useSelector(order_store);
  const tableNumber = orderStore.tableNO;
  const foodList = orderStore.foodList;
  const foodType = orderStore.foodType;
  const t_order = orderStore.t_order;
  const orderCNT = orderStore.orderCNT;
  const seletedFoodType = orderStore.seletedFoodType.index;
  //setSelectedIndex(seletedFoodType);

  //useEffect 함수
  useEffect(() => {
    console.log("useEffect--FoodCard------");
    console.log(order);
  }, []);

  //UI 구성 및 Material UI
  const classes = useStyles();
  const [order, setOrder] = useState({});

  const { _id, type, name, price, image, dsc, menuType, index } = props;
  const handleClickOrderCount = () => {
    dispatch(setOrderCount(1));
    //setOrder(props);
    dispatch(
      selectFood({
        id: _id,
        name: name,
        price: price,
        count: 1,
        order: "+",
        index: index,
        type: type,
      })
    );
  };

  return (
    <Paper className={classes.root}>
      <Button
        onClick={handleClickOrderCount}
        className={classes.mainButtonStyle}
      >
        <Grid container spacing={0}>
          <Grid item xs={3} sm={12} lg={12}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {menuType}
            </Avatar>
          </Grid>
          <Grid item xs={6} sm={12} lg={12}>
            <Typography variant="h6" component="h6" color="textSecondary">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={12} lg={12}>
            <Typography variant="h6" component="h6" color="textSecondary">
              {price}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Paper>
  );
}
