<template>
  <div class="order-status container">
    <header>
      <img @click="goBack" src="@/assets/images/left.png" alt="" />
      <slot>
        <span>{{ orderStatus }}</span>
      </slot>
    </header>
    <section>
      <div class="goods">
        <ul>
          <li v-for="(item, index) in itemList" :key="index">
            <div>
              <img src="/images/goods1.jpg" />
            </div>
            <div class="goods-content">
              <span>Order No:</span>
              <span>{{ item.order_id }}</span>
              <span>Delivered</span>
              <h4>{{ item.goods_name }}</h4>
              <div class="goods-total">
                <span>￡{{ item.goods_price }}</span>
                <span>Qty: {{ item.goods_num }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";

export default {
  name: "OrderStatus",
  components: {
    TabbarView,
  },
  data() {
    return {
      itemList: [], // 存储订单信息
      orderStatus: "",
    };
  },
  async created() {
    this.itemList = this.$route.query.item;
    if (this.$route.query.status == 2) {
      this.orderStatus = "Pending Shipment";
    } else if (this.$route.query.status == 1) {
      this.orderStatus = "All Orders";
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 1.173rem;
  background-color: #fff3e2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    width: 0.8rem;
    height: 0.8rem;
    position: relative;
    right: 4.5rem;
  }
  span {
    margin: 0;
    padding: 0;
    font-size: 0.555rem;
    color: #fa9884;
    position: absolute;
  }
}
section {
  background-color: #ffe5ca;
  .path-title {
    padding: 0.4rem;
    font-size: 0.4rem;
  }
  .goods {
    background-color: #fff;
    margin-top: 0.4rem;
    padding: 0.16rem 0.4rem;
    font-size: 0.4rem;
    ul {
      li {
        display: flex;
        padding: 0.1rem 0.2rem;
        img {
          width: 2rem;
          height: 2rem;
        }
        .goods-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 0.6rem;
          h4 {
            font-size: 0.48rem;
          }
          .goods-total {
            display: flex;
            justify-content: space-between;
            span:nth-child(2) {
              padding-left: 4.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
