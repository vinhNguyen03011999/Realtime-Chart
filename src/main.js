import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import ApexCharts from 'apexcharts';

Vue.config.productionTip = false;
Vue.use(axios)
new Vue({
  router,
  store,
  render: h => h(App, ApexCharts)
}).$mount("#app");
