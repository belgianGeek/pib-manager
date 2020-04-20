const invalid = (element) => {
  element.addClass('invalid');
  validationErr = true;
}

let outRequestsTimeOut = '';

$('.outRequests__form__pibInfo__requestDate').val(`${new Date().getFullYear()}-${month}-${day}`);

$('.outRequests__form__btnContainer__submit').click(event => {
  event.preventDefault();
  data2send.table = 'out_requests';

  // N° PIB
  let pibNb = $('.outRequests__form__pibInfo__pibNb');
  if (pibNb.val().match(/\d{6}/)) {
    data2send.values.push(pibNb.val());
  } else {
    invalid(pibNb);
  }

  // Bibliothèque emprunteuse
  let borrowingLibrary = $('.outRequests__form__pibInfo__borrowingLibrary');
  if (borrowingLibrary.val() !== '') {
    data2send.values.push(borrowingLibrary.val());
  } else {
    invalid(borrowingLibrary);
  }

  // Date de la demande
  let requestDate = $('.outRequests__form__pibInfo__requestDate');
  if (requestDate.val() !== '') {
    data2send.values.push(requestDate.val());
  } else {
    invalid(requestDate);
  }

  // Bibliothèque prêteuse
  let loanLibrary = $('.outRequests__form__pibInfo__loanLibrary');
  if (loanLibrary.val() !== '') {
    data2send.values.push(loanLibrary.val());
  } else {
    invalid(loanLibrary);
  }

  // Titre du document
  let title = $('.outRequests__form__docInfo__title');
  if (title.val() !== '') {
    data2send.values.push(title.val());
  } else {
    invalid(title);
  }

  // Séparer le nom de l'auteur de son prénom
  let author = '';
  let authorField = $('.outRequests__form__docInfo__author');

  if (authorField.val() !== '') {
    // Si le nom de l'auteur est de forme NOM, Prénom
    if (authorField.val().indexOf(',') !== -1) {
      author = authorField.val().split(',');
      data2send.values.push(author[0].toUpperCase().trim(), author[1].trim());

      // On ne change pas la valeur de data2send.authorFirstName car la condition est vérifiée
    } else {
      // Sinon, il n'y a que le nom de famille
      author = authorField.val();
      data2send.values.push(author);

      // On change la valeur de data2send.authorFirstName car la condition est fausse
      data2send.authorFirstName = false;
    }
  } else {
    invalid(authorField);
  }

  let cdu = $('.outRequests__form__docInfo__cdu');
  if (cdu.val() !== '') {
    data2send.values.push(cdu.val());
  } else {
    invalid(cdu);
  }

  let outProvince = $('.outRequests__form__pibInfo__outProvince').is(':checked');
  data2send.values.push(outProvince);

  if (!validationErr) {
    $('.input').removeClass('invalid');
    $('form .warning').hide();

    confirmation();

    outRequestsTimeOut = setTimeout(() => {
      $('.outRequests__step3')
        .fadeOut(() => {
          confirmation();

          $('.outRequests__step3')
            .removeAttr('style')
            .toggleClass('hidden flex');

          $('.home').toggleClass('hidden flex');
          $('.header__icon, .header__msg').toggleClass('hidden');
        });

      $('.outRequests__form .input').not('.outRequests__form__pibInfo__requestDate, .outRequests__form__pibInfo__loanLibrary').val('');
      socket.emit('append data', data2send);
    }, 5000);
  } else {
    if (!$('form .warning').length) {
      let warning = $('<span></span>')
        .addClass('warning')
        .text('Certains champs sont incorrects...')
        .appendTo('.outRequests__form');
    };

    validationErr = false;
    data2send.values = [];
  }
});

$('.outRequests__form__btnContainer__reset').click(() => {
  $('.input').removeClass('invalid');
  $('form .warning').hide();
  validationErr = false;
  data2send.values = [];
});

$('.confirmation__body__cancel').click(() => {
  $('.confirmation')
    .fadeOut(function() {
      $(this)
        .addClass('hidden')
        .removeClass('flex')
        .removeAttr('style');

      $('.wrapper, .header').removeClass('blur');

      clearTimeout(outRequestsTimeOut);
    });
});
