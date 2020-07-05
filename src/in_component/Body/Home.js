import React,{Component, Fragment, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pageMove,
  _mode,
} from '../../features/Login/loginSlice';

import '../../css/Login.css';

export function Home() {
  var modes = useSelector(_mode);
  const dispatch = useDispatch();
  
  return (
  <Fragment key="Login">
    <div className="main-container">
    <header className="main">
    <p>환영 합니다. 스마트 스토어 시스템 입니다.</p>
    <p>최고의 맛과 서비스를 제공해 드립니다.</p>
     <p><input type="submit" value="로그인" name="btn-login" 
        onClick={()=> dispatch(pageMove('login'))}></input></p>
     <p><input type="submit" value="비회원 로그인" name="btn-nonlogin" 
      onClick={()=> dispatch(pageMove('home'))}></input></p>
    <p><input type="submit" value="계정생성" name="btn-signup"
        onClick={()=> dispatch(pageMove('register'))}></input></p>

    </header>
    </div>
  </Fragment >
  )

}

