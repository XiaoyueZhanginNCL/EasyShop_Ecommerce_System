import { USER_LOGIN, INIT_USER } from "./mutations-types.js";
export default {
  state: {
    loginStatus: false, //登陆状态
    token: null, //token
    userInfo: {}, //用户信息
  },
  getters: {},
  mutations: {
    //设置
    [USER_LOGIN](state, user) {
      state.loginStatus = true;
      state.token = user.token;
      state.userInfo = user;
      //持久化存储--->本地存储
      localStorage.setItem("UserInfo", JSON.stringify(user));
    },
    //从本地存储中读取 更新state
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
