import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMove } from "../../features/bodySlice.js";
import { setTableNo } from "../../features/Order/orderSlice.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  root: {
    height: 80,
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    width: "100%",
  },
  avater: {
    width: "50",
    alignSelf: "center",
  },
  pos: {
    marginBottom: 12,
  },
});

export function TableCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { tableNo } = props;
  const handleClick = () => {
    console.log(tableNo);
    dispatch(setTableNo(tableNo));
    dispatch(pageMove("FoodSelect_Main"));
  };
  return (
    <Card className={classes.root}>
      <Button className={classes.title} onClick={handleClick}>
        <CardContent>
          <Avatar
            className={classes.avater}
            alt="dinner_table"
            src="/dinner_table.png"
          />
        </CardContent>
        <CardActions>
          <Tooltip title="메뉴이동" placement="top">
            <Button className={classes.title}>{tableNo}</Button>
          </Tooltip>
        </CardActions>
      </Button>
    </Card>
  );
}
