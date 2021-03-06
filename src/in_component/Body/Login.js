import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { body_store, pageMove } from "../../features/bodySlice";
import { login, setMessage } from "../../features/Login/loginSlice";
import "../../css/Login.css";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

export function Login(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  //react hook form
  const Login = (user) => {
    dispatch(
      login({
        id: user.id,
        password: user.pwd,
      })
    );
    dispatch(setMessage("로그인중..."));
    //redux sage userPost Sign-Up
    dispatch({ type: "LOG_IN" });
  };
  const { msg } = props;
  const box = { margin: "5px" };
  const err = { fontSize: "12px", color: "red", margin: "0px" };

  const handlePageMove = (e) => {
    dispatch(pageMove(e.currentTarget.value));
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "40ch", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    textField: {
      width: "40ch", // Fix IE 11 issue.
      margin: theme.spacing(1, 0, 0),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>
          {msg ? (
            msg
          ) : (
            <Typography component="h1" variant="h5">
              로그인하기
            </Typography>
          )}
        </Typography>
        <form
          className={classes.form}
          //noValidate
          onSubmit={handleSubmit(Login)}
        >
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="id"
            label="아이디"
            autoComplete="id"
            autoFocus
            inputRef={register({ required: true, maxLength: 20 })}
          />

          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pwd"
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="기억하기"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>

          <Grid container>
            <Grid item xs={6}>
              <Link href="#" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link
                href="#"
                variant="body2"
                onClick={() => dispatch(pageMove("register"))}
                value="register"
              >
                {"계정 만들기"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
