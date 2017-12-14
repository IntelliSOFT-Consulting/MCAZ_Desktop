import { SET_SETTING } from '../actions/actionTypes'
const settings = (state = {}, action) => {
  switch(action.type) {
    case SET_SETTING:
      if(action.setting) {
        return Object.assign({}, state, action.setting)
      }
      return state
    default:
      return state 
  }
}

export default settings
