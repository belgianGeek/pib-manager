let initialPibNb, initialBarcode;
const inRequests = () => {
  let barcode = $('.inRequests__form__docInfo__inv');
  let inRequestsTimeOut;

  autocomplete('.inRequests__form__readerInfo__container__name', '.inRequests__form__readerInfo__container__autocomplete');
  autocomplete('.inRequests__step4__container__reader', '.inRequests__step4__container__autocomplete');


  socket.on('barcode', code => {
    initialBarcode = code;
    barcode.val(code);

    JsBarcode('.inRequests__barcode__svg', code, barcodeOptions);
  });

  let dataset = '.inRequests__form__readerInfo__container__autocomplete';
  let readerName = $('.inRequests__form__readerInfo__container__name');
  let pibNb = $('.inRequests__form__pibInfo__pibNb');
  let borrowingLibrary = $('.inRequests__form__pibInfo__borrowingLibrary');
  let requestDate = $('.inRequests__form__pibInfo__requestDate');
  let loanLibrary = $('.inRequests__form__pibInfo__loanLibrary');
  let title = $('.inRequests__form__docInfo__title');
  let authorField = $('.inRequests__form__docInfo__author');
  let cdu = $('.inRequests__form__docInfo__cdu');

  // Séparer le nom de l'auteur de son prénom
  let author = '';

  $('.inRequests__form__docInfo__inv').on('input', function() {
    if ($(this).val().length < 14) {
      $(this).addClass('invalid');
      validationErr = true;
    } else if ($(this).val().length === 14 && $(this).val() !== initialBarcode) {
      if ($('.inRequests').hasClass('absolute')) {
        socket.emit('barcode verification', {
          code: $(this).val(),
          pib_number: initialPibNb
        });
      } else {
        if (pibNb.val() !== '') {
          socket.emit('barcode verification', {
            code: $(this).val(),
            pib_number: pibNb.val()
          });
        }
      }
    } else if ($(this).val() === initialBarcode) {
      $(this).removeClass('invalid');
      validationErr = false;
      $('form .warning').remove();
      JsBarcode('.inRequests__barcode__svg', initialBarcode, barcodeOptions);
    }
  });

  socket.on('barcode verified', code => {
    if (code !== 'used' || code === initialBarcode) {
      $(this).removeClass('invalid');
      validationErr = false;

      $('form .warning').remove();
      JsBarcode('.inRequests__barcode__svg', code, barcodeOptions);
    } else {
      validationErr = true;

      if (!$('form .warning').length) {
        let warning = $('<span></span>')
          .addClass('warning')
          .text('Ce code-barres est déjà pris ou n\'existe pas...')
          .appendTo('.inRequests__form');
      }
    }
  });

  $('.inRequests__form').submit(event => {
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

    // Titre du document
    if (title.val() === '') {
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
    } else {
      invalid(authorField);
    }

    if (cdu.val() === '') {
      invalid(cdu);
    }

    if (barcode.val() === '' || barcode.val().length !== 14) {
      invalid(barcode);
    } else {
      if ($('.inRequests').hasClass('absolute')) {
        socket.emit('barcode verification', {
          code: barcode.val(),
          pib_number: initialPibNb
        });
      } else {
        if (pibNb.val() !== '') {
          socket.emit('barcode verification', {
            code: barcode.val(),
            pib_number: pibNb.val()
          });
        }
      }
    }

    if (!validationErr) {
      $('.input').removeClass('invalid');
      $('form .warning').hide();

      confirmation();

      // Avoid style modification while updating a record through the search module
      if (!$('.inRequests').hasClass('absolute')) {
        $(`.inRequests__step2`)
          .removeClass('translateXonwards translateXbackwards hidden fixed')
          .addClass('flex');
      }

      let outProvince = $('.inRequests__form__pibInfo__outProvince').is(':checked');

      // Escape apostrophes
      borrowingLibrary.val(borrowingLibrary.val().replace(/'/g, "''"));
      loanLibrary.val(loanLibrary.val().replace(/'/g, "''"));
      readerName.val(readerName.val().replace(/'/g, "''"));
      title.val(title.val().replace(/'/g, "''"));

      inRequestsTimeOut = setTimeout(() => {
        data2send.values.push(pibNb.val());
        data2send.values.push(borrowingLibrary.val());

        // Store the date as timestamp
        data2send.values.push(new Date(requestDate.val()).toUTCString());
        data2send.values.push(loanLibrary.val());
        data2send.values.push(readerName.val());
        data2send.values.push(title.val());

        // Si le nom de l'auteur est n'est pas de forme NOM, Prénom
        if (author.indexOf(',') === -1) {
          // On change la valeur de data2send.authorFirstName car la condition est fausse
          data2send.authorFirstName = false;
          data2send.values.push(author);
        } else {
          author = author.split(',');
          // Escape apostrophes in the author's name
          author[0] = author[0].replace(/'/g, "''");

          data2send.values.push(author[0].trim(), author[1].trim());
        }

        data2send.values.push(cdu.val());
        data2send.values.push(outProvince);
        data2send.values.push(barcode.val());

        // Send data to the server
        // If the form do not have the class 'absolute', append data to the DB and proceed to the next step
        if (!$('.inRequests').hasClass('absolute')) {
          socket.emit('append data', data2send);

          $('.inRequests__step2').toggleClass('hidden flex');

          // Suppression du code-barres inventaire précédent
          $('.inRequests__step2__barcode .inRequests__barcode__svg').remove();

          $('.inRequests__form .input').not('.inRequests__form__pibInfo__requestDate, .inRequests__form__pibInfo__loanLibrary, .inRequests__form__docInfo__inv').val('');

          $('.home').toggleClass('hidden flex');
          $('.header__container__icon, .header__container__msg').toggleClass('hidden');
        } else {
          // Else, update the existing record and hide the update form

          // Append the initial pib number to the array to send to the server as it'll be the key to update the specified record
          data2send.key = initialPibNb;

          data2send.barcode = initialBarcode;

          $('.inRequests.absolute').toggleClass('hidden flex');
          $('.wrapper').toggleClass('backgroundColor blur');

          socket.emit('update', data2send);

          // Hide the button to hide the form
          $('.inRequests.absolute .inRequests__form__btnContainer__hide').toggleClass('hidden');
        }

        confirmation();

        data2send.values = [];
      }, 5000);
    } else {
      if (!$('form .warning').length) {
        let warning = $('<span></span>')
          .addClass('warning')
          .text('Certains champs sont incorrects...')
          .appendTo('.inRequests__form');
      };

      validationErr = false;

      // Empty the data2send.values array to avoid validation errors
      data2send.values = [];
    }
  });

  $('.inRequests__form__btnContainer__reset').click(() => {
    $('.input').removeClass('invalid');
    $('form .warning').hide();
    validationErr = false;
    data2send.values = [];
  });

  $('.inRequests__step4__container').submit(event => {
    event.preventDefault();

    let readerName = $('.inRequests__step4__container__reader');
    let bookTitle = $('.inRequests__step4__container__title');
    let mail = $('.inRequests__step4__container__mail');

    // Reader's name
    if (readerName.val() === '') {
      invalid(readerName);
    }

    // Date de la demande
    if (bookTitle.val() === '') {
      invalid(bookTitle);
    }

    // Bibliothèque prêteuse
    if (mail.val() === '') {
      invalid(mail);
    }

    if (!validationErr) {
      confirmation();

      inRequestsTimeOut = setTimeout(() => {
        confirmation();

        $('.inRequests__step4').toggleClass('hidden flex');
        $('.home').toggleClass('hidden flex');
        $('.header__container__icon, .header__container__msg').toggleClass('hidden');

        setTimeout(() => {
          // Send the notification email to the reader when the user is back to the homescreen
          socket.emit('send mail', {
            name: $('.inRequests__step4__container__reader').val(),
            mail: $('.inRequests__step4__container__mail').val(),
            gender: inRequestsReaderGender,
            request: $('.inRequests__step4__container__title').val()
          });
        }, 1000);
      }, 5000);
    } else {
      if (!$('form .warning').length) {
        let warning = $('<span></span>')
          .addClass('warning')
          .text('Certains champs sont incorrects...')
          .appendTo('.inRequests__step4__container');
      };

      validationErr = false;
    }
  });

  $('.confirmation__body__cancel').click(() => {
    clearTimeout(inRequestsTimeOut);
  });
}

inRequests();
