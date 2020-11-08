import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store, pageMove, setViewMenu } from "../../features/bodySlice.js";
import {
  order_store,
  setSeletedFoodList,
} from "../../features/Order/orderSlice.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 240,
  },
  media: {
    height: 140,
  },
});

export function MenuCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { type, image, dsc, index } = props;
  const handleClick = (e) => {
    e.preventDefault();
    console.log(type);
    dispatch(setSeletedFoodList({ name: type, index: index }));
    dispatch(setViewMenu(type));
    dispatch(pageMove("FoodSelect_Menu"));
  };
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {type}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {dsc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
