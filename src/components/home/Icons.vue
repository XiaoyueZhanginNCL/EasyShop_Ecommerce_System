<template>
  <ul class="icons">
    <li v-for="(item, index) in iconsList" :key="index">
      <img :src="item.imgUrl" alt="" />
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "IconsView",
  props: {
    iconsList: Array,
  },
  data() {
    return {
      // iconsList: [
      //   {
      //     id: 1,
      //     title: "Fashion",
      //     imgUrl: "./images/clothes.png",
      //   },
      //   {
      //     id: 2,
      //     title: "Digital Devices",
      //     imgUrl: "./images/shopping.png",
      //   },
      //   {
      //     id: 3,
      //     title: "School Season",
      //     imgUrl: "./images/ecommerce.png",
      //   },
      //   {
      //     id: 4,
      //     title: "Finance",
      //     imgUrl: "./images/delivery.png",
      //   },
      // ],
    };
  },
};
</script>

<style scoped>
.icons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 0rem;
  left: 0;
  width: 100%;
  height: 2.7rem;
  background-color: #ffe5ca;
}
.icons li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icons li img {
  width: 1.5rem;
  height: 1.5rem;
}
.icons span {
  font-size: 12px;
}
</style>
