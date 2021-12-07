import axios from 'axios'
import { message } from 'antd'

const service = axios.create({
  timeout: 3000
})

service.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
