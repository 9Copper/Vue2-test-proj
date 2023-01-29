<template>
    <div class="test-container">
        <Layout>
            <template v-slot:left>
                <div class="left"></div>
            </template>
            <template v-slot:default >
                <div class="main"></div>
            </template>
            <template v-slot:right >
                <div class="right"></div>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from "./index.vue";
export default {
    components : {
        Layout,
    }
}
</script>

<style scoped lang="less">
    .test-container {
        width : 100vw;
        height : 100vh;
        .left {
            width : 250px;
            height : 100%;
            background-color : #008c8c;
        }
        .main {
            width : 100%;
            height : 100%;
            background-color : #00325b8b;
        }
        .right {
            width : 70px;
            height : 100%;

        }
    }
</style>