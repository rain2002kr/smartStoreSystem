import React,{Component, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pageMove,
  _mode,
  data,
} from '../../features/Login/loginSlice';

import '../../css/Header.css';
export function HeadContainer() {
  var datas = useSelector(data);
  console.log(datas);
  console.log(datas['singup']);
  var id = datas['singup']['name'];
  console.log(id);

     
    return(
         <Fragment key="HeadContainer">
          <div className="head-container">
          <header className="main">
            <p>쌍 룡 </p>
            {id}
            
          </header>
          </div>
        </Fragment >
    )
  }
  