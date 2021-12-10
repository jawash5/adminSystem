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
