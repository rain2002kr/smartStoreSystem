import React,{Component, Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pageMove,
  _mode,
} from '../../features/Login/loginSlice';
import '../../css/Login.css';

export function Login() {
  const dispatch = useDispatch();
  
  return (
    <Fragment key="Login">
      <div className="main-container">
        <header className="main">
        <p><input type="button" value="홈으로이동" name="btn-home"
          onClick={()=> dispatch(pageMove('home'))}></input></p>
        <p>로그인 해주세요.</p>
        <p><input type="text" placeholder="ID" id="id"></input></p>  
        <p><textarea type="text" placeholder="password" name="password"></textarea></p>
        <p><input type="submit" value="로그인" name="btn-login"></input></p>
      </header>
      </div>
    </Fragment >
  );
}
