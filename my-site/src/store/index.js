import Vue from "vue";
import { Store, install } from "vuex";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";

if (!window.Vuex) {
  install(Vue); //应用vue插件
}

const store = new Store({
  //仓库配置
  modules: {
    project,
    about,
    banner,
    setting,
  },
  strict: true,
});

export default store;
