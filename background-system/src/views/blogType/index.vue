<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入要添加的分类，左边选择该分类的等级"
        v-model="input"
        class="input-with-select blogAddInput"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1" align="center"></el-option>
          <el-option label="2" value="2" align="center"></el-option>
          <el-option label="3" value="3" align="center"></el-option>
          <el-option label="4" value="4" align="center"></el-option>
          <el-option label="5" value="5" align="center"></el-option>
          <el-option label="6" value="6" align="center"></el-option>
          <el-option label="7" value="7" align="center"></el-option>
        </el-select>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 16px"
        @click="addBlogTypeHandle"
        >添加</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table :data="data" border style="width: 100%">
      <!-- 序号 -->
      <el-table-column prop="date" label="序号" width="52" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }} </template>
      </el-table-column>
      <!-- 博客类别 -->
      <el-table-column prop="title" label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <!-- 文章数量 -->
      <el-table-column prop="title" label="文章数量" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="160">
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
              @click="editBlogTypeInfo(scope.row)"
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
              @click="deleteBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑文章分类 -->
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogTypeHandle"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBlogType,
  delBlogType,
  upDataBlogType,
  getOneBlogType,
  getBlogType,
} from "@/api/blogType";
export default {
  data() {
    return {
      data: [],
      input: "",
      select: "",
      listLoading: false,
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      (this.listLoading = true),
        getBlogType().then((res) => {
          this.listLoading = false;
          this.data = res.data;
        });
    },
    // 编辑文章分类
    editBlogTypeInfo({ id }) {
      // 1. 回填到表单    2. 打开 dialog
      getOneBlogType(id).then((res) => {
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },
    // 确认编辑信息
    confirmEditBlogTypeHandle() {
      upDataBlogType({
        id: this.form.id,
        data: this.form,
      }).then(() => {
        this.fetchData();
        this.$message.success("更新分类信息成功");
        this.dialogFormVisible = false;
      });
    },
    // 删除文章分类
    deleteBlogTypeHandle({ id }) {
      this.$confirm(
        "删除该分类后，该分类下面的所有文章将变为未分类状态，是否继续?",
        "是否删除此文章分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delBlogType(id).then(() => {
            this.fetchData();
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
    // 添加文章分类
    addBlogTypeHandle() {
      if (this.input === "") {
        this.$message.error("分类名称不能为空");
      } else if (this.select === "") {
        this.$message.error("请选择排序等级");
      } else {
        addBlogType({ name: this.input, order: this.select }).then((res) => {
          this.fetchData();
          this.$message.success("分类添加成功");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.blogAddInput {
  width: 430px;
  margin-bottom: 25px;
}
.el-select {
  width: 92px;
}
</style>
