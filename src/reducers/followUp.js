import { SET_FOLLOW_UP } from '../actions/actionTypes'
const followUp = (state = null, action) => {
  switch(action.type) {
    case SET_FOLLOW_UP:
      if(action.followUp)
        return action.followUp
      return null
    default:
      return state // The main page is the default page.
  }
}

export default followUp
