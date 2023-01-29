<template>
  <form
    id="data-form-container"
    class="DataForm-container"
    @submit.prevent="handleSubmit"
    ref="form"
  >
    <!-- 输入用户昵称区域 -->
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          maxlength="10"
          placeholder="用户昵称"
          v-model="formData.nickname"
        />
        <span class="tip">{{ formData.nickname.length }} / 10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <!-- 输入内容区域 -->
    <div class="form-item">
      <div class="text-area">
        <textarea
          placeholder="请输入内容"
          maxlength="300"
          v-model="formData.content"
        ></textarea>
        <span class="tip">{{ formData.content.length }} / 300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <!-- 提交按钮 -->
    <div class="form-item">
      <div class="btn-area">
        <button :disabled="isSubmiting">
          {{ isSubmiting ? "提交中..." : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false,
    };
  },

  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请输入昵称";
      this.error.content = this.formData.content ? "" : "请输入内容";
      if (this.error.nickname || this.error.content) {
        //有错误
        return;
      }
      this.isSubmiting = true; // 正在提交，防止重复点击
      this.$emit("submit", this.formData, (successMsg) => {
        if (successMsg) {
          this.$showMessage({
            content: successMsg,
            type: "success",
            duration: 700,
            container: this.$refs.form,
            callback: () => {
              this.isSubmiting = false;
              this.formData.nickname = "";
              this.formData.content = "";
            },
          });
        } else {
          this.isSubmiting = false;
          this.formData.nickname = "";
          this.formData.content = "";
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
.DataForm-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  font-size: 12px;
  right: 7px;
  bottom: 7px;
  color: #b4b8bc;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}

input {
  padding: 0 16px;
  height: 38px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>