<template>
  <div class="search-list">
    <header>
      <HeaderView></HeaderView>
      <div>
        <ul>
          <li
            v-for="(item, index) in searchList.data"
            :key="index"
            @click="changeTab(index)"
          >
            <div :class="searchList.currentIndex == index ? 'active' : ''">
              {{ item.name }}
            </div>
            <div class="search-filter" v-if="index != 0">
              <img
                :src="
                  item.status == 1 ? '/images/upselected.png' : '/images/up.png'
                "
              />
              <img
                :src="
                  item.status == 2
                    ? '/images/downselected.png'
                    : '/images/down.png'
                "
              />
            </div>
          </li>
          <!-- <li>
            <div>general</div>
          </li>
          <li>
            <div>price</div>
            <div class="search-filter">
              <img src="../../assets/images/up.png" />
              <img src="../../assets/images/down.png" />
            </div>
          </li>
          <li>
            <div>sales</div>
            <div class="search-filter">
              <img src="../../assets/images/up.png" />
              <img src="../../assets/images/down.png" />
            </div>
          </li> -->
        </ul>
      </div>
    </header>
    <section>
      <div v-if="goodsList.length">
        <ul>
          <li v-for="(item, index) in goodsList" :key="index">
            <img v-lazy="item.imgUrl" />
            <h3>{{ item.name }}</h3>
            <div class="price">
              <div>
                <span>￡</span>
                <b>{{ item.price }}</b>
              </div>
              <div>pay</div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>No matching search results.</div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import HeaderView from "@/components/search/Header.vue";
import TabbarView from "@/components/common/Tabbar.vue";
import http from "@/common/api.js";
export default {
  name: "SearchList",
  data() {
    return {
      goodsList: [],
      searchList: {
        currentIndex: 0,
        data: [
          //status记录箭头状态 0是没有 1是上箭头 2是下箭头
          { name: "general", key: "zh" },
          { name: "price", status: 0, key: "price" },
          { name: "sales", status: 0, key: "num" },
        ],
      },
    };
  },
  computed: {
    orderBy() {
      //知道是哪一个对象
      let obj = this.searchList.data[this.searchList.currentIndex];
      //获取对象的status
      let val = obj.status == 1 ? "asc" : "desc";
      return {
        [obj.key]: val,
      };
    },
  },
  components: {
    TabbarView,
    HeaderView,
  },
  created() {
    console.log("created", this.$route.query.key);
    this.getData();
  },
  methods: {
    //从数据库中拿到数据进行渲染
    getData() {
      http
        .$axios({
          url: "/api/goods/shopList",
          params: {
            searchName: this.$route.query.key,
            ...this.orderBy,
          },
        })
        .then((res) => {
          this.goodsList = res;
        });
    },
    changeTab(index) {
      this.searchList.currentIndex = index;
      //当前数据
      let item = this.searchList.data[index];
      //改变其余状态值都为0
      this.searchList.data.forEach((v, i) => {
        if (i !== index) {
          v.status = 0;
        }
      });
      //切换上下箭头亮
      if (index == this.searchList.currentIndex) {
        item.status = item.status == 1 ? 2 : 1;
      }
      //发送请求进行数据渲染
      this.getData();
    },
  },
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles.scss";
.search-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
header ul {
  display: flex;
  justify-content: space-around;
  padding: 0.2rem 0;
  font-size: 12px;
}
header ul li {
  display: flex;
  align-items: center;
}
header ul li > div {
  padding: 0 0.08rem;
}
header ul li .search-filter {
  display: flex;
  flex-direction: column;
}
header ul img {
  width: 0.25rem;
  height: 0.25rem;
}
section {
  flex: 1;
  overflow: hidden;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 50%;
      padding: 0.2rem;
    }
  }
}

section ul li h3 {
  font-size: 14px;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #222;
  font-weight: 400;
}
section ul li img {
  width: 150px;
}
section ul li img[lazy="loading"] {
  background-color: #f7f7f7;
}
section ul li .price {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  width: 100%;
  padding: 0.2rem 0;
}
section ul li .price div:first-child span {
  font-size: 0.32rem;
  color: #e74646;
}
section ul li .price div:first-child b {
  color: #e74646;
  font-size: 0.4rem;
}
section ul li .price div:last-child {
  color: #fff;
  background-color: #e74646;
  padding: 0.08rem 0.16rem;
  border-radius: 0.16rem;
}
.active {
  color: #e74646;
}
</style>
