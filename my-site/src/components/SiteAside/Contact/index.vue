<template>
  <ul class="Contact-container">
    <li>
      <a :href="data.github" target="_blank">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{ data.mail }}</span>
      </a>
    </li>
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{ data.qq }}</span>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" alt="" />
      </div>
    </li>
    <li>
      <a>
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>{{ data.weixin }}</span>
      </a>
      <div class="pop">
        <img :src="data.weixinQrCode" alt="" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style scoped lang="less">
@import "~@/Styles/var.less";
@import "~@/Styles/global.less";
.Contact-container {
  width: 100%;
  color: @gray;
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  li {
    padding: 7px 0;
    position: relative;
    height: 30;
    line-height: 30px;
    .icon {
      font-size: 25px;
      width: 34px;
      &.weixin {
        font-size: 32px;
        text-indent: -3px;
      }
    }
    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }

  .pop {
    position: absolute;
    background-color: #fff;
    padding: 10px 16px;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    left: 0;
    bottom: 35px;
    transition: 0.3s;

    &::after {
      content: "";
      position: absolute;
      background: #fff;
      left: 50%;
      width: 8px;
      height: 8px;
      bottom: -4px;
      transform: translateX(-50%) rotate(45deg);
    }

    img {
      width: 150px;
      height: 150px;
    }
  }
}
</style>