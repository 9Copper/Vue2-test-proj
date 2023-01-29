<template>
  <div class="Message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total || 0})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    ></MessageArea>
    <div class="footer" v-if="showFooter">
      <p>已经到底啦~</p>
    </div>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getMessage, postMessage } from "@/api/message";
// import { server_URL } from "@/utils";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      isLoading: true,
      data: () => {},
      page: 1,
      limit: 10,
      showFooter: false,
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  async created() {
    this.data = await this.fetchData();
    this.isLoading = false;
    this.$bus.$on("mainScroll", this.handleMainScroll);
  },

  mounted() {
    //监听滚动条
    this.$refs.messageContainer.addEventListener("scroll", this.handleScroll);
    //监听事件总线的ToTop
    this.$bus.$on("setScroll", this.handleSetScroll);
  },
  beforeDestroy() {
    //取消监听
    this.$bus.$emit("mainScroll");
    this.$bus.$off("mainScroll", this.handleMainScroll);
    this.$bus.$off("setScroll", this.handleSetScroll);
    this.$refs.messageContainer.removeEventListener(
      "scroll",
      this.handleScroll
    );
  },
  methods: {
    async fetchData() {
      let resp = await getMessage(this.page, this.limit);
      // for (const i of resp.rows) {
      //   if (i.avatar) {
      //     i.avatar2 = server_URL + i.avatar;
      //   }
      // }
      return resp;
    },
    async handleSubmit(formData, callback) {
      try {
        const resp = await postMessage(formData);
        // resp.avatar2 = server_URL + resp.avatar;
        callback("感谢您的留言!");
        this.data.total++;
        this.data.rows.unshift(resp);
      } catch (error) {
        callback();
      }
    },

    handleScroll() {
      //添加事件总线
      this.$bus.$emit("mainScroll", this.$refs.messageContainer);
    },

    handleSetScroll(scrollTop) {
      this.$refs.messageContainer.scrollTop = scrollTop;
    },

    handleMainScroll(dom) {
      // 目前正在加载更多
      if (this.isLoading || !dom) {
        return;
      }
      const range = 160; //定一个可接受的范围，在这个范围内都算达到了底部
      const top = Math.abs(dom.scrollHeight - dom.scrollTop - dom.clientHeight);
      if (top <= range) {
        //已经滑到底部,加载更多评论
        this.fetchMore();
      }
    },

    //加载更多
    async fetchMore() {
      if (!this.hasMore) {
        //已经没有更多评论
        this.showFooter = true;
        //已经没有更多了
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
.Message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  position: relative;

  .MessageArea-container {
    width: 700px;
    margin: 0 auto;
  }
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