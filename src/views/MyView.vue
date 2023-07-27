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
      <ul>
        <li>Address Management</li>
        <li v-if="loginStatus" @click="logOut">Log out</li>
      </ul>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
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
      return this.$store.state.user.userInfo[0]; // 取出数组中的第一个对象作为userInfo对象
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
  ul li {
    padding: 0.4rem;
    font-size: 0.5rem;
  }
}
</style>
