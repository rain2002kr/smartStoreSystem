import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMove, setMessage, _data, _mode } from "../../features/bodySlice";
import { regist_food, order_food } from "../../features/Order/orderSlice.js";
import "../../css/Table.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Typography,
  TextField,
  CssBaseline,
  Button,
  Container,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

export function FoodRegist(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { msg } = props;
  const { foodlists } = props;
  //const [foodName, setFoodName] = useState([]);

  const welcomeMessage = "음식 메뉴를 입력하세요.";
  useEffect(() => {
    console.log("=== useEffect data ===");
    console.log(foodlists);
    for (var i = 0; i < foodlists.length; i++) {
      console.log(foodlists[i].name);
      console.log(foodlists[i].price);
      console.log(foodlists[i].type);
    }
  }, []);

  //react hook form
  const registFood = (food) => {
    console.log(food);
    //redux execute
    console.log(food.image[0]);
    dispatch(
      regist_food({
        name: food.name,
        type: food.type,
        price: food.price,
        img: food.image[0],
        status: 1,
      })
    );
    //redux sage foodPost FOOD_REGIST
    dispatch({ type: "FOOD_REGIST" });
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
          {msg ? (
            msg
          ) : (
            <Typography component="h1" variant="h5">
              음식 메뉴를 등록해 주세요.
            </Typography>
          )}
        </Typography>
        <form
          className={classes.form}
          //noValidate
          onSubmit={handleSubmit(registFood)}
        >
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="음식이름"
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
            name="type"
            label="음식종류"
            autoComplete="type"
            autoFocus
            inputRef={register({ required: true, maxLength: 20 })}
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="가격"
            autoComplete="price"
            autoFocus
            inputRef={register({ required: true })}
          />
          <input
            name="image"
            type="file"
            placeholder="파일등록"
            ref={register}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            음식등록
          </Button>
        </form>
      </div>
    </Container>
  );
}
