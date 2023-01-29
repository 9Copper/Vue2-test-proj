<!-- 文章列表页 -->
<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img
              v-lazy="item.thumb"
              :alt="item.title"
              :title="item.title"
              v-if="item.thumb"
            />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
              class=""
              >分类: {{ item.category.name }}</RouterLink
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>

    <Empty v-if="data === [] && !isLoading" />

    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      :current="routeInfo.page"
      :total="data.total"
      @pagerChange="handlePageChange"
    />
  </div>
</template>

<script>
import { formatDate } from "@/utils";
import Pager from "@/components/Pager";
import { getBlogs } from "@/api/blog.js";
import Empty from "@/components/Empty";
// import { server_URL } from "@/utils";
export default {
  components: {
    Pager,
    Empty,
  },

  data() {
    return {
      data: () => {}, //接收远程数据
      isLoading: true,
    };
  },

  async created() {
    //获取数据
    let resp = await this.fetchData();
    this.data = resp;
    this.isLoading = false;
  },
  computed: {
    //从地址栏中获取路由信息
    routeInfo() {
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const categoryId = this.$route.params.categoryId || -1;
      return {
        page,
        limit,
        categoryId,
      };
    },
  },
  async created() {
    //获取数据
    let resp = await this.fetchData();
    this.data = resp;
    this.isLoading = false;
  },

  mounted() {
    //监听滚动条，ToTop
    this.$bus.$on("setScroll", this.handleSetScroll);
    this.$refs.container.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$emit("mainScroll");
    this.$refs.container.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("setScroll", this.handleSetScroll);
  },
  methods: {
    formatDate,
    async fetchData() {
      let resp = await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
      // for (const i of resp.rows) {
      //   i.thumb2 = server_URL + i.thumb;
      // }
      return resp;
},
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // 跳转到 当前的分类id  当前的页容量  newPage的页码
      if (this.routeInfo.categoryId === -1) {
        // 当前没有分类
        // /article?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        // /article/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.container);
    },
    handleSetScroll(scrollTop) {
      this.$refs.container.scrollTop = scrollTop;
    },
  },
  watch: {
    //观察 this.$route 的变化，变化后，会调用该函数
    async $route() {
      this.isLoading = true;
      // 滚动高度为0
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>