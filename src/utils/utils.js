
/**
  Validator for Date of Birth
  If the year only is selected, return true.
  If all the values are selected, return true.
  Else return false
*/
export const dateOfBirthValidator = (value) => {
  if(value['day'] == "" && value['month'] == "" && value['year'] != "") {
    return true
  }
  if(value['day'] != "" && value['month'] != "" && value['year'] != "") {
    return true
  }
  return false
}

/**
  Validator for End of onset date
*/
export const endOfOnsetValidator = () => {

}

/**
  validator 
*/
