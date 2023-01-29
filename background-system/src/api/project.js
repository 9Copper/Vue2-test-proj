import request from "@/utils/request";
// 获取所有项目
export function getAllProjects() {
  return request({
    url : "/api/project",
    method : "get",
  })
};

// 修改项目
export function editProject(id,data){
  return request({
    url : `/api/project/${id}`,
    method : "put",
    data,
  })
};

// 新增项目
export function addProject(projectInfo){
  return request({
    url : '/api/project',
    method : "post",
    data : projectInfo
  })
};

// 删除项目
export function deleteProject(id) {
  return request({
    url : `/api/project/${id}`,
    method : 'delete',
  })
}
