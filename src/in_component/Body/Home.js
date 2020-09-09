import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMove, setMessage, _data, _mode } from "../../features/bodySlice";
import "../../css/Login.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

export function Home() {
  const dispatch = useDispatch();
  const welcomeMessage1 = "SMART";
  const welcomeMessage2 = "STORE SYSTEM";
  const handlePageMove = (e) => {
    dispatch(pageMove(e.currentTarget.value));
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      height: "400px",
    },
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textStyle: {
      background: "linear-gradient(45deg, #81d4fa 30%, #039be5 90%)",
      border: 1,
      borderRadius: 20,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: "100",
      fontSize: "25px",
      margin: "10px",
    },
    buttonStyle: {
      height: 48,
      width: 150,
    },
  }));
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography></Typography>
          </Grid>
          <Grid item xs={12} align-items-xs-center justify-xs-flex-end>
            <Typography className={classes.textStyle}>
              {welcomeMessage1}
              <br />
              {welcomeMessage2}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography></Typography>
          </Grid>

          <Grid item xs={12} align-items-xs-center justify-xs-flex-end>
            <Button
              className={classes.buttonStyle}
              variant="outlined"
              color="primary"
              value="tableSelect"
              value="login"
              size="large"
              onClick={handlePageMove}
              value="login"
            >
              로그인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography></Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.buttonStyle}
              variant="outlined"
              color="primary"
              value="tableSelect"
              size="large"
              onClick={handlePageMove}
              value="tableSelect"
            >
              비회원 로그인
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
