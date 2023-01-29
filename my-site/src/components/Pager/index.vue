<template>
  <!-- 只有总页数大于1时才显示 -->
  <div class="Pager-container" v-if="this.pagerNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      :class="{ active: n === current }"
      v-for="(n, i) in numbers"
      :key="i"
      >{{ n }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pagerNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pagerNumber)"
      :class="{ disabled: current === pagerNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    //当前页码
    current: {
      type: Number,
      default: 1,
    },
    //总数据量
    total: {
      type: Number,
      default: 0,
    },
    //页容量
    limit: {
      type: Number,
      default: 10,
    },
    //可见页码数
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    //总页数
    pagerNumber() {
      return Math.ceil(this.total / this.limit);
    },
    //得到最小的可见页码数
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    //得到最大可见的页码数
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pagerNumber) {
        max = this.pagerNumber;
      }
      return max;
    },
    //得到一个可见页码数的数组
    numbers() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      };
      if (newPage > this.pagerNumber) {
        newPage = this.pagerNumber;
      };
      if (newPage === this.current) {
        return;
      };
      this.$emit("pagerChange", newPage);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
.Pager-container {
  display: flex;
  justify-content: center;
  margin: 25px 0;
  a {
    color: @primary;
    margin: 0 7px;
    cursor: pointer;
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
    &.disabled {
      color: @lightWords;
      cursor: text;
    }
  }
}
</style>