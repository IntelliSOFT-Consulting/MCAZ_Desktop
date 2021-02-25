import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, CLEAR_DATA } from '../actions/actionTypes'
const drafts = (state = [], action) => {
  switch(action.type) {
    case CLEAR_DATA:
      return []
    case SAVE_DRAFT_REPORT:
      if(state == null || state.length == 0) {
        return [...state, action.data]
      } else {
        const rep = action.data;
        const index = state.findIndex((report) => report.rid == rep.rid )
        if(index == -1) {
          state.push(rep)
        } else {
          state[index] = rep
        }
      }
      return [...state]
    case REMOVE_DRAFT_REPORT:
      const newReport = action.data
      if(state.length == 0){
        return state
      }
      return state.filter((report) => report.rid != newReport.rid)
    default:
      return state // The main page is the default page.
  }
}

export default drafts
