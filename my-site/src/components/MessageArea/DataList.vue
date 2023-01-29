<!-- 消息列表(评论或者留言) -->
<template>
  <ul class="DataList-container">
    <li v-for="(item, i) in list" :key="i">
      <Avatar :src="item.avatar" :size="43" />
      <div class="content-container">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="time">{{ formatDate(item.createDate, true) }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import { formatDate } from "@/utils";
export default {
  components: {
    Avatar,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
.DataList-container {
  margin: 0;
  padding: 0;
  li {
    display: flex;
    border-bottom: 1px solid lighten(@gray, 20%);
    padding: 16px 0;
  }
}
.Avatar-container {
  margin-right: 16px;
}
.nickname {
  color: darken(@success, 10%);
  margin-bottom: 10px;
}
.content {
  font-size: 14px;
}

.content-container {
  flex: 1 1 auto;
  position: relative;
}

.time {
  position: absolute;
  right: 3px;
  top: 5px;
  font-size: 12px;
  color: @gray;
}
</style>