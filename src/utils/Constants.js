
/**
  Various constants
*/

// Report types
export const REPORT_TYPE_ADR = 'REPORT_TYPE_ADR'
export const REPORT_TYPE_SAE = 'REPORT_TYPE_SAE'
export const REPORT_TYPE_AEFI_INV = 'REPORT_TYPE_AEFI_INV' // REPORT_TYPE_AEFI_INV
export const REPORT_TYPE_AEFI = 'REPORT_TYPE_AEFI'

// Follow-ups
export const REPORT_TYPE_ADR_FOLLOW_UP = 'REPORT_TYPE_ADR_FOLLOW_UP'
export const REPORT_TYPE_AEFI_FOLLOW_UP = 'REPORT_TYPE_AEFI_FOLLOW_UP'

// Report status
export const STATUS_DRAFT = 'STATUS_DRAFT'
export const STATUS_COMPLETED = 'STATUS_COMPLETED'
export const STATUS_UPLOADED = 'STATUS_UPLOADED'

export const MAIN_URL = 'http://45.79.130.91/api'

export const MAIN_PAGE = 'MAIN_PAGE' // The main page
export const ADR_FORM_PAGE = 'ADR_FORM_PAGE'
export const SAE_FORM_PAGE = 'SAE_FORM_PAGE'
export const AEFI_REPORT_PAGE = 'AEFI_REPORT_PAGE'
export const AEFI_INV_PAGE = 'AEFI_INV_PAGE'
export const REPORTS_LIST_PAGE = 'REPORTS_LIST_PAGE'
export const READ_ONLY_PAGE = 'READ_ONLY_PAGE'
export const LOGIN_PAGE = 'LOGIN_PAGE'
export const SIGNUP_PAGE = 'SIGNUP_PAGE'
export const NEWS_PAGE = 'NEWS_PAGE'

export const ADR_FOLLOW_UP_PAGE = 'ADR_FOLLOW_UP_PAGE'
export const AEFI_FOLLOW_UP_PAGE = 'AEFI_FOLLOW_UP_PAGE'

export const ADR_URL = MAIN_URL + '/sadrs' // Url for ADR
export const SAE_URL = MAIN_URL + '/adrs' // Url for SAE
export const AEFI_URL = MAIN_URL + '/aefis' // Url for AEFI
export const SAEFI_URL = MAIN_URL + '/saefis' // Url for SAEFI
export const LOGIN_URL = MAIN_URL + '/users/token' // Url for login
export const SIGNUP_URL = MAIN_URL + '/users/register' // Url for signup
export const CONTACT_US_URL = MAIN_URL + '/users/register' // Url for contact us
export const NEWS_URL = MAIN_URL + '/sites/news' // Url to fetch news
