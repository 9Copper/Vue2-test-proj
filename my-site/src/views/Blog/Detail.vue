<template>
  <Layout>
    <div class="main-container" v-loading="isLoading" ref="mainContainer">
      <BlogDetail :data="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogDetailToc :data="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail.vue";
import BlogDetailToc from "./components/BlogDetailToc.vue";
import { getBlog } from "@/api/blog";
import BlogComment from "./components/BlogComment.vue";
import { titleControl } from "@/utils";
export default {
  components: {
    Layout,
    BlogDetail,
    BlogDetailToc,
    BlogComment,
  },
  data() {
    return {
      data: null,
      isLoading: true,
    };
  },
  computed: {
    routeInfo() {
      return this.$route.params.id;
    },
  },
  async created() {
    //获取数据
    let resp = await getBlog(this.routeInfo);
    if (!resp) {
      // 文章不存在
      this.$router.push("/404");
      return;
    }
    this.data = resp;
    this.isLoading = false;
    titleControl.setRouteTitle(resp.title);
  },

  mounted() {
    //监听滚动条滚动
    this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("setScroll", this.setScroll);
  },

  beforeDestroy() {
    this.$bus.$emit("mainScroll");
    this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("setScroll", this.setScroll);
  },

  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },

  methods: {
    //往事件总线添加事件
    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    },
    setScroll(scrollTop) {
      this.$refs.mainContainer.scrollTop = scrollTop;
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 250px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>