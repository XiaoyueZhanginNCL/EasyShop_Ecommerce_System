<template>
  <div class="search-index">
    <HeaderView></HeaderView>
    <section>
      <div class="search-history" v-if="searchArr.length">
        <img src="@/assets/images/time.png" />
        <h2>history</h2>
        <h2><span @click="deleteStorage">delete</span></h2>
        <ul v-for="(item, index) in searchArr" :key="index">
          <li @click="goSearch(item)">{{ item }}</li>
        </ul>
      </div>
      <div v-else>no search history...</div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";
import HeaderView from "@/components/search/Header.vue";
import { MessageBox } from "mint-ui";
export default {
  name: "SearchIndex",
  components: {
    TabbarView,
    HeaderView,
  },
  data() {
    return {
      searchArr: [],
    };
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem("searchList")) || [];
  },
  methods: {
    deleteStorage() {
      const that = this;
      MessageBox({
        title: "Notice",
        message: "Are you sure to delete?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(function (res) {
        if (res == "confirm") {
          //删除本地存储并刷新页面
          localStorage.removeItem("searchList");
          that.searchArr = [];
          // location.reload();
        }
        console.log(res);
      });
    },
    goSearch(item) {
      this.$router.push({
        name: "SearchList", //or path:url
        query: {
          key: item,
        },
      });
    },
  },
};
</script>

<style scoped>
.search-index {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
section {
  flex: 1;
  overflow: hidden;
}
.search-history {
  display: flex;
  flex-direction: column;
}
.search-history h2 {
  padding: 0.53rem;
  font-weight: 400;
  font-size: 0.48rem;
  position: relative;
  left: 0.6rem;
}
.search-history h2 span {
  font-weight: 400;
  font-size: 0.48rem;
  position: absolute;
  right: 1.5rem;
  top: -1.16rem;
}
.search-history img {
  width: 0.5rem;
  height: 0.5rem;
  padding-right: 0.08rem;
  position: relative;
  top: 1.3rem;
  margin-left: 0.48rem;
}
.search-history ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.26rem;
  position: relative;
  top: -1rem;
}
.search-history ul li {
  margin: 0.26rem;
  padding: 0.08rem 0.16rem;
  font-size: 0.37rem;
  border: 1px solid #ccc;
  border-radius: 12px;
}
</style>
