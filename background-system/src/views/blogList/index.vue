<template>
  <div class="app-container">
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="52" align="center">
        <template slot-scope="scope"
          >{{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="250"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="文章描述"
        width="150"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="浏览数"
        width="150"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="评论量"
        width="150"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="所属分类"
        width="150"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.category.name }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="创建日期"
        width="250"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBlogInfo(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件  -->
    <el-pagination
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      :current-page.sync="pagerCurrentPage"
      layout="prev, pager, next,total, ->, sizes, jumper"
      :total="count"
      style="margin: 34px 0"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlogs, delOneBlog } from "@/api/blog.js";
import { formatDate } from "@/utils/formatDate";
import { server_URL, frontEnd_URL } from "@/utils/server_URL";
export default {
  data() {
    return {
      data: [],
      srcList: [],
      eachPage: 5, // 每一页显示的条数
      count: 0, // 数据总条数
      totalPage: 0, // 总页数
      currentPage: 1, // 当前页码，默认进来是第一页
      pagerCurrentPage: 1, // 分页栏当前页码
    };
  },

  created() {
    this.FetchBlogs();
  },
  methods: {
    FetchBlogs() {
      getBlogs(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (const i of this.data) {
          i.createDate = formatDate(i.createDate);
          // i.thumb = server_URL + i.thumb;
          this.srcList.push(i.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        // 下面的 if 会在删除文章的时候可能会触发，例如最后一页只有一条数据
        // 删除之后，总页码数就会减一，当前页码数就大于了总页码数，所以要做处理
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.FetchBlogs();
        }
      });
    },
    // 跳转到具体的文章
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/blog/${blogInfo.id}`);
    },
    // 删除文章
    deleteBlog(blogInfo) {
      this.$confirm(
        "删除该文章会将该文章下面的评论一并删除，是否继续?",
        "是否删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delOneBlog(blogInfo.id).then((res) => {
            this.FetchBlogs();
            console.log(res.data);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑文章
    editBlogInfo(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`);
    },
    // 分页相关事件
    // pagesize改变时触发
    sizeChangeHandle(pageNumber) {
      this.eachPage = parseInt(pageNumber);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.FetchBlogs();
    },
    //currentPage 改变时会触发
    currentChangeHandle(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.FetchBlogs();
    },
    //用户点击上一页按钮改变当前页后触发
    prevClickHandle() {
      this.currentPage -= 1;
    },
    //用户点击下一页按钮改变当前页后触发
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
};
</script>

<style lang="scss">
</style>
