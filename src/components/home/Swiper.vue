<template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <img :src="item.imgUrl" alt="" />
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "SwiperView",
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        options: {
          autoplay: 3000,
          speed: 1000,
        },
      },
    };
  },
  props: {
    swiperList: Array,
  },
};
</script>

<style scoped>
/* .swiper {
  margin-top: 1.5rem;
} */
.swiper img {
  width: 100%;
  height: 5rem;
}
</style>
