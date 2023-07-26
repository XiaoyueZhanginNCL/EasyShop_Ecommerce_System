<template>
  <header>
    <div @click="goBack">
      <img src="../../assets/images/left.png" />
    </div>
    <div>
      <slot>
        <span>Login</span>
      </slot>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderView",
  methods: {
    goBack() {
      this.$router.back();
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
  height: 1.2rem;
  background-color: #fff3e2;
  img {
    width: 0.7rem;
    height: 0.7rem;
    position: relative;
    top: 0.1rem;
    right: 3.5rem;
  }
  span {
    font-size: 0.5rem;
    color: #fa9884;
    margin-right: 0.7rem;
  }
}
</style>
