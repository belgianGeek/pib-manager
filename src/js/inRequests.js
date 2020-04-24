const inRequests = () => {
  $('.inRequests__form__pibInfo__requestDate').val(`${new Date().getFullYear()}-${month}-${day}`);

  let barcode = $('.inRequests__form__docInfo__inv');
  let inRequestsTimeOut;

  socket.on('barcode', data => {
    if ($('#inRequests__barcode__svg').length) {
      $('#inRequests__barcode__svg').replaceWith(data.code);
      $('.inRequests__barcode svg').attr('id', 'inRequests__barcode__svg');
    } else {
      $('.inRequests__barcode').append(data.code);
      $('.inRequests__barcode svg').attr('id', 'inRequests__barcode__svg');
    }

    barcode.val(data.number);
  });

  let dataset = '#inRequests__form__readerInfo__dataset';
  let readerName = $('.inRequests__form__readerInfo__name');
  let pibNb = $('.inRequests__form__pibInfo__pibNb');
  let borrowingLibrary = $('.inRequests__form__pibInfo__borrowingLibrary');
  let requestDate = $('.inRequests__form__pibInfo__requestDate');
  let loanLibrary = $('.inRequests__form__pibInfo__loanLibrary');
  let title = $('.inRequests__form__docInfo__title');
  let authorField = $('.inRequests__form__docInfo__author');
  let cdu = $('.inRequests__form__docInfo__cdu');
  let outProvince = $('.inRequests__form__pibInfo__outProvince').is(':checked');

  // Séparer le nom de l'auteur de son prénom
  let author = '';

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

  readerName.focusout(() => {
    $(dataset).empty();
  });

  $(`${dataset} option`).on('click', () => {
    $(dataset).empty();
  });

  // Variables utilisées pour le rappel à l'étape 2
  let reminderTitle, reminderAuthor;
  let reminderInv = $('.inRequests__form__docInfo__inv').val();

  $('.inRequests__form__btnContainer__submit').click(event => {
    event.preventDefault();
    data2send.table = 'in_requests';

    // N° PIB
    if (!pibNb.val().match(/\d{6}/)) {
      invalid(pibNb);
    }

    // Bibliothèque emprunteuse
    if (borrowingLibrary.val() === '') {
      invalid(borrowingLibrary);
    }

    // Date de la demande
    if (requestDate.val() === '') {
      invalid(requestDate);
    }

    // Bibliothèque prêteuse
    if (loanLibrary.val() === '') {
      invalid(loanLibrary);
    }

    // Nom du lecteur
    if (readerName.val() === '') {
      invalid(readerName);
    }

    // Titre du document
    if (title.val() !== '') {
      reminderTitle = title.val();
    } else {
      invalid(title);
    }

    if (authorField.val() !== '') {
      reminderAuthor = authorField.val();
    } else {
      invalid(authorField);
    }

    if (cdu.val() === '') {
      invalid(cdu);
    }

    if (barcode.val() === '') {
      invalid(barcode.val());
    }

    if (!validationErr) {
      $('.input').removeClass('invalid');
      $('form .warning').hide();

      // Cloner le QR code pour le réutiliser à l'étape suivante
      $('#inRequests__barcode__svg').clone().appendTo('.inRequests__step2__barcode');
      $('.inRequests__step2__reminder__content__item__title').text(reminderTitle);
      $('.inRequests__step2__reminder__content__item__author').text(reminderAuthor);
      $('.inRequests__step2__reminder__content__item__inv').text(reminderInv);

      $('.inRequests__step1')
        .fadeOut(() => {
          $('.inRequests__step1')
            .removeAttr('style')
            .toggleClass('hidden flex');
        });

      $(`.inRequests__step2`)
        .fadeIn()
        .removeAttr('style')
        .removeClass('translateXonwards translateXbackwards hidden')
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

    inRequestsTimeOut = setTimeout(() => {
      data2send.values.push(pibNb.val());
      data2send.values.push(borrowingLibrary.val());
      data2send.values.push(requestDate.val());
      data2send.values.push(loanLibrary.val());
      data2send.values.push(readerName.val());
      data2send.email = {
        send: true,
        receiver: readerName.val()
      };
      data2send.values.push(title.val());

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

      data2send.values.push(cdu.val());
      data2send.values.push(outProvince);
      data2send.values.push(barcode.val());

      // Envoi des données au serveur
      socket.emit('append data', data2send);
      data2send.values = [];

      $('.inRequests__step3')
        .fadeOut(() => {
          confirmation();

          // Suppression du code-barres inventaire précédent
          $('.inRequests__step2__barcode #inRequests__barcode__svg').remove();

          $('.inRequests__form .input').not('.inRequests__form__pibInfo__requestDate, .inRequests__form__pibInfo__loanLibrary, .inRequests__form__docInfo__inv').val('');

          $('.inRequests__step3')
            .removeAttr('style')
            .toggleClass('hidden flex');

          $('.home').toggleClass('hidden flex');
          $('.header__icon, .header__msg').toggleClass('hidden');
        });
    }, 5000);
  });

  $('.confirmation__body__cancel').click(() => {
    $('.confirmation')
      .fadeOut(function() {
        $(this)
          .addClass('hidden')
          .removeClass('flex')
          .removeAttr('style');

        $('.wrapper, .header').removeClass('blur');

        clearTimeout(inRequestsTimeOut);
      });
  });
}

inRequests();
