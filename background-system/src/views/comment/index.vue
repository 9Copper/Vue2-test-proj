<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="data"
      element-loading-text="加载数据中"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="80">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            size="small"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column label="评论文章" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.blog.title }}</template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="评论日期" align="center" width="230">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteComment(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        style="margin: 34px 0"
        background
        :page-size="eachPage"
        :page-sizes="[5, 10, 15, 20]"
        layout="prev, pager, next, total, ->,sizes, jumper"
        :total="count"
        :current-page.sync="pagerCurrentPage"
        @prev-click="prevClickHandle"
        @next-click="nextClickHandle"
        @current-change="currentChangeHandle"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getComments, delComment } from "@/api/comment";
import { formatDate } from "@/utils/formatDate";
// import { server_URL } from "@/utils/server_URL";
export default {
  data() {
    return {
      listLoading: false,
      currentPage: 1, // 当前页码
      eachPage: 5, // 每页显示条数
      totalPage: 0, // 总页数
      count: 0, // 数据总条数
      data: [], // 数据详情
      pagerCurrentPage: 1, // 分页栏当前页码
    };
  },
  created() {
    //获取评论
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getComments(this.currentPage, this.eachPage).then(({ data }) => {
        this.listLoading = false;
        this.data = data.rows;
        // for (const i of this.data) {
        //   i.avatar2 = server_URL + i.avatar;
        // }

        // 处理时间，显示正确的格式
        for (let i of this.data) {
          i.createDate = formatDate(i.createDate);
        }
        //获取数据总条数
        this.count = data.total;
        //获取总页数
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    //删除评论
    deleteComment({ id }) {
      this.$confirm("是否删除此条评论信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delComment(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击上一页，下一页，不用重新发送请求
    // 因为当前页码改变会触发 currentChangeHandle 事件，然后就会自动发送请求了
    // 点击上一页
    prevClickHandle() {
      this.currentPage -= 1;
    },
    // 点击下一页
    nextClickHandle() {
      this.currentPage += 1;
    },
    // 点击页码
    currentChangeHandle(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.fetchData();
    },
    // 改变每页显示条数
    handleSizeChange(pageNumber) {
      this.eachPage = parseInt(pageNumber);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.fetchData();
    },
  },
};
</script>

<style>
</style>
