import React, { Component, Fragment, useState, useEffect } from "react";
import { Home } from "./Home.js";
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import { TableSelect } from "./TableSelect.js";
import { FoodRegist } from "./FoodRegist.js";
import { FoodSelect_Main } from "./FoodSelect_Main.js";
import { FoodSelect_Menu } from "./FoodSelect_Menu.js";
import { OrderFood_Menu } from "./OrderFood_Menu.js";
import { CookingList_Main } from "./CookingList_Main.js";
import { PayingList_Main } from "./PayingList_Main.js";
import { PaidList_Main } from "./PaidList_Main.js";
import { TempCard } from "../Template/TempCard.js";

import { useSelector, useDispatch } from "react-redux";
import { body_store } from "../../features/bodySlice";
import { order_store } from "../../features/Order/orderSlice";

import "../../css/Login.css";

export function BodyContainer() {
  //import UseForm and dispatch
  const dispatch = useDispatch();

  const bodyStore = useSelector(body_store);
  const mode = bodyStore.mode;
  const orderStore = useSelector(order_store);
  let mainComponent = <Home />;

  useEffect(() => {}, []);

  switch (mode) {
    case "home":
      return (mainComponent = <Home />);
    case "login":
      return (mainComponent = <Login msg={bodyStore.user} />);
    case "register":
      return (mainComponent = <Register msg={bodyStore.user} />);
    case "tableSelect":
      return (mainComponent = <TableSelect msg={bodyStore.user} />);
    case "FoodSelect_Main":
      return (mainComponent = <FoodSelect_Main msg={bodyStore.user} />);
    case "CookingList_Main":
      return (mainComponent = <CookingList_Main msg={bodyStore.user} />);
    case "PayingList_Main":
      return (mainComponent = <PayingList_Main msg={bodyStore.user} />);
    case "PaidList_Main":
      return (mainComponent = <PaidList_Main msg={bodyStore.user} />);
    case "OrderFood_Menu":
      return (mainComponent = <OrderFood_Menu msg={bodyStore.user} />);
    case "FoodSelect_Menu":
      return (mainComponent = (
        <FoodSelect_Menu msg={bodyStore.user} foodlists={orderStore.foodList} />
      ));
    case "FoodRegist":
      return (mainComponent = (
        <FoodRegist msg={bodyStore.user} foodlists={orderStore.foodList} />
      ));
    case "TempCard":
      return (mainComponent = <TempCard msg={bodyStore.user} />);
    default:
      return (mainComponent = <Home />);
  }
  return <Fragment key="BodyContainer">{mainComponent}</Fragment>;
}
