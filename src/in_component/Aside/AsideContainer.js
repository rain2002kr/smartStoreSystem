import React, { Component, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMove } from "../../features/bodySlice.js";

export function AsideContainer() {
  const dispatch = useDispatch();

  return (
    <Fragment key="AsideContainer">
      <p
        onClick={() => {
          dispatch(pageMove("register"));
        }}
      >
        회원등록
      </p>
      <p
        onClick={() => {
          dispatch(pageMove("FoodRegist"));
        }}
      >
        메뉴등록
      </p>

      <p>재고관리</p>
      <p>매출관리</p>
    </Fragment>
  );
}
