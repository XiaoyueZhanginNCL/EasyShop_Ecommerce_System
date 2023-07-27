<template>
  <div class="cart container">
    <header>
      <img src="../assets/images/left.png" />
      <span>shopping cart</span>
      <span>edit</span>
    </header>
    <section>
      <div class="cart-title">
        <van-checkbox v-model="checked"></van-checkbox>
        <span>products</span>
      </div>
      <ul>
        <li>
          <div class="check">
            <van-checkbox v-model="checked"></van-checkbox>
          </div>
          <h2 class="goods-image">
            <img src="../assets/images/recommend2.jpg" />
          </h2>
          <div class="goods">
            <div class="goods-title">
              <span>bag for women</span>
              <img src="../assets/images/delete.png" />
            </div>
            <div class="goods-price">￡128.00</div>
            <van-stepper v-model="value" integer />
          </div>
        </li>
        <li>
          <div class="check">
            <van-checkbox v-model="checked"></van-checkbox>
          </div>
          <h2 class="goods-image">
            <img src="../assets/images/recommend2.jpg" />
          </h2>
          <div class="goods">
            <div class="goods-title">
              <span>bag for women</span>
              <img src="../assets/images/delete.png" />
            </div>
            <div class="goods-price">￡128.00</div>
            <van-stepper v-model="value" integer />
          </div>
        </li>
        <li>
          <div class="check">
            <van-checkbox v-model="checked"></van-checkbox>
          </div>
          <h2 class="goods-image">
            <img src="../assets/images/recommend2.jpg" />
          </h2>
          <div class="goods">
            <div class="goods-title">
              <span>bag for women</span>
              <img src="../assets/images/delete.png" />
            </div>
            <div class="goods-price">￡128.00</div>
            <van-stepper v-model="value" integer />
          </div>
        </li>
      </ul>
    </section>
    <footer>
      <div class="radio">
        <van-checkbox v-model="checked"></van-checkbox>
      </div>
      <div class="total">
        <div>total <span class="total-active">1</span> products</div>
        <div>
          <span>total:</span>
          <span class="total-active">￡128.00</span>
        </div>
      </div>
      <div class="order">go to pay</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "CartView",
  components: {},
  data() {
    return {
      checked: true,
    };
  },
};
</script>
<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.17rem;
  // color: #fff;
  background-color: #fff3e2;
  img {
    width: 0.7rem;
    height: 0.7rem;
  }
  span {
    font-size: 0.5rem;
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
