<template>
  <div
    class="home-container"
    ref="container"
    @wheel="handleWheel"
    v-loading="loading"
  >
    <ul
      class="CarouselItem-container"
      :style="{ marginTop }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <!-- 上下箭头 -->
    <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>

    <div
      class="icon icon-down"
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <!-- 右侧导航？ -->
    <ul class="indicator">
      <li
        @click="switchTo(i)"
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: index === i }"
      ></li>
    </ul>
  </div>
</template>

<script>
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0, //当前显示的是第几张轮播图
      containerHeight: 0, // 整个容器的高度
      switching: false, //是否正在切换中
    };
  },

  created() {
    this.$store.dispatch("banner/fetchBanner");
  },

  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },

  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },

  methods: {
    //切换轮播图
    switchTo(index) {
      this.index = index;
    },

    //鼠标滚轮
    handleWheel(e) {
      //正在切换中或者滚动幅度太小，直接返回
      if (this.switching) {
        return;
      }
      if (e.deltaY < -7 && this.index > 0) {
        //上一张
        this.switching = true;
        this.index--;
      } else if (e.deltaY > 7 && this.index < this.data.length - 1) {
        //下一张
        this.switching = true;
        this.index++;
      }
    },
    //设置switching为false
    handleTransitionEnd() {
      this.switching = false;
    },

    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/mixin.less";
@import "~@/Styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; //BFC  解决外边距合并
  .CarouselItem-container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    transition: 700ms;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    .self-center();
    font-size: 25px;
    color: @gray;
    cursor: pointer;
    transform: translateX(-50%);
    &.icon-up {
      top: 25px;
      animation: jump-up 2.5s infinite;
    }
    &.icon-down {
      bottom: 25px;
      top: auto;
      animation: jump-down 2.5s infinite;
    }
    @jump: 7px;
    //箭头简易动画
    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }

    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
  }

  .indicator {
    .self-center();
    left: auto;
    right: 25px;
    transform: translateY(-50%);
    li {
      width: 7px;
      height: 7px;
      border: 1px solid #fff;
      border-radius: 50%;
      cursor: pointer;
      margin-bottom: 10px;
      box-sizing: border-box;
      background: @words;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>