import { PRINT } from '../actions/actionTypes'

const print = (state = null, action) => {
  switch(action.type) {
    case PRINT:
      if(action.data) {
        return action.data
      }
      return null
    default:
      return state // The main page is the default page.
  }
}

export default print
