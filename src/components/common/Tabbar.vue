<template>
  <div class="tabbar">
    <ul>
      <li
        v-for="(item, index) in routerList"
        :key="index"
        @click="switchTab(item.path)"
      >
        <img
          :src="$route.path.includes(item.path) ? item.selected : item.active"
          alt=""
        />
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabbarView",
  data() {
    return {
      routerList: [
        {
          title: "home",
          path: "/home",
          active: "/images/home.png",
          selected: "/images/selected.png",
        },
        {
          title: "list",
          path: "/list",
          active: "/images/list.png",
          selected: "/images/selected.png",
        },
        {
          title: "cart",
          path: "/cart",
          active: "/images/cart.png",
          selected: "/images/selected.png",
        },
        {
          title: "my",
          path: "/my",
          active: "/images/my.png",
          selected: "/images/selected.png",
        },
      ],
    };
  },
  methods: {
    switchTab(path) {
      // Determine if the same route is being clicked
      if (this.$route.path == path) return;
      // navigate to another page
      this.$router.replace(path);
    },
  },
};
</script>

<style scoped>
.tabbar {
  /*  position: fixed;
  left: 0;
  bottom: 0; */
  /*  z-index: 999; */
  width: 100%;
  height: 1.6rem;
  background-color: #fff3e2;
}
.tabbar ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
.tabbar ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabbar ul li img {
  width: 0.8rem;
  height: 0.8rem;
}
.tabbar ul li span {
  font-size: 16px;
  color: #e74646;
}
</style>
