import Vue from "vue";
// import "./mock";
import App from "./App.vue";
import router from "./router";
import "./Styles/global.less";
import showMessage from "./utils/showMessage";
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy";
import store from "./store";
import "./eventBus";

//从仓库获取全局设置
store.dispatch("setting/fetchSetting");

Vue.prototype.$showMessage = showMessage;

//注册全局指令
Vue.directive("loading", vLoading); //加载中效果
Vue.directive("lazy", vLazy); //图片懒加载

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
