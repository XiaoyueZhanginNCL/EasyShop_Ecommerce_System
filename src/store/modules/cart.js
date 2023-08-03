import { CART_CHOICE } from "./mutations-types.js";
import { CART_SELECT } from "./mutations-types.js";
export default {
  state: {
    // totalNum: 0,
    // totalPrice: 0,
    // selectedItems: [],
    totalVuex: {},
    selectVuex: [],
  },
  mutations: {
    // SET_TOTAL_NUM(state, num) {
    //   state.totalNum = num;
    //   console.log(state.totalNum);
    // },
    // SET_TOTAL_PRICE(state, price) {
    //   state.totalPrice = price;
    //   console.log(state.totalPrice);
    // },
    // SET_SELECTED_ITEMS(state, items) {
    //   state.selectedItems = items;
    //   console.log(state.selectedItems);
    // },
    [CART_CHOICE](state, total) {
      state.totalVuex = total;
    },
    [CART_SELECT](state, select) {
      state.selectVuex = select;
    },
  },
};
