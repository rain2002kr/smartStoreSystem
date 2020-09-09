import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store, pageMove, setViewMenu } from "../../features/bodySlice.js";
import {
  order_store,
  setSeletedFoodList,
} from "../../features/Order/orderSlice.js";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
  item: {
    width: "100ch",
  },
}));

export function MenuFilterList() {
  const dispatch = useDispatch();
  //Get orderstore
  const orderStore = useSelector(order_store);
  const tableNumber = orderStore.tableNO;
  const foodList = orderStore.foodList;
  const foodType = orderStore.foodType;
  const options = foodType;

  //useEffect 함수
  useEffect(() => {
    console.log("useEffect--SimpleListMenu------");
    const seletedFoodType = orderStore.seletedFoodType.index;
    setSelectedIndex(seletedFoodType);
  }, []);
  //UI 구성 및 Material UI
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, _index, Type) => {
    setSelectedIndex(_index);
    dispatch(setSeletedFoodList({ name: Type, index: _index }));
    dispatch(setViewMenu(Type));
    dispatch(pageMove("FoodSelect_Menu"));
    setAnchorEl(null);
    /* console.log("handleMenuItemClick");
    console.log(Type);
    console.log(_index);
    console.log(event.currentTarget.id); */
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={options[selectedIndex]}
            //secondary={options[selectedIndex]}
          />

          <ArrowDropDownIcon />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            className={classes.item}
            key={option}
            //disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
