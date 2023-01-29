//图片懒加载
import eventBus from "@/eventBus.js";
import lazyUrl from "@/assets/default.gif";
import { debounce } from "@/utils";

//需要处理的图片数组
let images = [];

//设置单张图片
function setImage(img) {
  img.dom.src = lazyUrl; //先将所有图片暂时使用着默认图片
  //处理该图片
  //判断图片是否在视口范围内
  const rect = img.dom.getBoundingClientRect();
  const clientHeight = document.documentElement.clientHeight;
  const height = rect.height || 160; // 设置一个默认高度
  if (rect.top >= -height && rect.top <= clientHeight) {
    //在视口范围内
    const tempImg = new Image();
    tempImg.onload = () => {
      //真实图片已经加载完成并缓存，将默认图片替换为真实的图片
      img.dom.src = img.src;
      //将已加载的图片从需要处理的图片数组中删除
      images = images.filter((it) => it !== img);
    };
    tempImg.src = img.src;
  }
}

//调用该函数，设置合适的图片(在视口范围内的图片)
function setImages() {
  for (const img of images) {
    setImage(img);
  }
}

function handleScroll() {
  setImages();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

// 导出指令的配置对象
export default {
  inserted(el, binding) {
    //获取需要处理的图片数组
    const imgs = {
      dom: el,
      src: binding.value,
    };
    images.push(imgs);
    // 立即处理它
    setImage(imgs);
  },

  unbind(el) {
    images = images.filter((it) => it.dom !== el);
  },
};
