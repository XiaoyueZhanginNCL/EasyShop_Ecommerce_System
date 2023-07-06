<template>
  <div class="home">
    <HeaderView></HeaderView>
    this is homepage
    <TabbarView></TabbarView>
  </div>
</template>

<script>
import TabbarView from "@/components/common/Tabbar.vue";
import HeaderView from "@/components/home/Header.vue";
export default {
  name: "HomeView",
  components: {
    TabbarView,
    HeaderView,
  },
};
</script>
