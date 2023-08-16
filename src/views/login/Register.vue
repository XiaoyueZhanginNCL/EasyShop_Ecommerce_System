<template>
  <div class="login container">
    <HeaderView>
      <span>Sign up</span>
    </HeaderView>
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
      <div class="login-tel">
        <input
          type="password"
          v-model="conPwd"
          placeholder="confirm the password"
        />
      </div>
      <div class="login-btn" @click="signUp">Sign up</div>
    </section>
  </div>
</template>

<script>
import HeaderView from "./Header.vue";
import { Toast } from "mint-ui";
import http from "@/common/api.js";
export default {
  name: "RegisterView",
  components: {
    HeaderView,
  },
  data() {
    return {
      userTel: "",
      userPwd: "",
      conPwd: "",
      rules: {
        userTel: {
          rule: /^7\d{9}$/,
          msg: "Phone number cannot be empty and must be 10 numbers",
        },
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: "Password cannot be empty and must be 6-12 numbers",
        },
      },
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    //点击注册
    signUp() {
      //前端验证格式
      if (!this.validate(this.userTel)) return;
      if (!this.validate(this.userPwd)) return;

      //发送请求后端验证该账户是否已经存在
      http
        .$axios({
          url: "/api/register",
          method: "POST",
          data: {
            userTel: this.userTel,
            userPwd: this.userPwd,
            conPwd: this.conPwd,
          },
        })
        .then((res) => {
          //提示信息
          Toast(res.msg);
          //账户已经存在或密码不一致
          if (!res.status) return;
          //登陆成功，跳转页面
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
}
</style>
