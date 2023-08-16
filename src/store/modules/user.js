import { USER_LOGIN, INIT_USER } from "./mutations-types.js";
export default {
  state: {
    loginStatus: false, //登陆状态
    token: null, //token
    userInfo: {}, //用户信息
  },
  getters: {},
  mutations: {
    //Storing user login information
    [USER_LOGIN](state, user) {
      state.loginStatus = true;
      state.token = user.token;
      state.userInfo = user;
      //Convert to persistent storage
      localStorage.setItem("UserInfo", JSON.stringify(user));
    },
    //Read from local storage and update the state
    [INIT_USER](state) {
      let userInfo = JSON.parse(localStorage.getItem("UserInfo"));
      if (userInfo) {
        state.loginStatus = true;
        state.token = userInfo.token;
        state.userInfo = userInfo;
      }
    },
    //退出登录
    logOut(state) {
      state.loginStatus = false;
      state.token = null;
      state.userInfo = {};
      localStorage.removeItem("UserInfo");
    },
  },
  actions: {},
};
