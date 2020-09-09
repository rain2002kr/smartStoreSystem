import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    tableNO: "0",
    orderCNT: 0,
    cookingCNT: 0,
    payingCNT: 0,
    regist_food: { name: "", price: 0, type: "", img: {}, status: 0 },
    temp_orders: [{}],
    updateTempOrderItem: {},
    updateTempOrderItemCount: 0,
    prevOrder: [],
    foodList: [],
    fliteredFoodlist: [],
    seletedFoodList: [],
    foodType: [],
    filteredFoodType: [],

    order_food: [{}],
    cookedFinish: [],
    paidFinish: [],

    orderListfromServer: [],
    paidListfromServer: [],

    seletedFoodType: { name: "", index: 0 },
    user: "",
  },
  reducers: {
    setCookingCount: (state, action) => {
      state.cookingCNT = action.payload;
    },
    setPaiyingCount: (state, action) => {
      state.payingCNT = action.payload;
    },
    setOrderCount: (state, action) => {
      state.orderCNT = state.orderCNT + action.payload;
    },
    resetOrderCount: (state, action) => {
      state.orderCNT = 0;
    },
    prevOrderCheck: (state, action) => {
      state.prevOrder = action.payload;
    },
    SendOrder_food: (state, action) => {
      state.order_food = action.payload;
    },
    SendCookedFinish: (state, action) => {
      state.cookedFinish = action.payload;
    },
    SendPaidFinish: (state, action) => {
      state.paidFinish = action.payload;
    },
    getOrderListfromServer: (state, action) => {
      state.orderListfromServer = action.payload;
    },
    getPaidListfromServer: (state, action) => {
      state.paidListfromServer = action.payload;
    },
    regist_food: (state, action) => {
      state.regist_food = {
        name: action.payload.name,
        type: action.payload.type,
        img: action.payload.img,
        price: action.payload.price,
        status: action.payload.status,
      };
    },

    selectFood: (state, action) => {
      const item = action.payload;
      const index = item.index;
      const menu = state.seletedFoodType.index;
      const foodlist = state.temp_orders[menu];
      let prevCount = state.temp_orders[menu][index].count;
      //들어온 값에 id값이 일치하지 않으면 그대로 씀
      if (foodlist[index].id === item.id) {
        if (item.order === "+") {
          state.temp_orders[menu][index].count++;
        } else if (item.order === "-") {
          if (prevCount > 0) state.temp_orders[menu][index].count--;
          if (prevCount < 0) state.temp_orders[menu][index].count = 0;
        }
      } else if (foodlist[index].id !== item.id) {
        foodlist[index] = item;
      }
    },
    saveUpdateOrderItem: (state, action) => {
      state.updateTempOrderItem = action.payload;
      state.updateTempOrderItemCount = action.payload.count;
    },
    updateOrderFood: (state, action) => {
      const order = action.payload.order;
      const item = action.payload.item;
      const menu = item.index1;
      const index = item.index2;
      let prevCount = state.temp_orders[menu][index].count;
      switch (order) {
        case "+": {
          state.temp_orders[menu][index].count++;
          state.updateTempOrderItemCount = state.temp_orders[menu][index].count;
          console.log(prevCount);
          break;
        }
        case "-": {
          if (prevCount > 0) state.temp_orders[menu][index].count--;
          if (prevCount < 0) state.temp_orders[menu][index].count = 0;
          state.updateTempOrderItemCount = state.temp_orders[menu][index].count;
          console.log(prevCount);
          break;
        }
        default: {
          break;
        }
      }
    },

    setMessage: (state, action) => {
      state.user = action.payload;
    },

    setFoodList: (state, action) => {
      //set foodlist
      state.foodList = action.payload;
      const lists = state.foodList;
      const temp = [];
      for (var i = 0; i < lists.length; i++) {
        temp.push(lists[i].type);
      }
      //중복제거해서 올리기
      state.foodType = Array.from(new Set(temp));
    },
    setTableNo: (state, action) => {
      state.tableNO = action.payload;
    },

    setSeletedFoodList: (state, action) => {
      const foodType = action.payload.name;
      const index = action.payload.index;
      const lists = state.foodList;
      const temp = [];
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].type === foodType) {
          temp.push(lists[i]);
          state.seletedFoodType = { name: foodType, index: index }; //foodType and index
        }
      }
      state.seletedFoodList = temp;
    },
    setFliteredFoodlist: (state, action) => {
      state.fliteredFoodlist = action.payload.foodlist;
      state.temp_orders = action.payload.emptylist;
    },
    setFilteredFoodType: (state, action) => {
      state.filteredFoodType = action.payload;
    },
    setOrderFood: (state, action) => {},
  },
});
//리듀서 타입은 하나씩 내보낼수밖에 없다.
export const {
  selectFood,
  regist_food,
  setMessage,
  user,
  setFoodList,
  setTableNo,
  setSeletedFoodList,
  setFliteredFoodlist,
  setFilteredFoodType,
  SendOrder_food,
  SendCookedFinish,
  SendPaidFinish,
  getOrderListfromServer,
  getPaidListfromServer,
  prevOrderCheck,
  setOrderCount,
  resetOrderCount,
  setCookingCount,
  setPaiyingCount,
  saveUpdateOrderItem,
  updateOrderFood,
} = orderSlice.actions;
export const { actions } = orderSlice;

//액션 타입 내보내기 이부분을 가져가는 부분에 셀렉트로 가져갑니다.
//state. 뒤에 붙는 변수는 store 에 저장되어있는 이름입니다.
export const order_store = (state) => state.order;

export default orderSlice.reducer;
