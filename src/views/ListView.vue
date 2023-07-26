<template>
  <div class="list">
    <!--    <HeaderView></HeaderView> -->
    <header>
      <div class="returns">
        <img src="@/assets/images/left.png" />
      </div>
      <div class="search-main">
        <span>search what you like...</span>
      </div>
      <div class="search-btn">
        <img src="@/assets/images/search.png" alt="" />
      </div>
    </header>
    <section>
      <div class="list-l" ref="left">
        <ul class="l-item">
          <li
            :class="{ active: index == currentIndex }"
            v-for="(item, index) in leftData"
            :key="index"
            @click="goScroll(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="list-r" ref="right">
        <div>
          <ul class="shop-list" v-for="(item, index) in rightData" :key="index">
            <li v-for="(k, i) in item" :key="i">
              <h2>{{ k.name }}</h2>
              <ul class="r-content">
                <li v-for="(j, idx) in k.list" :key="idx">
                  <img :src="j.imgUrl" />
                  <span>{{ j.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";
import http from "@/common/api.js";
import BetterScroll from "better-scroll";
// import HeaderView from "@/components/search/Header.vue";
export default {
  name: "ListView",
  components: {
    TabbarView,
    // HeaderView,
  },
  computed: {
    currentIndex() {
      return this.allHeight.findIndex((item, index) => {
        return this.scrollY >= item && this.scrollY < this.allHeight[index + 1];
      });
    },
  },
  data() {
    return {
      leftData: [], //左侧的数据
      rightData: [], //右侧的数据
      rightBScroll: "", //右侧滑动的betterscroll
      allHeight: [], //右侧板块的高度值
      scrollY: "", //右侧滚动距离
    };
  },
  async created() {
    let res = await http.$axios({
      url: "/api/goods/list",
    });

    let leftArr = [];
    let rightArr = [];

    res.forEach((v) => {
      leftArr.push({
        id: v.id,
        name: v.name,
      });
      rightArr.push(v.data);
    });

    this.leftData = leftArr;
    this.rightData = rightArr;

    this.$nextTick(() => {
      //左侧滑动
      new BetterScroll(this.$refs.left, {
        click: true,
        probeType: 3,
      });
      //右侧滑动
      this.rightBScroll = new BetterScroll(this.$refs.right);

      //统计右侧板块高度值
      let height = 0;
      this.allHeight.push(height);

      //获取右侧每一板块的高度
      let uls = this.$refs.right.getElementsByClassName("shop-list");
      //把dom对象转换为数组
      Array.from(uls).forEach((v) => {
        height += v.clientHeight;
        this.allHeight.push(height);
      });
      //得到右侧滚动的值
      this.rightBScroll.on("scroll", (pos) => {
        this.scrollY = Math.abs(pos.y);
      });
    });
  },
  methods: {
    goScroll(index) {
      this.rightBScroll.scrollTo(0, -this.allHeight[index], 300);
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles.scss";
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.17rem;
  background-color: #fff3e2;
  .returns {
    img {
      width: 0.8rem;
      height: 0.8rem;
      padding-left: 0.2rem;
      position: relative;
      top: 0.1rem;
    }
  }
  .search-main {
    padding: 0 0.26rem;
    width: 7rem;
    position: relative;
    right: 0.4rem;
    background-color: #fff;
    border-radius: 12px;
    span {
      font-size: 0.5rem;
      color: #666;
      flex: 1;
    }
  }
  .search-btn {
    img {
      width: 0.5rem;
      height: 0.5rem;
      position: relative;
      right: 0.5rem;
    }
  }
}
section {
  display: flex;
  flex: 1;
  overflow: hidden;
  .list-l {
    width: 2.48rem;
    background-color: #ffe5ca;
    border-right: 1px solid #ccc;
    overflow: hidden;
    .l-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      li {
        width: 100%;
        padding: 0.08rem 0;
        margin: 0.5rem 0;
        text-align: center;
        font-size: 0.37rem;
        // &.active {
        //   color: #e74646;
        //   border-left: 6px solid #e74646;
        // }
      }
    }
  }
  .list-r {
    flex: 1;
    overflow: hidden;
    .shop-list {
      text-align: center;
      h2 {
        padding: 0.5rem 0;
        font-size: 0.55rem;
        font-weight: 400;
        color: #e74646;
      }
      .r-content {
        display: flex;
        flex-wrap: wrap;
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 33.33%;
          padding: 0.26rem 0;
          img {
            width: 1.5rem;
            height: 1.5rem;
          }
          span {
            font-size: 0.4rem;
          }
        }
      }
    }
  }
}
::v-deep.tabbar {
  border-top: 1px solid #ccc;
}
</style>
