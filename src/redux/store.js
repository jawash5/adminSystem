import { createStore, applyMiddleware, combineReducers } from 'redux'
import header from './reducers/header-reducer'
import user from './reducers/user-reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const allReducer = combineReducers({
  header,
  user
})

export default createStore(
  allReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
