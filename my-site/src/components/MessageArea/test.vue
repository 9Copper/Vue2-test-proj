<template>
    <div class="test-container">
        <MessageArea />
    </div>
</template>

<script>
import "@/Styles/global.less";
import MessageArea from "./index.vue";
export default {
    components : {
        MessageArea,
    }
}
</script>

<style scoped lang="less">
    .test-container {
        width : 520px;
        height : 520px;
        // border : 1px solid #000;
        position : relative;
        margin : 34px auto;

    }
</style>