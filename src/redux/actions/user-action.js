import { login } from '../../api'
import { RECEIVE_USER, RESET_USER } from '../action-types'
import { message } from 'antd'
import { removeUser, saveUser } from '../../utils/storage'

const receiveUser = (data) => ({ type: RECEIVE_USER, data })

export const initLogin = (username, password) => {
  return (dispatch) => {
    login({ username, password }).then((response) => {
      if (response.status === 0) {
        const user = response.data
        message.success('登录成功')
        saveUser(user)
        dispatch(receiveUser(user))
      } else {
        const msg = response.msg
        message.error(msg)
      }
    })
  }
}

export const logout = () => {
  removeUser()
  return { type: RESET_USER }
}
