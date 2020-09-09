import React, { Component, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageMove, _data, _mode } from "../../features/bodySlice";
import { order_store, setMessage } from "../../features/Order/orderSlice.js";
import { GetSocketIO } from "../../lib/ComFC.js";
import soundfile from "../../Audio/ring.mp3";

import "../../css/Header.css";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import {
  Paper,
  Grid,
  Button,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import ReceiptSharpIcon from "@material-ui/icons/ReceiptSharp";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BarChartIcon from "@material-ui/icons/BarChart";
import KitchenIcon from "@material-ui/icons/Kitchen";

//Material UI 시작
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

/* 펑션 시작 */
export function HeadContainer() {
  const dispatch = useDispatch();
  const style = { color: "white", textAlign: "center" };
  const style2 = { float: "left" };
  //Get orderstore
  const orderStore = useSelector(order_store);
  const orderCNT = orderStore.orderCNT;
  const cookingCNT = orderStore.cookingCNT;
  const payingCNT = orderStore.payingCNT;

  const socket = GetSocketIO();
  let audio = new Audio(soundfile);
  const handleRequsetOrderFood = () => {
    dispatch(setMessage(""));
    socket.emit("init", { name: "on" });
  };
  //sound on
  function handleplaySound() {
    audio.play();
  }
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawMenuClick = (e) => {
    console.log(e);
    switch (e.target.value) {
      case 0:
        dispatch(pageMove("register"));
        return true;
      case 1:
        dispatch(pageMove("FoodRegist"));
        return true;
      case 2:
        dispatch(pageMove("PaidList_Main"));
        return true;
      case 3:
        dispatch(pageMove("PaidList_Main"));
        return true;

      default:
        return false;
    }
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  /*모바일화면 버튼 클릭*/
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          dispatch(pageMove("CookingList_Main"));
        }}
      >
        <IconButton
          fullWidth
          aria-label="show 4 new mails"
          color="inherit"
          onClick={() => {
            dispatch(pageMove("CookingList_Main"));
          }}
        >
          <Badge badgeContent={cookingCNT} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography align="left">조리화면</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(pageMove("PayingList_Main"));
        }}
      >
        <IconButton
          aria-label="show 11 new notifications"
          color="inherit"
          onClick={() => {
            dispatch(pageMove("PayingList_Main"));
          }}
        >
          <Badge badgeContent={payingCNT} color="secondary">
            <ReceiptSharpIcon />
          </Badge>
        </IconButton>
        <Typography>계산대기화면</Typography>
      </MenuItem>
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={orderCNT} color="secondary">
            <AddShoppingCartSharpIcon />
          </Badge>
        </IconButton>
        <Typography>임시주문</Typography>
      </MenuItem> */}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {/* <AppBar position="static"> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {/* 홈이동 아이콘 */}
          <IconButton>
            <HomeIcon
              onClick={() => dispatch(pageMove("home"))}
              style={{ fontSize: 40, color: "white" }} //color: green[500]
            ></HomeIcon>
          </IconButton>
          {/* <Typography className={classes.title} variant="h6" noWrap>
              Double Dragon
            </Typography> */}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* 쇼핑카트 및 추가 아이콘 */}

            <Button
              fullWidth
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => dispatch(pageMove("CookingList_Main"))}
            >
              <Badge badgeContent={cookingCNT} color="secondary">
                <NotificationsIcon />
              </Badge>
            </Button>

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={payingCNT} color="secondary">
                <ReceiptSharpIcon
                  onClick={() => dispatch(pageMove("PayingList_Main"))}
                />
              </Badge>
            </IconButton>

            {/*  <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={orderCNT} color="secondary">
                <AddShoppingCartSharpIcon
                  onClick={() => dispatch(pageMove("OrderFood_Menu"))}
                />
              </Badge>
            </IconButton> */}

            {/* 사람모양 바 */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* 서랍장 바 */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          {["회원등록", "메뉴등록", "매출관리", "재고관리"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <AccountCircle
                      onClick={() => dispatch(pageMove("register"))}
                    />
                  ) : null}
                  {index === 1 ? (
                    <MenuBookIcon
                      onClick={() => dispatch(pageMove("FoodRegist"))}
                    />
                  ) : null}
                  {index === 2 ? (
                    <BarChartIcon
                      onClick={() => dispatch(pageMove("PaidList_Main"))}
                    />
                  ) : null}
                  {index === 3 ? <KitchenIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      ></main>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

/* 
<Fragment key="HeadContainer">
<div className="head-container">
  <header className="main">
    <p style={style}>Double Dragon </p>
    <button style={style2} onClick={handleplaySound}>
      사운드
    </button>

    <button style={style2} onClick={handleRequsetOrderFood}>
      테스트업데이트
    </button>
    <button style={style2} onClick={() => dispatch(pageMove("home"))}>
      홈화면
    </button>
    <button style={style2} onClick={() => dispatch(pageMove("register"))}>
      회원등록
    </button>
    <button
      style={style2}
      onClick={() => dispatch(pageMove("FoodRegist"))}
    >
      메뉴등록
    </button>
    <button
      style={style2}
      onClick={() => dispatch(pageMove("CookingList_Main"))}
    >
      조리화면
    </button>
    <button
      style={style2}
      onClick={() => dispatch(pageMove("PayingList_Main"))}
    >
      계산화면
    </button>
    <button
      style={style2}
      onClick={() => dispatch(pageMove("PaidList_Main"))}
    >
      계산완료화면
    </button>
  </header>
</div>
</Fragment> */
