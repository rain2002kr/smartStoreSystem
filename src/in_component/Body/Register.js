import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMove, _mode, _data } from "../../features/bodySlice";
import { signup } from "../../features/Login/loginSlice";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export function Register(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();
  const { msg } = props;

  //react hook form
  const registerSignup = (user) => {
    if (user.pwd !== user.pwd2) {
      setMessage("비밀 번호가 일치하지 않습니다.");
    } else if (user.pwd === user.pwd2) {
      setMessage("");
      //redux execute
      dispatch(
        signup({
          id: user.id,
          name: user.name,
          password: user.pwd,
          password2: user.pwd2,
        })
      );
      //redux sage userPost SignUP
      dispatch({ type: "SIGN_UP" });
    }
  };
  const box = { margin: "5px" };
  const err = { fontSize: "12px", color: "red", margin: "0px" };

  //Material UI 시작
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
      margin: theme.spacing(1, 0, 2),
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
          {message}
          {msg ? (
            msg
          ) : (
            <Typography component="h1" variant="h5">
              계정을 생성해 주세요.
            </Typography>
          )}
        </Typography>
        <form
          className={classes.form}
          //noValidate
          onSubmit={handleSubmit(registerSignup)}
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
            name="name"
            label="이름"
            autoComplete="name"
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
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pwd2"
            label="비밀번호확인"
            type="password"
            autoComplete="password"
            inputRef={register({ required: true })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            계정생성
          </Button>
        </form>
      </div>
    </Container>
  );
}
