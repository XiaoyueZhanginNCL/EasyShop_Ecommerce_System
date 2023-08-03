<template>
  <div class="path-index container">
    <HeaderView></HeaderView>
    <section>
      <ul v-if="list.length != 0">
        <li v-for="(item, index) in list" :key="index" @click="goList(item)">
          <div>
            <span>{{ item.name }}</span>
            <span>{{ item.tel }}</span>
          </div>
          <div>
            <span class="active" v-if="item.isDefault == 0">[default]</span>
            <span>{{ item.address }}</span>
          </div>
        </li>
      </ul>
      <h1 v-else>Please add address information</h1>
      <div class="add-path" @click="goList('add')">Add Address</div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import HeaderView from "@/components/path/Header.vue";
import TabbarView from "@/components/common/Tabbar.vue";
import http from "@/common/api.js";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    HeaderView,
    TabbarView,
  },
  data() {
    return {
      pathStatus: false,
    };
  },
  created() {
    //从订单页面进来的
    if (this.$route.query.type == "select") {
      this.pathStatus = true;
    }

    this.getData();
  },
  computed: {
    ...mapState({
      list: (state) => state.path.list,
    }),
  },
  methods: {
    ...mapMutations(["INIT_DATA"]),
    getData() {
      http
        .$axios({
          url: "/api/address",
          method: "post",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          this.INIT_DATA(res.data);
        });
    },
    //添加地址或编辑地址
    goList(option) {
      //从订单页面进入来选择
      if (this.pathStatus) {
        this.$router.push({
          path: "/order",
          query: {
            type: "select",
            data: JSON.stringify(option),
          },
        });
        return;
      }

      this.$router.push({
        name: "PathList",
        params: {
          key: option,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffe5ca;
  ul {
    width: 100%;
    li {
      padding: 0.26rem 0.4rem;
      margin: 0.5rem 0;
      background-color: #fff;
      span {
        padding-right: 0.4rem;
        font-size: 0.45rem;
      }
      .active {
        color: #e74646;
      }
    }
  }
  h1 {
    color: #fa9884;
    padding: 2.5rem 0.5rem;
    text-align: center;
  }
  .add-path {
    margin-top: 0.8rem;
    width: 3.2rem;
    line-height: 1.06rem;
    font-size: 0.48rem;
    text-align: center;
    color: #fff;
    background-color: #fa9884;
    border-radius: 6px;
  }
}
</style>
