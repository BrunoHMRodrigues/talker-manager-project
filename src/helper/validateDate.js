const validateDate = (date) => {
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
  return regexData.test(date)
}

module.exports = validateDate;