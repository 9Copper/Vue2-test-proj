<template>
  <div class="test-container">
    <ImageLoader
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
    />
  </div>
</template>

<script>
import ImageLoader from "./index.vue";
export default {
    components : {
        ImageLoader,
    }
};
</script>

<style scoped lang="less">
.test-container  {
    width : 430px;
    height : 430px;
    position : relative;
    margin : 160px auto;
}
</style>