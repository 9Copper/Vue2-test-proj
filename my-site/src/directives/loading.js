import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
// 得到el中含有loading效果的img元素
function getLoadingImg(el) {
  return el.querySelector("img[data-role = loading]");
}

//创建img
function createImg() {
  const img = document.createElement("img");
  img.src = loadingUrl;
  img.dataset.role = "loading";
  img.className = styles.loading;
  return img;
}

// 导出指令的配置对象
export default function (el, binding) {
  // 根据 binding.value 的值，决定创建或删除img元素

  let curImg = getLoadingImg(el);
  if (binding.value) {
    //如果当前el中没有loading效果的img元素，则创建，否则删除该img元素
    if (!curImg) {
      let img = createImg();
      el.appendChild(img);
    }
  } else {
    if(curImg) {
        curImg.remove();
    }
  }
}
