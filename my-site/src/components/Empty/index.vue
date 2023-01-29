<template>
    <div class="Empty-container">
        <Icon type="empty" />
        <p>{{text}}</p>
    </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
    components : {
        Icon,
    },
    props : {
        text : {
            type : String,
            default : '无数据'
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/Styles/mixin.less";
@import "~@/Styles/var.less";
    .Empty-container {
        .Icon-container {
            font-size : 43px;
        }
        .self-center();
        text-align : center;
        color : @gray;
    }
</style>