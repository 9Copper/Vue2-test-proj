<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./index.vue";
export default {
    components : {
        Menu,
    }
}
</script>

<style scoped lang="less">
@import "~@/Styles/global.less";
    .test-container {
        width : 250px;
        height : 600px;
        background-color : #000;

    }
</style>