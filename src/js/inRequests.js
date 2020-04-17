$('.inRequests__form__pibInfo__requestDate').val(`${new Date().getFullYear()}-${month}-${day}`);

let barcode = $('.inRequests__form__docInfo__inv');

socket.on('barcode', data => {
  if ($('.inRequests__barcode svg').length) {
    $('.inRequests__barcode svg').replaceWith(data.code);
  } else {
    $('.inRequests__barcode').append(data.code);
    $('.inRequests__barcode svg').attr('id', 'inRequests__barcode__svg');
  }

  barcode.val(data.number);
});

let dataset = '#inRequests__form__readerInfo__dataset';
let readerName = $('.inRequests__form__readerInfo__name');

readerName.keyup(() => {
  socket.emit('retrieve readers', readerName.val());
});

socket.on('readers retrieved', readers => {
  for (const reader of readers) {
    let option = $('<option></option')
      .append(reader.name)
      .appendTo(dataset);
  }
});

$(readerName).focusout(() => {
  $(dataset).empty();
});

$(`${dataset} option`).on('click', () => {
  $(dataset).empty();
});

// Variables utilisées pour le rappel à l'étape 2
let reminderTitle, reminderAuthor;

$('.inRequests__form__btnContainer__submit').click(event => {
  event.preventDefault();
  data2send.table = 'in_requests';

  // N° PIB
  let pibNb = $('.inRequests__form__pibInfo__pibNb');
  if (pibNb.val().match(/\d{6}/)) {
    data2send.values.push(pibNb.val());
  } else {
    invalid(pibNb);
  }

  // Bibliothèque emprunteuse
  let borrowingLibrary = $('.inRequests__form__pibInfo__borrowingLibrary');
  if (borrowingLibrary.val() !== '') {
    data2send.values.push(borrowingLibrary.val());
  } else {
    invalid(borrowingLibrary);
  }

  // Date de la demande
  let requestDate = $('.inRequests__form__pibInfo__requestDate');
  if (requestDate.val() !== '') {
    data2send.values.push(requestDate.val());
  } else {
    invalid(requestDate);
  }

  // Bibliothèque prêteuse
  let loanLibrary = $('.inRequests__form__pibInfo__loanLibrary');
  if (loanLibrary.val() !== '') {
    data2send.values.push(loanLibrary.val());
  } else {
    invalid(loanLibrary);
  }

  // Nom du lecteur
  if (readerName.val() !== '') {
    data2send.values.push(readerName.val());
    data2send.email = {
      send: true,
      receiver: readerName.val()
    };
  } else {
    invalid(readerName);
  }

  // Titre du document
  let title = $('.inRequests__form__docInfo__title');
  if (title.val() !== '') {
    data2send.values.push(title.val());
    reminderTitle = title.val();
  } else {
    invalid(title);
  }

  // Séparer le nom de l'auteur de son prénom
  let author = '';
  let authorField = $('.inRequests__form__docInfo__author');

  if (authorField.val() !== '') {
    // Si le nom de l'auteur est de forme NOM, Prénom
    if (authorField.val().indexOf(',') !== -1) {
      author = authorField.val().split(',');
      data2send.values.push(author[0].toUpperCase().trim(), author[1].trim());
      reminderAuthor = `${author[0].toUpperCase().trim()}, ${author[1].trim()}`;

      // On ne change pas la valeur de data2send.authorFirstName car la condition est vérifiée
    } else {
      // Sinon, il n'y a que le nom de famille
      author = reminderAuthor = authorField.val();
      data2send.values.push(author);

      // On change la valeur de data2send.authorFirstName car la condition est fausse
      data2send.authorFirstName = false;
    }
  } else {
    invalid(authorField);
  }

  let cdu = $('.inRequests__form__docInfo__cdu');
  if (cdu.val() !== '') {
    data2send.values.push(cdu.val());
  } else {
    invalid(cdu);
  }

  let outProvince = $('.inRequests__form__pibInfo__outProvince').is(':checked');
  data2send.values.push(outProvince);

  if (barcode.val() !== '') {
    data2send.values.push(barcode.val());
  } else {
    invalid(barcode.val());
  }

  // Envoi des données au serveur
  if (!validationErr) {
    $('.input').removeClass('invalid');
    $('form .warning').hide();

    // Cloner le QR code pour le réutiliser à l'étape suivante
    $('#inRequests__barcode__svg').clone().appendTo('.inRequests__step2__barcode');
    $('.inRequests__step2__reminder__content__item__title').text(reminderTitle);
    $('.inRequests__step2__reminder__content__item__author').text(reminderAuthor);

    socket.emit('append data', data2send);

    $('.inRequests__form .input').not('.inRequests__form__pibInfo__requestDate, .inRequests__form__pibInfo__loanLibrary, .inRequests__form__docInfo__inv').val('');

    $('.inRequests__step1')
      .fadeOut(() => {

        $('.inRequests__step1')
          .removeAttr('style')
          .toggleClass('hidden flex');
      });

    $(`.inRequests__step2`)
      .fadeIn()
      .removeAttr('style')
      .removeClass('translateXonwards hidden')
      .toggleClass('fixed flex');
  } else {
    if (!$('form .warning').length) {
      let warning = $('<span></span>')
        .addClass('warning')
        .text('Certains champs sont incorrects...')
        .appendTo('.inRequests__form');
    };

    validationErr = false;
  }

  // Vider les champs pour éviter des erreurs lors des prochaines requêtes
  data2send.values = [];
});

$('.inRequests__form__btnContainer__reset').click(() => {
  $('.input').removeClass('invalid');
  $('form .warning').hide();
  validationErr = false;
  data2send.values = [];
});

$('.inRequests__step3__confirmation').click(() => {
  confirmation();

  setTimeout(() => {
    $('.inRequests__step3')
      .fadeOut(() => {
        confirmation();

        $('.inRequests__step3')
          .removeAttr('style')
          .toggleClass('hidden flex');

        $('.home').toggleClass('hidden flex');
        $('.header__icon, .header__msg').toggleClass('hidden');
      })
  }, 5000);
});
