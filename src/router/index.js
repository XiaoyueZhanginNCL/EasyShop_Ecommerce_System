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
  {
    path: "/search",
    name: "SearchView",
    children: [
      {
        path: "/",
        name: "SearchIndex",
        component: () => import("../views/search/Search-index.vue"),
      },
      {
        path: "list",
        name: "SearchList",
        component: () => import("../views/search/Search-list.vue"),
      },
    ],
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: "/details",
    name: "DetailsView",
    component: () => import("../views/Details.vue"),
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/login/LoginView.vue"),
  },
  {
    path: "/userLogin",
    name: "UserLogin",
    component: () => import("../views/login/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "RegisterView",
    component: () => import("../views/login/Register.vue"),
  },
  {
    path: "/path",
    name: "PathView",
    children: [
      {
        path: "/",
        name: "PathIndex",
        component: () => import("../views/path/Path-index.vue"),
      },
    ],
    component: () => import("../views/PathView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
