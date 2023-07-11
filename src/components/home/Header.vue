<template>
  <header>
    <!--    <h1>
      <img src="@/assets/images/fruit.png" alt="" />
    </h1> -->
    <div class="search">
      <img src="@/assets/images/search.png" alt="" />
      <span>search items...</span>
    </div>
    <div class="chat">
      <img src="@/assets/images/chat.png" alt="" />
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderView",
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*  position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: 1.5rem;
  background-color: #fff3e2;
}
/* header h1 img {
  width: 1.1rem;
  height: 1.1rem;
  padding-left: 0.3rem;
} */
.search {
  display: flex;
  align-items: center;
  width: 8.3rem;
  height: 0.8rem;
  margin-left: 0.3rem;
  background-color: #ffffff;
  border-radius: 12px;
}
.search img {
  width: 0.5rem;
  height: 0.5rem;
  color: #ccc;
  padding-left: 0.2rem;
}
.search span {
  color: #ccc;
  font-size: 0.5rem;
  padding-left: 0.2rem;
}
.chat img {
  width: 0.8rem;
  height: 0.8rem;
  padding-right: 0.3rem;
}
</style>
