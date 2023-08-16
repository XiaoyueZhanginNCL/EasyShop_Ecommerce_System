<template>
  <div class="my container">
    <header>
      <div class="user-info" v-if="loginStatus">
        <img :src="userInfo.imgUrl" />
        <span>{{ userInfo.nickName }}</span>
      </div>
      <div v-else class="login" @click="goLogin">log in/sign up</div>
    </header>
    <section>
      <ul class="order" v-if="loginStatus">
        <li>
          <span @click="allOrders">All Orders</span>
          <span @click="pending">Pending Shipment</span>
          <span>Shipped</span>
          <span>Delivered</span>
        </li>
        <li @click="goPath" class="address">Address Management</li>
        <li v-if="loginStatus" @click="logOut" class="logout">Log out</li>
      </ul>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import http from "@/common/api.js";
import TabbarView from "@/components/common/Tabbar.vue";
export default {
  name: "MyView",
  components: {
    TabbarView,
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
    }),
    userInfo() {
      return this.$store.state.user.userInfo; // 取出数组中的第一个对象作为userInfo对象
    },
  },
  created() {
    console.log(this.userInfo);
  },
  methods: {
    ...mapMutations(["logOut"]),
    goLogin() {
      this.$router.push("/userLogin");
    },
    goPath() {
      this.$router.push("/path");
    },
    //查看已支付订单
    pending() {
      http
        .$axios({
          url: "/api/pending",
          method: "post",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          if (res.status) {
            this.$router.push({
              path: "/orderstatus",
              query: {
                item: res.data,
                status: 2,
              },
            });
          }
          console.log(res.data);
        });
    },
    //查看全部订单
    allOrders() {
      http
        .$axios({
          url: "/api/allorders",
          method: "post",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          if (res.status) {
            this.$router.push({
              path: "/orderstatus",
              query: {
                item: res.data,
                status: 1,
              },
            });
          }
          console.log(res.data);
        });
    },
  },
};
</script>
<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.26rem;
  background-color: #fa9884;
  .login {
    padding: 0.16rem 0.4rem;
    font-size: 0.4rem;
    color: #fff;
    background-color: #ffe5ca;
    border-radius: 6px;
  }
  .user-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.76rem;
      height: 1.76rem;
      border-radius: 50%;
    }
    span {
      font-size: 0.48rem;
      color: #fff;
      padding: 0.3rem 0;
    }
  }
}
section {
  flex: 1;
  overflow: hidden;
  .order {
    li {
      font-size: 0.37rem;
      display: flex;
      justify-content: space-between;
      span {
        border: solid 0.1px #fa9884;
        padding: 0.13rem;
        border-radius: 12px;
        color: #e74646;
        background-color: #fff3e2;
      }
    }
  }
  ul li {
    padding: 0.4rem;
    font-size: 0.5rem;
    .address {
      font-size: 0.5rem;
      border: solid 0.1px #fa9884;
      border-radius: 12px;
      width: 80%;
      margin: 0.2rem;
      color: #e74646;
      background-color: #fff3e2;
    }
    .logout {
      font-size: 0.5rem;
      border: solid 0.1px #fa9884;
      border-radius: 12px;
      width: 80%;
      margin: 0.2rem;
      color: #e74646;
      background-color: #fff3e2;
    }
  }
}
</style>
