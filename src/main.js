import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//public css document
import "@/assets/css/common.css";

// 引入全部 mint-ui组件
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";

Vue.use(MintUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
