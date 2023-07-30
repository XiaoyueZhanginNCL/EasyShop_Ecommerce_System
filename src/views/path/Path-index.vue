<template>
  <div class="path-index container">
    <HeaderView></HeaderView>
    <section>
      <ul>
        <li>
          <div>
            <span>Sharon</span>
            <span>7111111111</span>
          </div>
          <div>
            <span class="active">[default]</span>
            <span>Flat 141, Barrack Road, Newcastle, NE1 4SH</span>
          </div>
        </li>
      </ul>
      <div class="add-path">Add Address</div>
    </section>
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import HeaderView from "@/components/path/Header.vue";
import TabbarView from "@/components/common/Tabbar.vue";
export default {
  components: {
    HeaderView,
    TabbarView,
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
