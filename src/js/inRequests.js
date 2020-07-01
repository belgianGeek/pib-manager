const inRequests = () => {
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

  let dataset = '.inRequests__form__readerInfo__container__autocomplete';
  let readerName = $('.inRequests__form__readerInfo__container__name');
  let readerMail = $('.inRequests__form__readerInfo__mail');
  let pibNb = $('.inRequests__form__pibInfo__pibNb');
  let borrowingLibrary = $('.inRequests__form__pibInfo__borrowingLibrary');
  let requestDate = $('.inRequests__form__pibInfo__requestDate');
  let loanLibrary = $('.inRequests__form__pibInfo__loanLibrary');
  let title = $('.inRequests__form__docInfo__title');
  let authorField = $('.inRequests__form__docInfo__author');
  let cdu = $('.inRequests__form__docInfo__cdu');
  let outProvince = $('.inRequests__form__pibInfo__outProvince').is(':checked');

  // Genre du destinataire du mail de rappel
  let gender = '';

  // Séparer le nom de l'auteur de son prénom
  let author = '';

  autocomplete('.inRequests__form__readerInfo__container__name', '.inRequests__form__readerInfo__container__autocomplete');

  // Variables utilisées pour le rappel à l'étape 2
  let reminderTitle, reminderAuthor;
  let reminderInv = $('.inRequests__form__docInfo__inv').val();

  $('.inRequests__form__btnContainer__submit').click(event => {
    event.preventDefault();
    data2send.table = 'in_requests';

    // N° PIB
    if (!pibNb.val().match(/\d{6}/) || pibNb.val().match(/\d{7,}/)) {
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

    // Adresse mail du lecteur
    if (readerMail.val() === '') {
      invalid(readerMail);
    }

    // Titre du document
    if (title.val() !== '') {
      reminderTitle = title.val();
    } else {
      invalid(title);
    }

    if (authorField.val() !== '') {
      // Si le nom de l'auteur est de forme NOM, Prénom
      if (authorField.val().indexOf(',') !== -1) {
        author = authorField.val().split(',');
        author = `${author[0].toUpperCase().trim()}, ${author[1].trim()}`;
      } else {
        // Sinon, il n'y a que le nom de famille
        author = authorField.val();
      }

      reminderAuthor = author;
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
      let clonedSvg = $('#inRequests__barcode__svg').clone();
      if ($('.inRequests__step2__barcode svg').length === 0) {
        clonedSvg.appendTo('.inRequests__step2__barcode');
      } else {
        $('.inRequests__step2__barcode svg').replaceWith(clonedSvg);
      }

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

      // Stocker la date en timestamp
      data2send.values.push(new Date(requestDate.val()).toUTCString());
      data2send.values.push(loanLibrary.val());
      data2send.values.push(readerName.val());
      data2send.email = {
        send: true,
        receiver: readerName.val()
      };
      data2send.values.push(title.val());

      // Si le nom de l'auteur est n'est pas de forme NOM, Prénom
      if (author.indexOf(',') === -1) {
        // On change la valeur de data2send.authorFirstName car la condition est fausse
        data2send.authorFirstName = false;
        data2send.values.push(author);
      } else {
        author = author.split(',');
        data2send.values.push(author[0].trim(), author[1].trim());
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

          // Envoi du mail de notification au lecteur
          socket.emit('send mail', {
            name: readerName.val(),
            mail: readerMail.val(),
            gender: gender,
            request: $('.inRequests__form__docInfo__title').val()
          });

          // Suppression du code-barres inventaire précédent
          $('.inRequests__step2__barcode #inRequests__barcode__svg').remove();

          $('.inRequests__form .input').not('.inRequests__form__pibInfo__requestDate, .inRequests__form__pibInfo__loanLibrary, .inRequests__form__docInfo__inv').val('');

          $('.inRequests__step3')
            .removeAttr('style')
            .toggleClass('hidden flex');

          $('.home').toggleClass('hidden flex');
          $('.header__container__icon, .header__container__msg').toggleClass('hidden');
        });
    }, 5000);
  });

  $('.confirmation__body__cancel').click(() => {
    smartHide('.confirmation', 'out', inRequestsTimeOut);
  });
}

inRequests();
