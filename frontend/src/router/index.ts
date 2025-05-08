import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import AuthRouter from "./auth";
import TaskRouter from "./task";

import NotFoundView from "@/views/NotFoundView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...AuthRouter,
  ...TaskRouter,
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
