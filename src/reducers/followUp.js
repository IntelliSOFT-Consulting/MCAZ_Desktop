import { SAVE_UPLOADED_FOLLOW_UP_REPORT, SAVE_FETCHED_FOLLOW_UP_REPORTS, REMOVE_UPLOADED_FOLLOW_UP_REPORT } from '../actions/actionTypes'
const followup = (state = [], action) => {
  switch(action.type) {
    case SAVE_UPLOADED_FOLLOW_UP_REPORT:
      if(state == null || state.length == 0) {
        return [...state, action.data]
      } else {
        const index = state.findIndex((report) => report.rid == newReport.rid )
        if(index == -1) {
          state.push(newReport)
        } else {
          state[index] = newReport
        }
      }
      return [...state]
    case SAVE_FETCHED_FOLLOW_UP_REPORTS:
      if(action.data) {
        return state.concat(action.data)
      }
      return state
    case REMOVE_UPLOADED_FOLLOW_UP_REPORT:
      const newReport = action.data
      if(state.length == 0){
        return state
      }
      return state.filter((report) => report.rid != newReport.rid)
    default:
      return state // Return the current state.

  }
}

export default followup
