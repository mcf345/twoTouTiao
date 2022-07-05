import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "./router";
//引入Vuex
import store from "./store";
//引入样式
import "@/styles/index.less";
// 引用icon组件
import ToutiaoIcon from "@/components/ToutiaoIcon";
// 动态设置 REM 基准值
import "amfe-flexible";
//引入vant组件库
import Vant from "vant";
//引入vant组件库样式
import "vant/lib/index.less";
//引入axios
import request from "./utils/request";
//测试接口是否可用
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
});

Vue.use(Vant);
Vue.config.productionTip = false;
//注册全局组件
Vue.component("ToutiaoIcon", ToutiaoIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
