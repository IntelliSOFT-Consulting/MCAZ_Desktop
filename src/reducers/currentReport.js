import { SET_REPORT } from '../actions/actionTypes'
const currentReport = (state = null, action) => {
  switch(action.type) {
    case SET_REPORT:
      if(action.model)
        return action.model
      return null
    default:
      return state // The main page is the default page.
  }
}

export default currentReport
