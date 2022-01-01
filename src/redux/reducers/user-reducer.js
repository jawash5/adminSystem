import { getUser } from '../../utils/storage'
import { RECEIVE_USER, RESET_USER } from '../action-types'

const initUser = getUser()

export default function user(preState = initUser, action) {
  const { type, data } = action

  switch (type) {
    case RECEIVE_USER:
      return data
    case RESET_USER:
      return {}
    default:
      return preState
  }
}
