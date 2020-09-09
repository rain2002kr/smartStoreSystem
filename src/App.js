import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTableNo, setMessage } from "../src/features/Order/orderSlice.js";
import { GetSocketIO } from "../src/lib/ComFC.js";
import { HeadContainer } from "./in_component/Header/HeadContainer.js";
import { AsideContainer } from "./in_component/Aside/AsideContainer.js";
import { BodyContainer } from "./in_component/Body/BodyContainer.js";
import { FooterContainer } from "./in_component/Footer/FooterContainer.js";
import soundfile from "./Audio/ring.mp3";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

export function App() {
  const dispatch = useDispatch();
  const socket = GetSocketIO();
  const audio = new Audio(soundfile);
  socket.on("welcome", (data) => {
    console.log("return message");
    console.log(data);
    dispatch(setMessage(data));
    dispatch({ type: "GET_ORDER_LIST" });
    audio.play();
  });
  /* socket.on("hello", function (msg) {
    console.log(msg);
  }); */

  const headComponent = <HeadContainer />;
  const asideComponent = <AsideContainer />;
  const mainComponent = <BodyContainer />;
  const footComponent = <FooterContainer />;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();
  //useEffect 함수
  useEffect(() => {
    console.log("useEffect--Main------");
  }, []);
  return (
    <Fragment key="App">
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{headComponent}</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{mainComponent}</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{footComponent}</Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

export default App;

/* 
//import "./App.css";
//import { FullScreen, useFullScreenHandle } from "react-full-screen";
//import socketIO from "socket.io-client";
const handle = useFullScreenHandle(); //full screen handle

<div className="main-container">
        <header className="App-header">{headComponent}</header>
        <div className="sub-container">
          <aside className="App-aside">{asideComponent}</aside>
          <main className="App-main">{mainComponent}</main>
        </div>
        <footer className="App-footer">{footComponent}</footer>
      </div>


class App extends Component {
  render() {
    var headComponent = <HeadContainer />;
    var asideComponent = <AsideContainer />;
    var mainComponent = <BodyContainer />;
    var footComponent = <FooterContainer />;

    return (
      <Fragment key="App">
        <div className="main-container">
          <header className="App-header">{headComponent}</header>
          <div className="sub-container">
            <aside className="App-aside">{asideComponent}</aside>
            <main className="App-main">
              {mainComponent}
         
            </main>
          </div>
          <footer className="App-footer">{footComponent}</footer>
        </div>
      </Fragment>
    );
  }
}
export default App;
 */
/* 
 //20200708 테스트 되지만 코멘트처리
 state = {
  response: '',
  post: '',
  responseToPost: '',
};
  
componentDidMount() {
  this.callApi()
    .then(res => console.log(res))
    .catch(err => console.log(err,'test'));
}

callApi = async () => {
  const response = await fetch('/api/user/lkh');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  
  return body;
};  */

/*  
 async componentWillMount() {
  //fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(json => console.log(json))
}

/* handleSubmit = async e => {
  e.preventDefault();
  const response = await fetch('/api/world', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post: this.state.post }),
  });
  const body = await response.text();
  
  this.setState({ responseToPost: body });
}; */
