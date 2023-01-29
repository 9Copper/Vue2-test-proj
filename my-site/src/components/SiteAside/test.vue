<template>
    <div class="test-container">
        <SiteAside />
    </div>
</template>

<script>
import SiteAside from "./";
import "@/Styles/global.less";
export default {
    components : {
        SiteAside,
    }
}
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
    .test-container {
        width : 250px;
        height : 100vh;
        background-color : #000;
        color : @gray;
    }
</style>