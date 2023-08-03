<template>
  <div class="order container">
    <header>
      <img src="@/assets/images/left.png" alt="" />
      <slot>
        <span>Submit Order</span>
      </slot>
    </header>
    <section>
      <div class="path">
        <h3 class="path-title">Delivery address</h3>
        <div class="path-content" @click="goPath">
          <div>
            <span>{{ path.name }}</span>
            <span>{{ path.tel }}</span>
          </div>
          <div>
            <span>{{ path.address }}</span>
          </div>
        </div>
      </div>
      <div class="payment">
        <div class="payment-title">Payment method</div>
        <van-radio-group v-model="radioPayment">
          <van-radio name="1">1</van-radio>
          <van-radio name="2">2</van-radio>
        </van-radio-group>
      </div>
      <div class="goods">
        <ul>
          <li v-for="(item, index) in itemList" :key="index">
            <div>
              <img :src="item.goods_imgUrl" />
            </div>
            <div class="goods-content">
              <h4>{{ item.goods_name }}</h4>
              <div class="goods-total">
                <span>￡{{ item.goods_price }}</span>
                <span>Qty:{{ item.goods_num }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <div>
        <span>Subtotal </span>
        <b>{{ totalVuex.num }} </b>
        <span>items:</span>
        <b>￡{{ totalVuex.price }}</b>
      </div>
      <div class="pay">
        <span @click="goPay">Proceed to Checkout</span>
      </div>
    </footer>
  </div>
</template>

<script>
import http from "@/common/api.js";
import { Toast } from "mint-ui";
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
  name: "OrderView",
  data() {
    return {
      radioPayment: "1",
      path: {},
      itemList: [],
    };
  },
  computed: {
    ...mapState({
      totalVuex: (state) => state.cart.totalVuex, //可以用localStorage.getItem("orderId")然后查询数据库中的订单表得到total数据
      selectVuex: (state) => state.cart.selectVuex, //可以在cart页面中得到selectList的详细内容数组，然后在跳转页面发送请求时通过this.$router.query进行传递（路径传值记得用JSON解析）
      orderId: (state) => state.order.orderId,
    }),
    ...mapGetters(["defaultPath"]),
  },
  created() {
    console.log(this.orderId);
    //获取商品数据
    http
      .$axios({
        url: "/api/orderItem",
        method: "post",
        data: {
          id: this.selectVuex,
        },
      })
      .then((res) => {
        this.itemList = res.Arr;
        // console.log("11111", this.itemList);
      });
    // console.log(localStorage.getItem("orderId"));

    //查询地址数据
    if (this.$route.query.type == "select") {
      this.path = JSON.parse(this.$route.query.data);
      console.log("999", JSON.parse(this.$route.query.data));
      console.log("10", this.path);
      return;
    }
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
        //有默认收货地址
        if (this.defaultPath.length) {
          this.path = this.defaultPath[0];
        } else {
          this.path = res.data[0];
        }
      });
  },
  methods: {
    ...mapMutations(["INIT_DATA"]),
    //选择收货地址
    goPath() {
      this.$router.push({
        path: "/path",
        query: {
          type: "select",
        },
      });
    },
    //提交订单
    goPay() {
      //判断是否选择了收货地址
      if (!this.path) return Toast("Please fill in the delivery address");
      //发送请求===>1. 修改订单状态 2. 删除购物车数据
      http
        .$axios({
          url: "/api/submitOrder",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            orderId: localStorage.getItem("orderId"),
            shopArr: this.itemList,
          },
        })
        .then((res) => {
          console.log(res);
        });
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
  .path-content {
    padding: 0.4rem;
    font-size: 0.37rem;
    background-color: #fff;
    span {
      padding-right: 0 0.16rem;
    }
  }
  .payment {
    background-color: #fff;
    margin-top: 0.4rem;
    padding: 0.16rem 0.4rem;
    font-size: 0.4rem;
    .van-radio-group {
      display: flex;
      padding: 0.16rem 0;
      .van-radio {
        padding-right: 0.26rem;
      }
    }
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
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 1.5rem;
  font-size: 0.5rem;
  border-top: solid 0.1px #ccc;
  .pay {
    span {
      font-size: 0.43rem;
      padding: 0.5rem 0.1rem;
      background-color: #fa9884;
      color: #fff;
    }
  }
}
</style>
