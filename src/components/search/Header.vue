<template>
  <header>
    <div class="search-return" @click="goBack">
      <img src="@/assets/images/left.png" alt="" />
    </div>
    <div class="search-main">
      <form action="" onsubmit="return false">
        <input
          type="search"
          placeholder="search..."
          @keyup.enter="goSearch"
          v-model="searchVal"
        />
      </form>
    </div>
    <div class="search-btn" @click="goSearch">
      <img src="@/assets/images/search.png" alt="" />
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderView",
  data() {
    return {
      searchVal: this.$route.query.key || "", //当前用户输入内容
      searchArr: [], //存储历史搜索内容
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goSearch() {
      //输入为空
      if (!this.searchVal) return;
      //判断之前有没有本地存储
      if (!localStorage.getItem("searchList")) {
        //没有，则设置一个
        localStorage.setItem("searchList", "[]");
      } else {
        //有，转换为数组拿出来
        this.searchArr = JSON.parse(localStorage.getItem("searchList"));
      }

      //存储搜索内容，去重
      this.searchArr.unshift(this.searchVal);
      let Arr = [...new Set(this.searchArr)];
      //存储到本地数据中
      localStorage.setItem("searchList", JSON.stringify(Arr));

      //如果输入的内容一致，则不跳转页面
      if (this.searchVal == this.$route.query.key) return;

      //跳转页面
      this.$router.push({
        name: "SearchList", //or path:url
        query: {
          key: this.searchVal,
        },
      });
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.17rem;
  background-color: #fff3e2;
}
.search-return img {
  width: 0.8rem;
  height: 0.8rem;
  padding-left: 0.2rem;
  position: relative;
  top: 0.1rem;
}
.search-main {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  width: 7.3rem;
  height: 0.8rem;
  position: relative;
  left: -0.5rem;
}
/* .search-main img {
  width: 0.5rem;
  height: 0.5rem;
  padding-left: 0.3rem;
} */
.search-main input {
  width: 6rem;
  /*  height: 0.8rem; */
  border: 0px;
  box-shadow: none;
  outline: none;
  margin-left: 0.4rem;
}
.search-btn img {
  width: 0.5rem;
  height: 0.5rem;
  position: relative;
  right: 0.5rem;
}
</style>
