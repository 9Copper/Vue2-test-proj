<template>
  <div class="test-container">
    <Pager :total="707" :current="7" @pageChange="handlePageChange"/>
  </div>
</template>

<script>
import Pager from "./index.vue";
export default {
  components : {
    Pager,
  },
  methods : {
    handlePageChange(newPage){
      console.log(newPage)
    }
  }
}
</script>

<style>

</style>