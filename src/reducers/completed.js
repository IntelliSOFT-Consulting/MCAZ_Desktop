import { SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT, CLEAR_DATA, REMOVE_COMPLETED_REPORTS } from '../actions/actionTypes'
const completed = (state = [], action) => {
  switch(action.type) {
    case CLEAR_DATA:
      return []
    case SAVE_COMPLETED_REPORT:
      var newReport = action.data
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
    case REMOVE_COMPLETED_REPORT:
      const completedReport = action.data
      if(state.length == 0){
        return state
      }
      return state.filter((report) => report.rid != completedReport.rid)
    case REMOVE_COMPLETED_REPORTS:
      return []
    default:
      return state // The main page is the default page.

  }
}

export default completed
