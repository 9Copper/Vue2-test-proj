import request from "@/utils/request";
// 获取全局设置
export function getSetting(){
  return request({
    url : "/api/setting",
    method : "get",
  })
};
// 修改全局设置
// 更新全局设置时，无须提供全字段，若只想修改其中一部分配置，则仅传入对应配置即可,其他未传入的字段则保持不变
export function setSetting(data) {
  return request({
    url : "/api/setting",
    method : "put",
    data,
  })
}


