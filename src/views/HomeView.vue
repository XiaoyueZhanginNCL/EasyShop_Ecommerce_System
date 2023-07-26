<template>
  <div class="home">
    <div class="headers">
      <div class="header-main">
        <HeaderView></HeaderView>
      </div>
    </div>
    <section class="wrapper">
      <div>
        <div v-for="(item, index) in newData" :key="index">
          <SwiperView
            v-if="item.type == 'swiperList'"
            :swiperList="item.data"
          ></SwiperView>
          <IconsView
            v-if="item.type == 'iconsList'"
            :iconsList="item.data"
          ></IconsView>
          <RecView
            v-if="item.type == 'recommendList'"
            :recommendList="item.data"
          ></RecView>
          <LikeView
            v-if="item.type == 'likeList'"
            :likeList="item.data"
          ></LikeView>
        </div>
      </div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";
import HeaderView from "@/components/home/Header.vue";
import IconsView from "@/components/home/Icons.vue";
import SwiperView from "@/components/home/Swiper.vue";
import RecView from "@/components/home/Recommend.vue";
import BetterScroll from "better-scroll";
import LikeView from "@/components/home/Like.vue";
import http from "@/common/api.js";
export default {
  name: "HomeView",
  data() {
    return {
      newData: [],
    };
  },
  components: {
    TabbarView,
    HeaderView,
    IconsView,
    SwiperView,
    RecView,
    LikeView,
  },
  created() {
    this.getData();
  },
  // mounted() {
  //   new BetterScroll(".wrapper", {
  //     movable: true,
  //     zoom: true,
  //   });
  // },
  methods: {
    async getData() {
      let res = await http.$axios({
        url: "api/home",
      });

      //     let res = await axios({
      //       url: "api/home",
      //     });
      this.newData = Object.freeze(res.data);

      //execute when DOM is all loaded
      this.$nextTick(() => {
        new BetterScroll(".wrapper", {
          movable: true,
          zoom: true,
          click: true,
        });
      });
    },
  },
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ffe5ca;
}
.headers {
  height: 1.5rem;
}
.headers-main {
  position: fixed;
  left: 0;
  top: 0;
}
section {
  flex: 1;
  overflow: hidden;
}
</style>
