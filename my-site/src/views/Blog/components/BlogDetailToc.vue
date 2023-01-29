<!-- 文章详情目录 -->
<template>
  <div class="BlogDetailToc-container">
    <h2>目录</h2>
    <RightList :list="toWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import { debounce } from "@/utils";
export default {
  components: {
    RightList,
  },

  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    // 根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
    toWithSelect() {
      const getToc = (toc = []) => {
        return toc.map((it) => ({
          ...it,
          isSelect: it.anchor === this.activeAnchor,
          children: getToc(it.children),
        }));
      };
      return getToc(this.data);
    },

    // 根据data得到它们对应的元素数组
    toActiveAnchor() {
      const doms = [];
      const getDom = (dom) => {
        for (let item of dom) {
          let dom = document.getElementById(item.anchor);
          doms.push(dom);
          if (item.children && item.children.length) {
            getDom(item.children);
          }
        }
      };
      getDom(this.data);
      return doms;
    },
  },
  created() {
    //监听事件总线的mainScroll事件
    this.debounceSetActiveAnchor = debounce(this.setActiveAnchor,70);
    this.$bus.$on("mainScroll", this.debounceSetActiveAnchor);
  },
  destroyed(){
    this.$bus.$off("mainScroll",this.debounceSetActiveAnchor);
  },

  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    //为activeAnchor设置正确的值
    setActiveAnchor(scrollDom) {
      if (!scrollDom) {
        return;
      }
      const range = 160; //规定的选中范围
      this.activeAnchor = ""; // 由于后续要重新设置，先清空之前的状态

      for (let item of this.toActiveAnchor) {
        // 看一下当前这个dom元素是不是应该被选中
        if (!item) {
          return;
        }
        // 得到元素离视口顶部的距离
        const top = item.getBoundingClientRect().top;
        if (top > 0 && top < range) {
          //在规定范围内
          this.activeAnchor = item.id;
        } else if (top < range) {
          // 在规定的范围上方
          // 先假设自己是激活的，然后继续看后面
          this.activeAnchor = item.id;
        } else {
          // 在规定的范围下方
          return;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.BlogDetailToc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>