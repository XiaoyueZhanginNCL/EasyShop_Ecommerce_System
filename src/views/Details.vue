<template>
  <div class="details">
    <header>
      <div class="header-return" v-show="isShow">
        <div @click="goBack">
          <img src="../assets/images/left.png" />
        </div>
      </div>
      <div class="header-bar" v-show="!isShow">
        <div @click="goBack">
          <img src="../assets/images/left.png" />
        </div>
        <div>
          <span>details</span>
          <span>comments</span>
        </div>
      </div>
    </header>

    <section ref="wrapper">
      <div>
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in swiperArr" :key="index">
              <img :src="item" alt="" />
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </swiper>
        </div>

        <div class="goods-name">
          <h1>{{ goods.name }}</h1>
          <div>{{ goods.content }}</div>
        </div>

        <div class="goods-price">
          <div class="oprice">
            <span>￡</span>
            <b>{{ goods.price }}</b>
          </div>
          <div class="pprice">
            <span>price:</span>
            <del>￡{{ goods.previousPrice }}</del>
          </div>
        </div>
        <div>
          <img
            style="width: 100%; height: 450px"
            src="http://localhost:8080/images/details.jpg"
          />
          <img
            style="width: 100%; height: 400px"
            src="http://localhost:8080/images/details4.jpg"
          />
          <img
            style="width: 100%; height: 400px"
            src="http://localhost:8080/images/details2.jpg"
          />
          <img
            style="width: 100%; height: 800px"
            src="http://localhost:8080/images/details3.jpg"
          />
        </div>
      </div>
    </section>

    <footer>
      <div class="support-cell" @click="goSupport">
        <img src="../assets/images/support.png" />
        <!--        <a @click="openWhatsApp" href="#">support</a> -->
        Support
      </div>
      <div class="collect-cell">
        <img src="../assets/images/collect.png" />
        Collect
      </div>
      <div class="add" @click="addCart"><span>Add to Cart</span></div>
      <div class="pay"><span>Buy Now</span></div>
    </footer>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { Toast } from "mint-ui";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import BetterScroll from "better-scroll";
import http from "@/common/api.js";
export default {
  name: "DetailsView",
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      BetterScroll: "",
      goods: {},
      isShow: true,
      swiperOption: {
        options: {
          autoplay: 3000,
          speed: 1000,
        },
      },
      // swiperList: [
      //   {
      //     imgUrl: "/images/goods2.jpg",
      //   },
      //   {
      //     imgUrl: "/images/goods2-list1.jpg",
      //   },
      //   {
      //     imgUrl: "/images/goods2-list2.jpg",
      //   },
      //   {
      //     imgUrl: "/images/goods2-list3.jpg",
      //   },
      //   {
      //     imgUrl: "/images/goods2-list4.jpg",
      //   },
      // ],
      swiperArr: [],
    };
  },
  mounted() {
    this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
      probeType: 3,
      bounce: false, //防止滑动回弹
      movable: true,
      zoom: true,
      click: true,
    });
    this.BetterScroll.on("scroll", (pos) => {
      let posY = Math.abs(pos.y);

      if (posY >= 50) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    });
  },
  methods: {
    // openWhatsApp() {
    //   // 定义弹出窗口的宽度和高度
    //   const width = 600;
    //   const height = 400;

    //   // 计算窗口的左上角位置，使其居中
    //   const left = (window.innerWidth - width) / 2;
    //   const top = (window.innerHeight - height) / 2;

    //   // 定义窗口属性
    //   const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;

    //   // 构建 WhatsApp 链接
    //   const whatsappLink = `https://web.whatsapp.com/`;

    //   // 在新窗口中打开 WhatsApp
    //   window.open(whatsappLink, "_blank", windowFeatures);
    // },
    goSupport() {
      this.$router.push("/support");
    },
    async getData() {
      let id = this.$route.query.id;
      let res = await http.$axios({
        url: "api/goods/id",
        params: {
          id,
        },
      });
      this.goods = res;
      let imgArr = res.imgUrlArr;
      this.swiperArr = imgArr.split(",");
    },
    //加入购物车
    addCart() {
      let id = this.$route.query.id;
      http
        .$axios({
          url: "api/addCart",
          method: "POST",
          data: {
            goodsId: id,
          },
          headers: {
            token: true,
          },
        })
        .then((res) => {
          if (res.status) {
            Toast(res.msg);
          }
        });
    },
    goBack() {
      this.$router.back();
    },
  },
  created() {
    this.getData();
    console.log(this.$route.query.id);
  },
};
</script>

<style scoped lang="scss">
.details {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 1.173rem;
  .header-return {
    width: 100%;
    height: 1.173rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      padding: 0.26rem;
    }
  }
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: 1.173rem;
    font-size: 0.4rem;
    img {
      width: 1rem;
      height: 1rem;
      padding: 0.26rem;
    }
    span {
      padding: 0 0.26rem;
    }
  }
}
section {
  flex: 1;
  overflow: hidden;
}
.swiper img {
  width: 100%;
  height: 9rem;
}
.goods-name {
  padding: 0.53rem 0.26rem;
  border-bottom: 1px solid #ccc;
  h1 {
    font-size: 0.5rem;
    font-weight: 500;
  }
  div {
    padding: 0.08rem 0;
    font-size: 0.3rem;
    color: #999;
  }
}
.goods-price {
  padding: 0.53rem 0.26rem;
  .oprice {
    color: #e74646;
    span {
      font-size: 0.32rem;
    }
  }
  .pprice {
    color: #999;
    font-size: 0.37rem;
  }
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.3rem;
  border-top: 1px solid #ccc;
  .support-cell {
    width: 20%;
    text-align: center;
    font-size: 0.2rem;
    img {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
  .collect-cell {
    width: 20%;
    text-align: center;
    font-size: 0.2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
  .add {
    width: 30%;
    height: 100%;
    text-align: center;
    background-color: #fa9884;
  }
  .pay {
    width: 30%;
    height: 100%;
    text-align: center;
    background-color: #e74646;
  }
}
</style>
