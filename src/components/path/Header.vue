<template>
  <header>
    <img src="@/assets/images/left.png" alt="" />
    <slot>
      <span>My Address</span>
    </slot>
  </header>
</template>

<script>
export default {
  name: "HeaderView",
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 1.173rem;
  background-color: #fff3e2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    width: 0.8rem;
    height: 0.8rem;
    position: relative;
    right: 4.5rem;
  }
  span {
    margin: 0;
    padding: 0;
    font-size: 0.555rem;
    color: #fa9884;
    position: absolute;
  }
}
</style>
