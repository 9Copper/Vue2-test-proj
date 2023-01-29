import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";
import getComponentRootDom from "./getComponentRootDom";

/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型  info  error  success  warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则显示到页面正中
 */
export default function (options = {}) {
  const content = options.content || "";
  const type = options.type || "info";
  const duration = options.duration || 1000;
  const container = options.container || document.body;

  //创建消息元素
  let oDiv = document.createElement("div");
  let IconDom = getComponentRootDom(Icon, { type });
  oDiv.innerHTML = `<span class="${styles.icon}">${IconDom.outerHTML}</span> <div>${content}</div> `;
  //设置样式
  oDiv.className = `${styles.message} ${styles[`message-${type}`]}`;

  //判断容器的position是否改动
  if (options.container) {
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
  }

  //将ODiv添加到容器当中
  container.appendChild(oDiv);
  //强行渲染
  oDiv.clientHeight;

  //显示消息体,并回到正常位置
  oDiv.style.opacity = 1;
  oDiv.style.transform = `translate(-50%, -50%)`;

  //等待一段时间消息体消失
  setTimeout(() => {
    oDiv.style.opacity = 0;
    oDiv.style.transform = `translate(-50%,-50%) translateY(-25px)`;
    //删除信息元素
    oDiv.addEventListener(
      "transitionend",
      function () {
        oDiv.remove();
        // 运行回调函数
        options.callback && options.callback();
      },
      {
        once: true,
      }
    );
  }, duration);
}