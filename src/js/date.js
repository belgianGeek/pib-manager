const setDate = () => {
  let day, month;
  if (new Date().getDate() < '10') {
    day = `0${new Date().getDate()}`;
  } else {
    day = new Date().getDate();
  }

  if (new Date().getMonth() < '10') {
    month = `0${new Date().getMonth() + 1}`;
  } else {
    month = new Date().getMonth() + 1;
  }

  $(
    '.inRequests__form__pibInfo__requestDate,' +
    '.draft__child__container__reader__date input,' +
    '.outRequests__form__pibInfo__requestDate'
  ).val(`${new Date().getFullYear()}-${month}-${day}`);
}

setDate();
