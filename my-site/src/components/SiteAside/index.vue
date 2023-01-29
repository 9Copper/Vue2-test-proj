<template>
  <div class="SiteAside-container">
    <template v-if="data">
      <Avatar :src="data.avatar" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>
    <Menu v-if="data" />
    <Contact v-if="data" />
    <a href="https://beian.miit.gov.cn" target="_blank">
      <p v-if="data" class="footer">{{ data.icp }}</p>
    </a>
  </div>
</template>
  
  <script>
import Avatar from "@/components/Avatar";
import Contact from "./Contact/";
import Menu from "./Menu";
import { mapState } from "vuex";
export default {
  components: {
    Avatar,
    Contact,
    Menu,
  },
  computed: mapState("setting", ["data"]),
};
</script>
  
  <style scoped lang="less">
@import "~@/Styles/var.less";
.SiteAside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 11px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.Avatar-container {
  margin: 0 auto;
}
.footer {
  text-align: center;
  font-size: 12px;
  color: @gray;
  &:hover{
    color : @primary;
  }
}
.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>