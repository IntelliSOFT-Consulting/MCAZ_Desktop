import { SHOW_PAGE } from '../actions/actionTypes'
import { MAIN_PAGE, ADR_FORM_PAGE, SAE_FORM_PAGE, AEFI_REPORT_PAGE, REPORTS_LIST_PAGE, READ_ONLY_PAGE } from '../utils/Constants'

const page = (state = MAIN_PAGE, action) => {
  switch(action.type) {
    case SHOW_PAGE:
      if(action.page) {
        return action.page
      }
      return state
    default:
      return state // The main page is the default page.
  }
}

export default page
