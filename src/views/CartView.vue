<template>
  <div class="cart container">
    <header>
      <!--      <img src="../assets/images/left.png" v-show="false" /> -->
      <span class="title">shopping cart</span>
      <!--      <span
        class="edit"
        @click="isNavBar"
        v-text="isNavStatus ? 'done' : 'edit'"
        >edit</span
      > -->
    </header>
    <section>
      <div class="cart-title" v-if="cartNum">
        <van-checkbox v-model="isCheckedAll" @click="isCheckedAllFn">{{
          isCheckedAll
        }}</van-checkbox>
        <span>products</span>
      </div>
      <div v-if="!cartNum" class="empty">
        <h1>the shopping cart is empty !</h1>
      </div>
      <ul v-for="(item, index) in goodsList" :key="index">
        <li>
          <div class="check">
            <van-checkbox
              @click="checkItem(index)"
              v-model="item.checked"
            ></van-checkbox>
          </div>
          <h2 class="goods-image">
            <img :src="item.goods_imgUrl" />
          </h2>
          <div class="goods">
            <div class="goods-title">
              <span>{{ item.goods_name }}</span>
              <img
                src="../assets/images/delete.png"
                @click="delGoodsFn(item.id)"
              />
            </div>
            <div class="goods-price">￡{{ item.goods_price }}</div>
            <van-stepper
              @change="changeNum($event, item)"
              v-model="item.goods_num"
              integer
            />
          </div>
        </li>
      </ul>
    </section>
    <footer v-if="cartNum">
      <div class="radio">
        <van-checkbox v-model="isCheckedAll"></van-checkbox>
      </div>
      <!--      <div class="total" v-show="!isNavStatus"> -->
      <div class="total">
        <div>
          total <span class="total-active">{{ total.num }}</span> products
        </div>
        <div>
          <span>total:</span>
          <span class="total-active">￡{{ total.price }}</span>
        </div>
      </div>
      <!--      <div class="order" v-if="!isNavStatus">go to pay</div> -->
      <div class="order">go to pay</div>
      <!--      <div class="order" v-else @click="delGoodsFn">delete</div> -->
    </footer>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import http from "@/common/api.js";
import { mapState } from "vuex";
import TabbarView from "@/components/common/Tabbar.vue";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  name: "CartView",
  components: {
    TabbarView,
  },
  data() {
    return {
      // value: 1,
      goodsList: [], //返回的购物车里的数据
      selectList: [], //记录选中的购物车数据的id
      cartNum: true,
      // isNavStatus: false,
    };
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
    }),
    //计算购物车中的total
    total() {
      let total = {
        num: 0,
        price: 0,
      };
      this.goodsList.forEach((v) => {
        if (v.checked) {
          total.num += parseInt(v.goods_num);
          total.price += parseInt(v.goods_num) * parseInt(v.goods_price);
        }
      });
      return total;
    },
    //判断是否全选,返回一个布尔值
    isCheckedAll() {
      return this.goodsList.length == this.selectList.length;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    //修改商品数量
    changeNum(value, item) {
      //当前购物车商品的id以及修改后的数量--->后端
      let changedNum = value;
      let id = item.id;
      http
        .$axios({
          url: "/api/updateNum",
          method: "post",
          headers: {
            token: true,
          },
          data: {
            changedNum: changedNum,
            id: id,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    //删除购物车内容
    delGoodsFn(id) {
      if (this.selectList.length == 0) {
        Toast("Please select the product!");
      }
      let that = this.goodsList;
      MessageBox({
        title: "Notice",
        message: "Are you sure to move these items out of your cart?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(function (res) {
        if (res == "confirm") {
          //发送请求
          http
            .$axios({
              url: "/api/deleteCart",
              method: "post",
              data: {
                id,
              },
            })
            .then((res) => {
              that.splice(id, 1);
              location.reload();
              console.log(res);
            });
        }
        console.log(res);
      });
    },
    //点击编辑或完成
    // isNavBar() {
    //   this.isNavStatus = !this.isNavStatus;
    // },
    //单选
    checkItem(index) {
      let id = this.goodsList[index].id;
      let i = this.selectList.indexOf(id);
      //存在
      if (i > -1) {
        return this.selectList.splice(i, 1);
      }
      this.selectList.push(id);
    },
    //全不选
    unCheckAll() {
      this.goodsList.forEach((v) => {
        v.checked = false;
        this.selectList = [];
      });
    },
    //全选
    checkAll() {
      this.goodsList.forEach((v) => {
        v.checked = true;
        this.selectList.push(v.id);
      });
    },
    //执行全选或全不选的操作
    isCheckedAllFn() {
      let bool = this.isCheckedAll;
      if (!bool) {
        this.checkAll();
      } else {
        this.unCheckAll();
      }
    },
    async getData() {
      //未登录，跳转登陆界面
      if (!this.loginStatus) {
        this.$router.replace("/userLogin");
        return;
      }
      let res = await http.$axios({
        url: "api/selectCart",
        method: "POST",
        headers: {
          token: true,
        },
      });
      this.cartNum = res.status; //接收购物车是否有物品
      //初始化goodList中的checked
      if (this.cartNum) {
        res.data.forEach((v) => {
          v["checked"] = true;
        });
      }
      this.goodsList = res.data;
      //初始化selectList（默认全选）
      this.goodsList.forEach((v) => {
        this.selectList.push(v.id);
      });
      console.log(this.goodsList);
    },
  },
};
</script>
<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  height: 1.17rem;
  // color: #fff;
  background-color: #fff3e2;
  .title {
    font-size: 0.6rem;
    position: relative;
    left: 3.5rem;
  }
  .edit {
    font-size: 0.5rem;
    position: relative;
    left: 5.2rem;
  }
}
section {
  background-color: #ffe5ca;
  .cart-title {
    padding: 0.5rem;
    display: flex;
    span {
      padding: 0 0.4rem;
      font-weight: 500;
      font-size: 0.48rem;
    }
  }
  .empty {
    h1 {
      text-align: center;
      color: #fa9884;
      position: relative;
      top: 5rem;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      align-items: center;
      padding: 0.16rem 0.53rem;
      margin: 0.2rem 0;
      background-color: #fff;
      .goods-image img {
        width: 2.5rem;
        height: 2.5rem;
      }
      .check {
        padding-right: 0.37rem;
      }
      .goods {
        display: flex;
        flex-direction: column;
        padding-left: 0.4rem;
        font-size: 0.32rem;
        .goods-title {
          display: flex;
          img {
            width: 0.5rem;
            height: 0.5rem;
            position: relative;
            left: 2.7rem;
          }
        }
        .goods-price {
          padding: 0.08rem 0;
          color: #e74646;
        }
        ::v-deep .van-stepper {
          text-align: right;
          position: relative;
          left: 2.7rem;
        }
      }
      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.5rem;
  border-top: 0.05rem solid #ccc;
  border-bottom: 0.05rem solid #ccc;
  background-color: #fff3e2;
  .radio {
    padding: 0 0.4rem;
  }
  .total {
    flex: 1;
    font-size: 0.5rem;
    .total-active {
      color: #e74646;
    }
  }
  .order {
    height: 1.5rem;
    width: 3.2rem;
    text-align: center;
    font-size: 0.5rem;
    background-color: #fa9884;
  }
}
</style>
