<template>
  <div class="login container">
    <HeaderView></HeaderView>
    <section>
      <div class="login-tel">
        <input
          type="text"
          v-model="userTel"
          placeholder="input your tel"
          pattern="[0-9]*"
        />
      </div>
      <div class="login-code">
        <input type="text" placeholder="input the text num" pattern="[0-9]*" />
        <button @click="sendCode" :disabled="disabled">{{ codeMsg }}</button>
      </div>
      <div class="login-btn">Login</div>
      <div class="tab">
        <span @click="goUserLogin">Password Login</span>
        <span>Sign Up</span>
      </div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";
import HeaderView from "./Header.vue";
import http from "@/common/api.js";
import { Toast } from "mint-ui";
export default {
  name: "LoginView",
  components: {
    TabbarView,
    HeaderView,
  },
  data() {
    return {
      disabled: false,
      userTel: "",
      rules: {
        userTel: {
          rule: /^1\d{10}$/,
          msg: "Tel cannot be empty and must be 11 numbers",
        },
      },
      codeNum: 6,
      codeMsg: "Get",
    };
  },
  methods: {
    goUserLogin() {
      this.$router.push("/userLogin");
    },
    //点击获取短信验证码
    sendCode() {
      //验证
      if (!this.validate(this.userTel)) return;

      //请求短信验证码接口
      http
        .$axios({
          url: "/api/code",
          method: "POST",
          data: {
            phone: this.userTel,
          },
        })
        .then((res) => {
          //提示信息
          console.log(res);
        });

      //禁用按钮
      this.disabled = true;
      //倒计时
      let timer = setInterval(() => {
        --this.codeNum;
        this.codeMsg = `Again ${this.codeNum}`;
      }, 1000);
      //判断什么时候停止定时器
      setTimeout(() => {
        clearInterval(timer);
        this.codeNum = 6;
        this.disabled = false;
        this.codeMsg = "Get";
      }, 6000);
    },
    validate(key) {
      //验证电话格式
      let bool = this.rules.userTel.rule.test(key);
      if (!bool) {
        //返回电话错误信息
        Toast(this.rules.userTel.msg);
      }
      return bool;
      //验证密码格式
    },
  },
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffe5ca;
  div {
    margin: 0.26rem 0;
    width: 8.93rem;
    height: 1.17rem;
  }
  input {
    box-sizing: border-box;
    padding: 0 0.26rem;
    line-height: 1.17rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .login-tel {
    margin-top: 0.8rem;
    input {
      width: 8.93rem;
    }
  }
  .login-code {
    display: flex;
    input {
      flex: 1;
    }
    button {
      padding: 0 0.53rem;
      line-height: 1.173rem;
      color: #fff;
      background-color: #fa9884;
      border: 0;
      border-radius: 6px;
    }
  }
  .login-btn {
    line-height: 44px;
    color: #fff;
    text-align: center;
    background-color: #fa9884;
    border-radius: 6px;
  }
  .tab {
    display: flex;
    justify-content: space-between;
    font-size: 0.37rem;
  }
}
</style>
