<template>
  <div class="ImageLoader-container" >
    <img :src="placeholder" alt="" class="placeholder" v-if="!everythingDone" />
    <img
      :src="src"
      alt=""
      class="pic"
      @load="AllLoaded"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false, //原图是否加载完成
      everythingDone: false, //所有事件都已完成 —— 原图已经加载到页面当中等
    };
  },

  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    AllLoaded() {
      this.originLoaded = true;
      setTimeout(()=>{ 
        //等原图加载完成后抛出事件
        this.everythingDone = true;
        this.$emit('load')
      },this.duration)
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/mixin.less";
.ImageLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(1vw);
  }
}
</style>