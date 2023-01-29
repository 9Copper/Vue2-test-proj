<template>
  <nav class="Menu-container">
    <RouterLink
      :to="{name : item.name}"
      :exact="item.exact"
      v-for="item in items"
      :key="item.name"
      active-class="selected"
      exact-active-class=""
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name :"Home",
          title: "首页",
          icon: "home",
          exact : true,
        },
        {
          name :"Blog",
          title: "文章",
          icon: "blog",
          exact : false, //激活状态是否要精确匹配
        },
        {
          name :"About",
          title: "关于我",
          icon: "about",
          exact : true,
        },
        {
          name :"Project",
          title: "项目&效果",
          icon: "code",
          exact : true,
        },
        {
          name :"Message",
          title: "留言板",
          icon: "chat",
          exact : true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
.Menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    &.selected {
      background: darken(@words, 3%);
    }
    display: block;
    display: flex;
    height: 45px;
    padding: 0 50px;
    align-items: center;

    .icon {
      width: 25px;
    }

    &:hover {
      color: #fff;
    }
  }
}
</style>