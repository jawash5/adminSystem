import service from './request'
import axios from 'axios'

const key = '0351a1cf42b04404a258948d67dc9456'

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

/**
 * 获取一级、二级分类的列表
 * @param parentId
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getCategories(params) {
  return service.request({
    url: '/manage/category/list',
    method: 'GET',
    params
  })
}

/**
 * 添加分类
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addCategory(data) {
  return service.request({
    url: '/manage/category/add',
    method: 'POST',
    data
  })
}

/**
 * 更新分类
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function updateCategory(data) {
  return service.request({
    url: '/manage/category/update',
    method: 'POST',
    data
  })
}

export function getWeather(city) {
  return axios
    .get(
      `https://geoapi.qweather.com/v2/city/lookup?location=${city}&key=${key}`
    )
    .then((response) => {
      return axios.get(
        `https://devapi.qweather.com/v7/weather/now?location=${
          response.data.location && response.data.location[0].id
        }&key=${key}`
      )
    })
}

/**
 * 获取商品列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getProducts(params) {
  return service.request({
    url: '/manage/product/list',
    method: 'GET',
    params
  })
}

/**
 * 搜索商品
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function searchProducts(params) {
  return service.request({
    url: '/manage/product/search',
    method: 'GET',
    params
  })
}

/**
 * 根据分类id查询名称
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getCategory(params) {
  return service.request({
    url: '/manage/category/info',
    method: 'GET',
    params
  })
}

/**
 * 更新商品的上下架状态 1上架 2下架
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function updateStatus(data) {
  return service.request({
    url: '/manage/product/updateStatus',
    method: 'POST',
    data
  })
}

/**
 * 删除图片
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function deleteImage(data) {
  return service.request({
    url: '/manage/img/delete',
    method: 'POST',
    data
  })
}

/**
 * 添加商品
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addProduct(data) {
  return service.request({
    url: '/manage/product/add',
    method: 'POST',
    data
  })
}

/**
 * 更新商品
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function updateProduct(data) {
  return service.request({
    url: '/manage/product/update',
    method: 'POST',
    data
  })
}

/**
 * 获取角色列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getRoles() {
  return service.request({
    url: '/manage/role/list',
    method: 'GET'
  })
}

/**
 * 添加角色
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addRoles(data) {
  return service.request({
    url: '/manage/role/add',
    method: 'POST',
    data
  })
}

/**
 * 添加角色
 * @returns {Promise<AxiosResponse<any>>}
 */
export function updateRole(data) {
  return service.request({
    url: '/manage/role/update',
    method: 'POST',
    data
  })
}
