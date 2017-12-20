import { LOGGED_IN, LOGOUT } from '../actions/actionTypes'
const user = (state = {}, action) => {
  switch(action.type) {
    case LOGGED_IN:
      if(action.user) {
        return action.user
      }
      return state
    case LOGOUT:
      state.token = null
      return Object.assign({}, state)
    default:
      return state // The main page is the default page.
  }
}

export default user
