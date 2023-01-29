import request from '@/utils/request'

export function login(data) {
  return request.post('/api/admin/login',data)
}

//回复登录
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// 修改用户
export function setUser(data){
  return request({
    url : '/api/admin',
    method : 'PUT',
    data
  })
}
