<template>
  <div class="my container">
    <header>
      <div class="login" @click="goLogin">log in/sign up</div>
    </header>
    <section>
      <ul>
        <li>Address Management</li>
      </ul>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";
export default {
  name: "MyView",
  components: {
    TabbarView,
  },
  methods: {
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
