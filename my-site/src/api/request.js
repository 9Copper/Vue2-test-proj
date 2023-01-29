import axios from "axios";
import showMessage from "../utils/showMessage";

//创建一个axios的实例
const ins = axios.create();
ins.interceptors.response.use(function (resp) {
  if (typeof resp.data === "string" && resp.data.code !== 0) {
    let arr = JSON.parse(resp.data);
    showMessage({ content: arr.msg, type: "info" });
    return null;
  }
  return resp.data.data;
});
export default ins;
