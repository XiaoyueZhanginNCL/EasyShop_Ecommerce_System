import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/list",
    name: "ListView",
    component: () => import("../views/ListView.vue"),
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
  },
  {
    path: "/my",
    name: "MyView",
    component: () => import("../views/MyView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
