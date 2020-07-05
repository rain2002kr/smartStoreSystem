import React,{Component, Fragment} from 'react';
import { Home } from './Home.js';
import { Login } from './Login.js';
import { Register } from './Register.js';
import { TableSelect } from './TableSelect.js';
 
import { useSelector, useDispatch,  } from 'react-redux';
import {
  _mode
} from '../../features/Login/loginSlice';

import '../../css/Login.css';
export function BodyContainer() {
  var mode = useSelector(_mode);
  var mainComponent=<Home/>;
    switch(mode){
      case 'home' : 
        return mainComponent = <Home/>;
      case 'login' : 
        return mainComponent = <Login/>;  
      case 'register' : 
        return mainComponent = <Register/>;
      case 'tableSelect' : 
        return mainComponent = <Home/>;
      
      default :
        return mainComponent = <Home/>;
    }
  return(
      <Fragment key="BodyContainer">
        {mainComponent}
      </Fragment >
  )
}

