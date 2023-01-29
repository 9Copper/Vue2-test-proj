<template>
  <div
    class="CarouselItem-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" ref="inner" :style="imagePosition">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="this.showWords"
      />
    </div>

    <div class="title" ref="title">{{ carousel.title }}</div>

    <div class="description" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  components: {
    ImageLoader,
  },
  props: ["carousel"],
  data() {
    return {
      titleWidth: 0, //title的宽度
      descWidth: 0, // description的宽度
      //鼠标坐标
      mouseX: 0,
      mouseY: 0,
      containerSize: null, // 外层容器尺寸
      innerSize: null, // 内层容器尺寸
    };
  },

  computed: {
    //得到图片坐标
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      let extraWidth = this.containerSize.width - this.innerSize.width; //多出的宽度
      let extraHeight = this.containerSize.height - this.innerSize.height; // 多出的高度
      let left = (extraWidth / this.containerSize.width) * this.mouseX;
      let top = (extraHeight / this.containerSize.height) * this.mouseY;

      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    //获取title与description的宽度
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    //获取容器尺寸
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },

  methods: {
    //显示文字
    showWords() {
      /*宽度从0变化到auto无法设置过渡动画，因此在css先将元素opacity设置为0，用变量接受元素宽度，再将元素宽度设置为0，
      opacity设置为1，再将宽度从0变化到接受到的宽度值，从而实现动画效果*/
      //title部分
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      //强行渲染
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "1.6s";
      this.$refs.title.style.width = this.titleWidth + "px";
      //description部分
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth;
      this.$refs.desc.style.transition = "3.2s 1.6s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },

    //获取内外层容器尺寸
    setSize() {
      //获取外层容器尺寸
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      //获取内层容器尺寸
      this.innerSize = {
        width: this.$refs.inner.clientWidth,
        height: this.$refs.inner.clientHeight,
      };
    },
    //得到鼠标坐标
    handleMouseMove(e) {
      let rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
.CarouselItem-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  color: #fff;
  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s;
  }

  .title,
  .description {
    position: absolute;
    left: 34px;
    letter-spacing: 3px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    opacity: 0;
  }
  .title {
    top: calc(50% - 25px);
    font-size: 2em;
  }
  .description {
    top: calc(50% + 25px);
    font-size: 1.3em;
    color: lighten(@gray, 20%);
  }
}
</style>