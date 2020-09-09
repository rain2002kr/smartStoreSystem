import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store, pageMove, setViewMenu } from "../../features/bodySlice.js";
import {
  order_store,
  setTemp_order,
  setTemp_orderListClear,
} from "../../features/Order/orderSlice.js";
import { FoodList } from "../Template/FoodList.js";
import "../../css/Table.css";
import { useForm } from "react-hook-form";

export function OrderFood_Menu(props) {
  //import props

  //import UseForm and dispatch
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  //Get bodyStore
  const bodyStore = useSelector(body_store);
  const viewMenu = bodyStore.viewMenu;
  //Get orderstore
  const orderStore = useSelector(order_store);
  const selFoodlists = orderStore.seletedFoodList;
  const tableNumber = orderStore.tableNO;
  const temp_orderList = orderStore.temp_orderList;

  //useEffect 함수
  useEffect(() => {
    console.log("=== useEffect data ===");
    console.log(viewMenu);
    console.log(selFoodlists);
  }, []);

  //CSS
  const inputs = { marginLeft: "10px" };
  const box = { margin: "5px" };
  const err = { fontSize: "12px", color: "red", margin: "0px" };

  //화면 메시지
  const welcomeMessage = "메뉴를 선택 하세요.";

  //유저핸들 및 유저함수
  const handleMoveMenuScreen = (e) => {
    dispatch(pageMove("FoodSelect_Main"));
    dispatch(setTemp_orderListClear());
  };

  const handleShoplist = (e) => {
    console.log("handleShoplist");
    dispatch(setTemp_order({}));
  };

  return (
    <Fragment key="OrderFood_Menu">
      <div className="main-container">
        <button onClick={handleShoplist}>주문하기</button>
        <button onClick={handleMoveMenuScreen}>메뉴화면</button>

        <header className="main">
          <p>선택된 테이블번호: {tableNumber}</p>
        </header>

        <FoodList></FoodList>
      </div>
    </Fragment>
  );
}
