import service from './request'

/**
 * 登录
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function login(data) {
  return service.request({
    url: '/login',
    method: 'POST',
    data
  })
}

/**
 * 添加用户
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addUser(data) {
  return service.request({
    url: '/manage/user/add',
    method: 'POST',
    data
  })
}
