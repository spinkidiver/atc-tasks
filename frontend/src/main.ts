import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./stores";
import DashboardPlugin from "./plugins/dashboard-plugin";

// Evitar mostrar el tip de producción en consola
Vue.config.productionTip = false;

// Usar el plugin Argon
Vue.use(DashboardPlugin);

// Crear una nueva instancia de Vue
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
