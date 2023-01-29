<!-- 文章详情 -->
<template>
  <div class="BlogDetail-container">
    <h1>{{ data.title }}</h1>
    <div class="aside">
      <span>日期: {{ formatDate(data.createDate) }}</span>
      <span>浏览: {{ data.scanNumber }}</span>
      <a href="#data-form-container">评论: {{ data.commentNumber }}</a>
      <RouterLink
        :to="{
        name : 'CategoryBlog',
        params : {categoryId: data.category.id, }
      }"
        >分类: {{ data.category.name }}</RouterLink
      >
    </div>
    <div v-html="data.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import { formatDate } from "@/utils";
import "@/Styles/markdown.css";
import "highlight.js/styles/github.css";
export default {
  methods: {
    formatDate,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}
.markdown-body {
  margin: 2em 0;
}
</style>