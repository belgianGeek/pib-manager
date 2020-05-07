const returnDocument = (elt, confirmationElt) => {
  let confirmationTimeout;

  $(confirmationElt).click(() => {
    confirmation();

    confirmationTimeout = setTimeout(() => {
      $(elt)
        .fadeOut(() => {
          confirmation();

          $(elt)
            .removeAttr('style')
            .toggleClass('hidden flex');

          $('.home').toggleClass('hidden flex');
          $('.header__icon, .header__msg').toggleClass('hidden');
        })
    }, 5000);
  });

  $('.confirmation__body__cancel').click(() => {
    clearTimeout(confirmationTimeout);
  });
}

const sendDeletion = elt => {
  $(`${elt}__btn`).click(event => {
    event.preventDefault();
    let table = '';

    if (elt === '.outReturns__step3') {
      table = 'out_requests';
    } else {
      table = 'in_requests';
    }

    console.log({
      table: table,
      data: $(`${elt}__input`).val()
    });

    socket.emit('delete data', {
      table: table,
      data: $(`${elt}__input`).val()
    });
  });
}

returnDocument('.inReturns__step3', '.inReturns__step3__confirmation');
returnDocument('.outReturns__step3', '.outReturns__step3__confirmation');

sendDeletion('.outReturns__step3');
sendDeletion('.inReturns__step3');
