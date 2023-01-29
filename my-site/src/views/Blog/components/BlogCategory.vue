<!-- 文章分类 -->
<template>
  <div class="BlogCategory-container" v-loading="loading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
// import { mapState } from "vuex";
import { getBlogType } from "@/api/blog.js";
export default {
  components: {
    RightList,
  },

  data() {
    return {
      data: [],
      loading: true,
    };
  },
  async created() {
    
    // this.$store.dispatch("blogType/fetchBlogType");
    // console.log(this.$route.params.categoryId);
    this.data = await this.fetchData();
    this.loading = false;
  },
  computed: {
    //获取路由中的分类信息
    categoryId() {
      return this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },

    //获取带有isSelector属性的分类数组
    list() {
      //得到所有分类的文章总数
      const totalArticleCount = this.data.reduce((a, b) => {
        return a + b.articleCount;
      }, 0);
      //给数组添加一项数据 ： "全部"
      let result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];

      let resp = result.map((it) => ({
        ...it,
        isSelect: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
      return resp;
    },

    //从仓库那数据
    // ...mapState("blogType", ["loading", "data"]),
  },
  methods: {
    async fetchData(){
      return await getBlogType();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      // 跳转到 当前的分类id  当前的页容量  newPage的页码
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.BlogCategory-container {
  width: 250px;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>