<template>
  <div @click="handleClick" v-show="show" class="to-top-container">Top</div>
</template>  

<script>
export default {
  data() {
    return {
      show: false,
    };
  },

  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },

  methods: {
    handleScroll(scrollDom) {
      if (!scrollDom) {
        this.show = false;
        return;
      }

      this.show = scrollDom.scrollTop >= 430;
    },

    handleClick() {
      // 回到顶部
      this.$bus.$emit("setScroll", 0);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
.to-top-container {
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 99;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  line-height: 50px;
  color: #fff;
  text-align: center;
}
</style>