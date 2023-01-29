<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="blog">文章标题</div>
    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    <!-- 文章编辑 -->
    <div class="blog">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="editorOptions"
    />
    <!-- 文章描述  -->
    <div class="blog">文章描述</div>
    <el-input
      v-model="form.description"
      placeholder="请输入文章描述"
      type="textarea"
      :rows="6"
    ></el-input>

    <!-- 文章头图 -->
    <UpLoad uploadTitle="文章头图" v-model="form.thumb" />
    <!-- 选择分类 -->
    <div class="blog">选择分类</div>
    <el-select
      v-model="form.select"
      slot="prepend"
      placeholder="请选择文章分类"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <!-- 发布按钮 -->
    <div>
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="addBlogHandle"
        >{{ btnContent }}</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/i18n/zh-cn";
import UpLoad from "@/components/UpLoad";
import { getBlogType } from "@/api/blogType";
import { addBlog, editOneBlog, getOneBlog } from "@/api/blog";
export default {
  props: ["mode"],
  components: {
    Editor,
    UpLoad,
  },
  data() {
    return {
      form: {
        title: "", //文章标题
        editorText: "", // 用户编辑的内容
        description: "", //文章描述
        select: "", //选择分类
        thumb: "", // 文章的图片
      },
      editorOptions: {
        language: "zh-CN",
      },
      blogType: [], // 存放博客分类
      imageUrl: "", // 图片在服务器上面的地址
      btnContent: "发布文章", //控制按钮显示的文字
    };
  },
  created() {
    //一进来先获取文章分类
    getBlogType().then(({ data }) => {
      this.blogType = data;
    });

    // 获取数据回填表单
    if (this.mode === "edit") {
      //从路由获取id
      this.id = this.$route.params.id;
      getOneBlog(this.id).then(({ data }) => {
        this.form = data;
        this.form.select = data.category === null ? "" : data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
      });
      this.btnContent = "确认修改";
    }
  },
  methods: {
    addBlogHandle() {
      // 添加文章的业务逻辑 1. 获取表单内容   2. 发送请求
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      // 来组装要传递给服务器的对象
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
        // toc 传递一个空数组过去，之后在服务器根据 markdown 的内容来生成 toc 目录
        toc: [],
      };

      if (obj.title && obj.description && obj.categoryId && obj.htmlContent) {
        //判断是发布文章还是编辑文章
        //发布文章
        if (this.mode === "add") {
          addBlog(obj).then(() => {
            this.$message.success("文章发布成功");
            this.$router.push("/blogList"); // 跳转到文章列表
          });
        } else if (this.mode === 'edit') {
          //修改文章
          editOneBlog({id : this.form.id, data : obj}).then(()=>{
            this.$message.success("文章修改成功");
            this.$router.push("/blogList"); // 跳转到文章列表
          })
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.blog {
  margin: 16px 0;
  font-weight: 100;
}
</style>
