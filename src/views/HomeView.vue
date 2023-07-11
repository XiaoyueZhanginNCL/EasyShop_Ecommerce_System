<template>
  <div class="home">
    <div class="headers">
      <div class="header-main">
        <HeaderView></HeaderView>
      </div>
    </div>
    <section class="wrapper">
      <div>
        <SwiperView></SwiperView>
        <IconsView></IconsView>
        <RecView></RecView>
        <LikeView></LikeView>
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
export default {
  name: "HomeView",
  components: {
    TabbarView,
    HeaderView,
    IconsView,
    SwiperView,
    RecView,
    LikeView,
  },
  mounted() {
    new BetterScroll(".wrapper", {
      movable: true,
      zoom: true,
    });
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
