const invalid = (element) => {
  element.addClass('invalid');
  validationErr = true;
  console.log(`${element} is invalid !`, validationErr);
}
