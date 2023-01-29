<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./index.vue";
export default {
    components : {
        Contact,
    }
}
</script>

<style scoped lang="less">
    .test-container {
        width : 250px;
        height : 700px;
        padding-top : 300px;
        background-color : #000;
    }
</style>