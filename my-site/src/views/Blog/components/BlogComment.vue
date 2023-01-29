<!-- 评论列表 -->
<template>
  <div class="BlogComment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total || 0})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />

    <div class="footer" v-if="showFooter">
      <p>已经到底啦~</p>
    </div>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
// import { server_URL } from "@/utils";
import { getComments, postComments } from "@/api/blog";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      data: () => ({}), //接受远程数据
      //存储评论的页数和页容量
      page: 1,
      limit: 10,
      isLoading: true,
      showFooter: false,
    };
  },
  computed: {
    //判断评论是否加载完
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  async created() {
    this.data = await this.fetchData();
    this.isLoading = false;
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },

  methods: {
    async fetchData() {
      let resp = await getComments(
        this.$route.params.id,
        this.page,
        this.limit
      );
      // for (const i of resp.rows) {
      //   if (i.avatar) {
      //     i.avatar2 = server_URL + i.avatar;
      //   }
      // }

      return resp;
    },
    async handleSubmit(formData, callback) {
      try {
        const resp = await postComments({
          blogId: this.$route.params.id,
          ...formData,
        });
        // resp.avatar2 = server_URL + resp.avatar;
        this.data.rows.unshift(resp);
        this.data.total++;
        callback("评论成功"); // 告诉子组件，我这边处理完了，你继续
      } catch (error) {
        callback();
      }
    },

    handleScroll(scrollDom) {
      if (this.isLoading || !scrollDom) {
        // 目前正在加载更多
        return;
      }
      const range = 160; //定一个可接受的范围，在这个范围内都算达到了底部
      const top = Math.abs(
        scrollDom.scrollHeight - scrollDom.scrollTop - scrollDom.clientHeight
      );
      if (top <= range) {
        //已经滑到底部,加载更多评论
        this.fetchMore();
      }
    },

    //加载更多评论
    async fetchMore() {
      if (!this.hasMore) {
        //已经没有更多评论
        this.showFooter = true;
        return;
      }
      this.isLoading = true;
      this.page++;
      const data1 = await this.fetchData();
      this.data.total = data1.total;
      this.data.rows = this.data.rows.concat(data1.rows);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
@import "~@/Styles/mixin.less";
.BlogComment-container {
  margin: 30px 0;
}
.footer {
  font-size: 14px;
  color: @gray;
  position: relative;
  border-bottom: 1px solid lighten(@gray, 20%);
  height: 34px;
  line-height: 34px;
  width: 100%;
  margin: 0;
  padding: 0;
  p {
    margin: 0;
    padding: 0;
    .self-center();
  }
}
</style>