<template>
  <div class="login container">
    <HeaderView></HeaderView>
    <section>
      <div class="login-tel">
        <input
          type="text"
          v-model="userTel"
          placeholder="input your account"
          pattern="[0-9]*"
        />
      </div>
      <div class="login-tel">
        <input
          type="password"
          v-model="userPwd"
          placeholder="input the password"
        />
      </div>
      <div class="login-btn" @click="login">Login</div>
      <div class="tab">
        <span @click="goLogin">Text Login</span>
        <span v-show="false">get back password</span>
        <span @click="goRegister">Sign Up</span>
      </div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";
import HeaderView from "./Header.vue";
import { Toast } from "mint-ui";
import http from "@/common/api.js";
import { mapMutations } from "vuex";
export default {
  name: "UserLogin",
  components: {
    TabbarView,
    HeaderView,
  },
  data() {
    return {
      userTel: "",
      userPwd: "",
      rules: {
        userTel: {
          rule: /^7\d{9}$/,
          msg: "User account cannot be empty and must be 10 numbers",
        },
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: "Password cannot be empty and must be 6-12 numbers",
        },
      },
    };
  },
  methods: {
    ...mapMutations(["USER_LOGIN"]),
    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register").catch(() => {});
    },
    //点击登录按钮
    login() {
      //前端验证格式
      if (!this.validate(this.userTel)) return;
      if (!this.validate(this.userPwd)) return;

      //发送请求后端验证
      http
        .$axios({
          url: "/api/login",
          method: "POST",
          data: {
            userTel: this.userTel,
            userPwd: this.userPwd,
          },
        })
        .then((res) => {
          //提示信息
          Toast(res.msg);
          //登陆失败
          if (!res.status) return;

          //登陆成功，跳转页面
          this.USER_LOGIN(res.data);
          this.$router.push("/my");
        });
    },
    //验证信息提示
    validate(key) {
      //验证电话格式
      if (key == this.userTel) {
        let bool = this.rules.userTel.rule.test(key);
        if (!bool) {
          //返回电话错误信息
          Toast(this.rules.userTel.msg);
        }
        return bool;
        //验证密码格式
      } else {
        let bool2 = this.rules.userPwd.rule.test(key);
        if (!bool2) {
          //返回密码错误信息
          Toast(this.rules.userPwd.msg);
        }
        return bool2;
      }
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
  .login-btn {
    line-height: 44px;
    color: #fff;
    text-align: center;
    background-color: #fa9884;
    border-radius: 6px;
    margin-top: 0.7rem;
  }
  .tab {
    display: flex;
    justify-content: space-between;
    font-size: 0.37rem;
  }
}
</style>
