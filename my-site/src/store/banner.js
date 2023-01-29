import { getBanners } from "@/api/banner.js";
// import { server_URL } from "@/utils";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchBanner(ctx) {
      if (ctx.state.data.length) {  //防止重复获取
        return;
      }
      ctx.commit("setLoading", true);
      const resp = await getBanners();
      // for (const i of resp) {
      //   i.bigImg = server_URL + i.bigImg;
      //   i.midImg = server_URL + i.midImg;
      // }
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
    },
  },
};
