import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./modules/user.js";
import path from "./modules/path.js";
import cart from "./modules/cart.js";
import order from "./modules/order.js";

export default new Vuex.Store({
  modules: {
    user,
    path,
    cart,
    order,
  },
});
