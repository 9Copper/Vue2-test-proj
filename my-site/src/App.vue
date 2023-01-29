<template>
  <div class="test-container">
    <Layout >
      <template v-slot:left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <RouterView />
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "./components/Layout";
import SiteAside from "./components/SiteAside";
import ToTop from "./components/ToTop";
export default {
  components : {
    Layout,
    SiteAside,
    ToTop,
  }
}
</script>

<style scoped lang="less">
 @import "~@/Styles/mixin.less";
.test-container {
  .self-fill(fixed);

.aside {
  width: 250px;
  height: 100%;
}
}
</style>