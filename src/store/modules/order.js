import { INIT_ORDER } from "./mutations-types.js";
export default {
  state: {
    list: [],
    orderId: localStorage.getItem("orderId"),
  },
  mutations: {
    [INIT_ORDER](state, order) {
      state.list = order;
      //存储订单号
      state.orderId = order[0].order_id;
      localStorage.setItem("orderId", order[0].order_id);
    },
  },
};
