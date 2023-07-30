import { Indicator } from "mint-ui";
import axios from "axios";
import store from "@/store";
import router from "@/router";
export default {
  name: "http",
  common: {
    method: "GET",
    data: {},
    params: {},
    headers: {},
  },
  $axios(options = {}) {
    options.method = options.method || this.common.method;
    options.data = options.data || this.common.data;
    options.params = options.params || this.common.params;
    options.headers = options.headers || this.common.headers;

    //请求前显示加载中
    Indicator.open("Loading...");

    // console.log(store);

    //验证是否是登陆状态
    if (options.headers.token) {
      //需要验证
      //取到vuex中token的值
      options.headers.token = store.state.user.token;
      //为空，证明不是登陆状态
      if (!options.headers.token) {
        router.push("/userLogin");
      }
    }

    return axios(options).then((v) => {
      let data = v.data.data;
      return new Promise((res, rej) => {
        if (!v) return rej();
        //结束，关闭加载中
        setTimeout(() => {
          Indicator.close();
        }, 500);
        res(data);
      });
    });
  },
};
