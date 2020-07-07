import React,{Component, Fragment, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  pageMove,
  signup,
  _mode,

} from '../../features/Login/loginSlice';

import '../../css/Login.css';
export function Register() {
  const dispatch = useDispatch();
  
  //var id='';
  //var signup = {id:'',name:'',pwd:'',pwd2:''};

    
  var signup_id ='';
  var signup_name ='';
  var signup_pwd ='';
  var signup_pwd2 ='';
  var test = {};
  /* useEffect(()=>{
    console.log('렌더링이 되었습니다.');
    callApi()
    .then(res => test = res );
    
  });

 

   var callApi = async () => {
    const res = await fetch('/');
    const body = await res.json();
    return body;
  }  */
  
  return (
    <Fragment key="Register">
      <div className="main-container">
        <header className="main">
         <p><input type="button" value="홈으로이동" name="btn-test"
            onClick ={()=> console.log('test tttt')}></input></p>

          <p><input type="button" value="홈으로이동" name="btn-home"
            onClick={()=> dispatch(pageMove('home'))}></input></p>
          <p>계정을 생성해 주세요.</p>
         
            <p><input type="text" placeholder="ID" name="id" 
              onChange={(e)=>{signup_id = e.target.value}}
            ></input></p>

            <p><input type="text" placeholder="name" name="name" 
              onChange={(e)=>{signup_name = e.target.value}}
            ></input></p>
            <p><input type="text" placeholder="password" name="pwd" 
              onChange={(e)=>{signup_pwd = e.target.value}}
            ></input></p>
            <p><input type="text" placeholder="confirm password" name="pwd2" 
              onChange={(e)=>{signup_pwd2 = e.target.value}}
            ></input></p>

            <p><input type="submit" value="계정생성" name="btn-signup"
              onClick={()=> dispatch(signup({
                id: signup_id, name: signup_name ,password: signup_pwd, password2: signup_pwd2
              }))}
            ></input></p>   
         
      </header>
      </div>
      
    </Fragment >
  );
}

