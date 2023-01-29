<template>
  <div class="MessageArea-container" >
    <DataForm v-on="$listeners" />
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <DataList :list="list" />
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import DataList from "./DataList.vue";
import DataForm from "./DataForm.vue";
export default {
  components: {
    DataForm,
    DataList,
  },
  props : {
    title : { //列表标题
        type : String,
        default : "",
    },
    subTitle :{//列表副标题
        type : String,
        default : "",
    },
    list : {// 列表数据
        type : Array,
        default : ()=>[],
    },
    isListLoading : { //列表是否正在加载中
        type : Boolean,
        default : false,
    }
  }
};
</script>

<style scoped lang="less">

.loading {
  position: relative;
  height: 70px;
}
</style>