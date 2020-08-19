const confirmation = () => {
  $('.confirmation').toggleClass('hidden flex');
  $('.wrapper, .header, .draft').toggleClass('blur');
  $('.wrapper *').removeClass('translateXbackwards');
}

const handleHomeBtnClick = (element, parent) => {
  $(`.home__${parent}__${element}`).click(() => {
    $('.home')
      .fadeOut(() => {
        $(`.${element}__step1`)
          .fadeIn(() => {
            $(`.${element}__step1`)
              .toggleClass('hidden flex')
              .removeAttr('style');
          });

        setTimeout(() => {
          $('.home')
            .toggleClass('flex hidden')
            .removeAttr('style');

          $('.returnIcon, .header__container__msg')
            .removeClass('hidden');
        }, 1000);
      });
  });
}

handleHomeBtnClick('outRequests', 'btnContainer');
handleHomeBtnClick('inRequests', 'btnContainer');
handleHomeBtnClick('inReturns', 'btnContainer');
handleHomeBtnClick('outReturns', 'btnContainer');
handleHomeBtnClick('addReader', 'optionsContainer');


// Connexion au websocket
const socket = io();
let barcodeOptions = {
  format: 'CODE39',
  lineColor: "#000000",
  displayValue: true
};

let data2send = {
  table: '',
  values: [],
  authorFirstName: true
};

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Tous les champs du formulaire sont-ils complets ?
let validationErr = false;

const handleSimpleStep = (element, step1, step2, btn) => {
  $(`${element}__${step1}__${btn}`).click(() => {
    if (!validationErr) {
      $(`${element}__${step1}`).toggleClass('translateXbackwards hidden flex');
      setTimeout(() => {
        $(`${element}__${step2}`)
          .fadeIn()
          .removeAttr('style')
          .removeClass('translateXonwards hidden')
          .toggleClass('fixed flex');
      }, 1000);
    }
  });
}

handleSimpleStep('.inRequests', 'step2', 'step3', 'btn');
handleSimpleStep('.outRequests', 'step1', 'step2', 'btn');
handleSimpleStep('.outRequests', 'step2', 'step3', 'confirmation');
handleSimpleStep('.inReturns', 'step1', 'step2', 'btn');
handleSimpleStep('.inReturns', 'step2', 'step3', 'confirmation');
handleSimpleStep('.outReturns', 'step1', 'step2', 'btn');
handleSimpleStep('.outReturns', 'step2', 'step3', 'confirmation');

$('.returnIcon').click(() => {
  const backHome = step => {
    $(step)
      .removeClass('translateXbackwards')
      .toggleClass('translateXonwards hidden');
    $('.home').toggleClass('hidden flex');
    $('.returnIcon, .header__container__msg').toggleClass('hidden');

    setTimeout(() => {
      $(step).toggleClass('translateXonwards flex');
    }, 500);
  }

  const goBack = (elt1, elt2) => {
    if (elt1.match('step1')) {
      if ($(elt1).is(':visible')) {
        backHome(elt1);
      }
    } else {
      if ($(elt1).is(':visible')) {
        $(elt1).toggleClass('translateXonwards flex hidden');

        $(elt2)
          .removeClass('translateXbackwards')
          .toggleClass('hidden flex');
      }
    }
  }

  goBack('.outRequests__step1');
  goBack('.inRequests__step1');
  goBack('.inReturns__step1');
  goBack('.outReturns__step1');
  goBack('.addReader__step1');

  goBack('.outRequests__step2', '.outRequests__step1');
  goBack('.outRequests__step3', '.outRequests__step2');
  goBack('.inRequests__step2', '.inRequests__step1');
  goBack('.inRequests__step3', '.inRequests__step2');
  goBack('.inReturns__step2', '.inReturns__step1');
  goBack('.inReturns__step3', '.inReturns__step2');
  goBack('.outReturns__step2', '.outReturns__step1');
  goBack('.outReturns__step3', '.outReturns__step2');
});


const invalid = (element) => {
  element.addClass('invalid');
  validationErr = true;
  console.log(`${element} is invalid !`, validationErr);
}

socket.on('notification', notification => {
  if (notification.type === 'success') {
    $('.notification__icon').attr('src', './src/scss/icons/thumbs-up.svg');
    $('.notification').addClass('notificationSuccess');
    $('.notification__msg').text('Changements enregistrés avec succès ! 😉');
  } else if (notification.type === 'error') {
    $('.notification__icon').attr('src', './src/scss/icons/error.svg');
    $('.notification').addClass('notificationFailure');
    $('.notification__msg').text('Une erreur s\'est produite... 😱');
  } else if (notification.type === 'info') {
    $('.notification__icon').attr('src', './src/scss/icons/info.svg');
    $('.notification').addClass('notificationInfo');
    $('.notification__msg').text('Aucune donnée correspondante n\'a été trouvée... 😶');
  } else if (notification.type === 'mail') {
    $('.notification__icon').attr('src', './src/scss/icons/mail.svg');
    $('.notification').addClass('notificationMail');
    $('.notification__msg').text('Mail envoyé au lecteur 😎');
  }

  $('.notification').toggleClass('hidden flex');

  setTimeout(() => {
    $('.notification')
      .fadeOut(function() {
        $(this)
          .removeAttr('style')
          .removeClass('notificationSuccess notificationFailure notificationInfo')
          .toggleClass('flex hidden');
      });
  }, 5000);
});


const smartHide = (className, method, timeout) => {
  console.log('smartHide');
  if (method === 'in') {
    $(className)
      .fadeIn(function() {
        $(this)
          .toggleClass('hidden flex')
          .removeAttr('style');

        $('.wrapper, .header').removeClass('blur');
      });
  } else {
    $(className)
      .fadeOut(function() {
        $(this)
          .toggleClass('hidden flex')
          .removeAttr('style');

        $('.wrapper, .header').removeClass('blur');

        if (timeout !== undefined) {
          clearTimeout(timeout);
        }
      });
  }
}


const addReader = () => {
  let addReaderTimeout;
  let readerName = $('.addReader__step1__form__nameContainer__readerName');
  let readerFirstname = $('.addReader__step1__form__nameContainer__readerFirstName');
  let mail = $('.addReader__step1__form__email__input');
  let gender = '';

  $('.addReader__step1__form__btnContainer__submit').click(event => {
    event.preventDefault();
    data2send.table = 'readers';

    // Déterminer le genre du lecteur
    $('.addReader__step1__form input.radio').each(function() {
      if ($(this).is(':checked')) {
        gender = $(this).val();
      }
    });

    if (readerName.val() === '') {
      invalid(readerName);
    }

    if (readerFirstname.val() === '') {
      invalid(readerFirstname);
    }

    if (!validationErr) {
      $('.input').removeClass('invalid');
      $('form .warning').hide();

      confirmation();

      addReaderTimeout = setTimeout(function() {
        data2send.values.push(`${capitalizeFirstLetter(readerName.val())}, ${capitalizeFirstLetter(readerFirstname.val())}`);

        if (mail.val() !== '') {
          data2send.values.push(`mailto:${mail.val()}`);
        }

        data2send.values.push(gender);

        socket.emit('append data', data2send);
        data2send.values = [];

        $('.addReader__step1')
          .fadeOut(function() {
            confirmation();

            $(this)
              .removeAttr('style')
              .toggleClass('hidden flex');

            $('.home').toggleClass('hidden flex');
            $('.header__container__icon, .header__container__msg').toggleClass('hidden');

            $('.addReader__step1 input').not('.radio').val('');
          });
      }, 5000);
    } else {
      if (!$('form .warning').length) {
        let warning = $('<span></span>')
          .addClass('warning')
          .text('Certains champs sont incorrects...')
          .appendTo('.addReader__step1__form');
      };

      validationErr = false;
      data2send.values = [];
    }
  });

  $('.addReader__form__btnContainer__reset').click(() => {
    $('.input').removeClass('invalid');
    $('form .warning').hide();
    validationErr = false;
    data2send.values = [];
  });

  $('.confirmation__body__cancel').click(() => {
    clearTimeout(addReaderTimeout);
  });
}

addReader();


const autocomplete = (input, dataset) => {
  $(input).keyup(() => {
    socket.emit('retrieve readers', $(input).val());
  });

  socket.on('readers retrieved', readers => {
    $(input)
      .css({
        marginBottom: 0,
        borderBottom: "2px solid transparent"
      });

    // Positionner les suggestions
    $(input).ready(() => {
      let position = $(input).position();
      $(dataset).css({
        left: position.left,
        top: position.top + $(input).outerHeight() + 12,
        width: $(input).outerWidth()
      });
    });

    $(dataset)
      .empty()
      .toggleClass('hidden flex');

    for (const reader of readers) {
      if (!$(`.${reader.name.match(/[^,\s]/gi).join('')}`).length) {
        let option = $('<p></p>')
          .append(reader.name)
          .addClass(reader.name.match(/[^,\s]/gi).join(''))
          .appendTo(dataset);

        option.click(function() {
          $(input)
            .val($(this).text())
            .removeAttr('style');

          $(dataset)
            .toggleClass('hidden flex')
            .empty();

          if (input === '.inRequests__form__readerInfo__container__name') {
            socket.emit('mail request', $(this).text());

            socket.on('mail retrieved', receiver => {
              $('.inRequests__form__readerInfo__mail').val(receiver.mail);
              gender = receiver.gender[0];
            });
          }
        });
      }
    }
  });

  $(input).focusout(() => {
    $(input).removeAttr('style', () => {
      $(dataset)
        .toggleClass('hidden flex')
        .empty();
    });
  });

  $(dataset).focusout(function() {
    $(this)
      .toggleClass('hidden flex')
      .empty();
  });
}

const setDate = () => {
  // Récupérer la date du jour et l'utiliser comme valeur pour les champs date
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

const exportDB = () => {
  let format = '';

  // Définir le frmat choisi par l'utilisateur
  $('.export__child__container__format input.radio').each(function() {
    if ($(this).is(':checked')) {
      format = $(this).val();
    }
  });

  socket.emit('export db', format);
  format = '';
}

$('.header__actionsContainer__importExport').click(() => {
  smartHide('.export', 'in');
  format = '';
});

$('.export .btn--submit').click(() => {
  exportDB();
});

$('.export .btn--reset').click(() => {
  smartHide('.export', 'out');
});

socket.on('export successfull', () => {
  console.log('success !');
  smartHide('.export', 'out');
  window.open('/download');
});


const draftNewRequest = () => {
  let reader = '.draft__child__container__reader__name input';
  let date = '.draft__child__container__reader__date input';
  let title = '.draft__child__container__reader__bookTitle input';
  let comment = $('.draft__child__container__comment__textarea');

  let draftTimeOut;

  $('.header__actionsContainer__draft').click(() => {
    smartHide('.draft', 'in');
  });

  autocomplete('.draft__child__container__reader__name input', '.draft__child__container__reader__label__autocomplete');

  $('.draft__child__container__reader').submit(event => {
    event.preventDefault();
    data2send.table = 'drafts';

    if ($(reader).val() === '') {
      invalid($(reader));
    }

    if ($(date).val() === '') {
      invalid($(date));
    }

    if ($(title).val() === '') {
      invalid($(title));
    }

    if (!validationErr) {
      $('.input').removeClass('invalid');
      $('.draft__child__container__reader .warning').hide();

      confirmation();

      draftTimeOut = setTimeout(() => {
        data2send.values.push($(reader).val());

        // Stocker la date en timestamp
        data2send.values.push(new Date($(date).val()).toUTCString());
        data2send.values.push($(title).val());

        if (comment.val() !== '') {
          data2send.values.push(comment.val());
        } else {
          data2send.values.push('/');
        }

        // Envoi des données au serveur
        socket.emit('append data', data2send);
        data2send.values = [];

        $('.draft')
          .fadeOut(() => {
            confirmation();

            $('.draft__child__container .input, .draft__child__container textarea').not('.draft__child__container__reader__date input').val('');

            $('.draft')
              .removeAttr('style')
              .toggleClass('hidden flex');
          });
      }, 5000);
    } else {
      if (!$('.draft__child__container__reader .warning').length) {
        let warning = $('<span></span>')
          .addClass('warning')
          .text('Certains champs sont incorrects...')
          .appendTo('.draft__child__container__reader');
      };

      validationErr = false;
    }

    // Vider les champs pour éviter des erreurs lors des prochaines requêtes
    data2send.values = [];
  });

  $('.draft__child__container__reader__btnContainer__reset').click(() => {
    smartHide('.draft', 'out');
    $('.input').removeClass('invalid');
    $('form .warning').hide();
    validationErr = false;
    data2send.values = [];
  });

  $('.confirmation__body__cancel').click(() => {
    clearTimeout(draftTimeOut);
  });
}

draftNewRequest();

let initialPibNb;
const inRequests = () => {
  let barcode = $('.inRequests__form__docInfo__inv');
  let inRequestsTimeOut;

  autocomplete('.inRequests__form__readerInfo__container__name', '.inRequests__form__readerInfo__container__autocomplete');

  socket.on('barcode', code => {
    barcode.val(code);

    JsBarcode('.inRequests__barcode__svg', code, barcodeOptions);
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

  // Variables utilisées pour le rappel à l'étape 2
  let reminderTitle, reminderAuthor;
  let reminderInv = barcode.val();

  const sendData = () => {
    confirmation();

    inRequestsTimeOut = setTimeout(() => {
      data2send.values.push(pibNb.val());
      data2send.values.push(borrowingLibrary.val());

      // Stocker la date en timestamp
      data2send.values.push(new Date(requestDate.val()).toUTCString());
      data2send.values.push(loanLibrary.val());
      data2send.values.push(readerName.val());

      // We don't send a confirmation email to the reader if we're updating a record
      if (!$('.inRequests').hasClass('absolute')) {
        data2send.email = {
          send: true,
          receiver: readerName.val()
        };
      }
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

      // Send data to the server
      // If the form has the class 'absolute', append data to the DB and proceed to the next step
      if (!$('.inRequests').hasClass('absolute')) {
        socket.emit('append data', data2send);

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
            $('.inRequests__step2__barcode .inRequests__barcode__svg').remove();

            $('.inRequests__form .input').not('.inRequests__form__pibInfo__requestDate, .inRequests__form__pibInfo__loanLibrary, .inRequests__form__docInfo__inv').val('');

            $('.inRequests__step3')
              .removeAttr('style')
              .toggleClass('hidden flex');

            $('.home').toggleClass('hidden flex');
            $('.header__container__icon, .header__container__msg').toggleClass('hidden');
          });
      } else {
        // Else, update the existing record and hide the update form

        // Append the initial pib number to the array to send to the server as it'll be the key to update the specified record
        data2send.key = initialPibNb;
        confirmation();
        $('.inRequests.absolute').toggleClass('hidden flex');
        $('.wrapper').toggleClass('backgroundColor blur');

        socket.emit('update', data2send);
      }


      data2send.values = [];
    }, 5000);
  }

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

    // An email doesn't need to be sent when a record is being updated
    if (!$('.inRequests').hasClass('absolute')) {
      // Adresse mail du lecteur
      if (readerMail.val() === '') {
        invalid(readerMail);
      }
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

      // Avoid style modification while updating a record through the search module
      if (!$('.inRequests').hasClass('absolute')) {
        // Cloner le QR code pour le réutiliser à l'étape suivante
        let clonedSvg = $('.inRequests__barcode__svg').clone();
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
        sendData();
      }
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

  if (!$('.inRequests').hasClass('absolute')) {
    $('.inRequests__step3__confirmation').click(() => {
      sendData();
    });
  }

  $('.confirmation__body__cancel').click(() => {
    clearTimeout(inRequestsTimeOut);
  });
}

inRequests();


const outRequests = () => {
  let outRequestsTimeOut;
  let pibNb = $('.outRequests__form__pibInfo__pibNb');
  let borrowingLibrary = $('.outRequests__form__pibInfo__borrowingLibrary');
  let requestDate = $('.outRequests__form__pibInfo__requestDate');
  let loanLibrary = $('.outRequests__form__pibInfo__loanLibrary');
  let title = $('.outRequests__form__docInfo__title');
  let authorField = $('.outRequests__form__docInfo__author');
  let cdu = $('.outRequests__form__docInfo__cdu');
  let outProvince = $('.outRequests__form__pibInfo__outProvince').is(':checked');

  // Séparer le nom de l'auteur de son prénom
  let author = '';

  $('.outRequests__form__btnContainer__submit').click(event => {
    event.preventDefault();
    data2send.table = 'out_requests';

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

    // Titre du document
    if (title.val() === '') {
      invalid(title);
    }


    if (authorField.val() === '') {
      invalid(authorField);
    }

    if (cdu.val() === '') {
      invalid(cdu);
    }

    if (!validationErr) {
      $('.input').removeClass('invalid');
      $('form .warning').hide();

      confirmation();

      outRequestsTimeOut = setTimeout(() => {
        data2send.values.push(pibNb.val());
        data2send.values.push(borrowingLibrary.val());

        // Stocker la date en timestamp
        data2send.values.push(new Date(requestDate.val()).toUTCString());
        data2send.values.push(loanLibrary.val());
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

        socket.emit('append data', data2send);
        data2send.values = [];

        $('.outRequests__step3')
          .fadeOut(function() {
            confirmation();

            $(this)
              .removeAttr('style')
              .toggleClass('hidden flex');

            $('.home').toggleClass('hidden flex');
            $('.header__container__icon, .header__container__msg').toggleClass('hidden');
          });

        $('.outRequests__form .input').not('.outRequests__form__pibInfo__requestDate, .outRequests__form__pibInfo__loanLibrary').val('');
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
    clearTimeout(outRequestsTimeOut);
  });
}

outRequests();


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
          $('.header__container__icon, .header__container__msg').toggleClass('hidden');
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


const search = () => {
  let recordDelTimeOut, recordUpdateTimeOut, inRequestsTimeOut, record2modify;
  let updatedRecord = {};
  let searchData = {
    table: '',
    reader: '',
    title: '',
    getReader: false,
    getTitle: true
  };

  // Actions du menu contextuel
  const hideParent = className => {
    $(`.${className} .actionsMenu`).toggleClass('hidden flex');
  }

  $('.search__container__select').on('change', function() {
    if ($(this).val() === 'out_requests') {
      $('.search__container__readerInput').attr('disabled', true);
      $('.search__container__titleInput').attr('disabled', false);
    } else if ($(this).val() === 'in_requests' || $(this).val() === 'drafts') {
      $('.search__container__titleInput, .search__container__readerInput').attr('disabled', false);
    } else if ($(this).val() === 'default') {
      $('.search__container__titleInput, .search__container__readerInput').attr('disabled', true);
    }
  });

  $('.search__container').submit(event => {
    event.preventDefault();
    searchData.getReader = searchData.getTitle = false;

    if ($('.search__container__select').val() !== 'default') {
      searchData.table = $('.search__container__select').val();

      if ($('.search__container__readerInput').val() !== '') {
        searchData.getReader = true;
        searchData.reader = $('.search__container__readerInput').val();
      }

      if ($('.search__container__titleInput').val() !== '') {
        searchData.getTitle = true;
        searchData.title = $('.search__container__titleInput').val();
      }

      socket.emit('search', searchData);

      searchData.table = searchData.reader = searchData.title = '';
      searchData.getReader = searchData.getTitle = false;
    }
  });

  socket.on('search results', results => {
    $('.search__results__container').empty(function() {
      $(this).fadeOut();
    });

    let header = $('<span></span>')
      .addClass('search__results__container__header flex')
      .appendTo('.search__results__container');

    // Création du titre du tableau
    for (const [i, column] of Object.keys(results[0]).entries()) {
      let columnTitle = column;
      if ($('.search__container__select').val() === 'in_requests') {
        if (column === 'borrowing_library') columnTitle = 'Prêteur';
      } else if ($('.search__container__select').val() === 'out_requests') {
        if (column === 'borrowing_library') columnTitle = 'Emprunteur';
      }

      if (column !== 'loan_library' && column !== 'book_author_firstname') {
        switch (column) {
          case 'pib_number':
            columnTitle = 'N° PIB';
            break;
          case 'request_date':
            columnTitle = 'Date';
            break;
          case 'book_title':
            columnTitle = 'Titre';
            break;
          case 'book_author_name':
            columnTitle = 'Auteur';
            break;
          case 'cdu':
            columnTitle = 'CDU';
            break;
          case 'out_province':
            columnTitle = 'Hors Province ?';
            break;
          case 'barcode':
            columnTitle = 'N° inv.';
            break;
          case 'id':
            columnTitle = 'N° de demande';
            break;
          case 'comment':
            columnTitle = 'Commentaires';
            break;
          case 'reader_name':
            columnTitle = 'Lecteur';
            break;
          default:
            columnTitle;
        }

        let title = $('<span></span>')
          .addClass('search__results__container__header__item')
          .text(columnTitle)
          .appendTo(header);
      }
    }

    // Ajout des résultats, ligne par ligne
    for (const [i, data] of results.entries()) {
      let row = $('<span></span>')
        .addClass(`search__results__container__row search__results__container__row--${i} flex`)
        .appendTo('.search__results__container');

      if (data.id !== undefined) {
        let id = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--id')
          .append(data.id)
          .appendTo(row);
      }

      if (data.pib_number !== undefined) {
        let pibNb = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--pib')
          .append(data.pib_number)
          .appendTo(row);
      }

      if (data.borrowing_library !== undefined) {
        let library = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--borrowing_library')
          .append(data.borrowing_library)
          .appendTo(row);
      }

      let date = $('<span></span>').addClass('search__results__container__row__item search__results__container__row__item--date');

      if (data.request_date !== null) {
        date.append(new Date(data.request_date).toLocaleDateString());
      } else {
        date.append(`Problème d'affichage...`);
      }

      date.appendTo(row);

      if (data.reader_name !== undefined) {
        let reader = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--reader')
          .append(data.reader_name)
          .appendTo(row);
      }

      let title = $('<span></span>')
        .addClass('search__results__container__row__item search__results__container__row__item--title')
        .append(data.book_title)
        .appendTo(row);

      let author = $('<span></span>').addClass('search__results__container__row__item search__results__container__row__item--author');

      if (data.book_author_name !== undefined || data.book_author_firstname !== undefined) {
        if (data.book_author_firstname !== undefined && data.book_author_firstname !== null) {
          author.append(`${data.book_author_name}, ${data.book_author_firstname}`);
        } else {
          author.append(data.book_author_name);
        }

        author.appendTo(row);
      }

      if (data.cdu !== undefined) {
        let cdu = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--cdu')
          .append(data.cdu)
          .appendTo(row);
      }

      let out_province = $('\
      <svg xmlns="http://www.w3.org/2000/svg">\
        <circle cx="50%" cy="50%" r="5"/>\
      </svg>\
      ').addClass('search__results__container__row__item search__results__container__row__item--op flex');
      if (data.out_province !== undefined) {
        out_province
          .attr('viewBox', '0 0 75 10')
          .appendTo(row);

        if (data.out_province) {
          out_province.addClass('checked');
        } else {
          out_province.addClass('unchecked');
        }
      }

      if (data.barcode !== undefined) {
        let barcode = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--code')
          .append(data.barcode)
          .appendTo(row);
      }

      if (data.comment !== undefined) {
        let comment = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--comment')
          .append(data.comment.replace(/\n/gi, '<br>'))
          .appendTo(row);
      }

      // Affiche le emnu d'actions au survol
      if ($('.search__container__select').val() === 'drafts' || $('.search__container__select').val() === 'in_requests') {
        if (!$('.search__results__container__row--' + i + ' .actionsMenu').length) {
          $('.actionsMenu')
            .clone()
            .appendTo('.search__results__container__row--' + i);
        }

        let actionsButton = $('<button></button>')
          .addClass('actionsBtn hidden')
          .attr('type', 'button')
          .append(`
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
              `)
          .appendTo(`.search__results__container__row--${i}`)
          .click(function() {
            let parentClassNames = $(this).parents('.search__results__container__row').attr('class').split(' ');
            $(`.${parentClassNames[1]} .actionsMenu`).toggleClass('hidden flex');
          });
      }
    }

    $('.search__results__container').fadeIn();

    $('.search__results__container__row .actionsMenu__item--modify').click(function() {
      record2modify = $(this).parents('.search__results__container__row').attr('class').split(' ');

      hideParent(record2modify[1]);

      // Format the date to be year, Month (0-indexed) and the day
      let date = $(`.${record2modify[1]} .search__results__container__row__item--date`).text().split('/');

      if ($('.search__container__select').val() === 'drafts') {
        $('.draft__child__container__reader__date input').val(`${date[2]}-${date[1]}-${date[0]}`);
        $('.draft__child__container__reader__name input').val($(`.${record2modify[1]} .search__results__container__row__item--reader`).text());

        // Use .html() to retrieve both the node value and its children
        $('.draft__child__container__comment__textarea').val($(`.${record2modify[1]} .search__results__container__row__item--comment`).html().replace(/(<|&lt;)br(>|&gt;)/gi, '\n'));
        $('.draft__child__container__reader__bookTitle input').val($(`.${record2modify[1]} .search__results__container__row__item--title`).text());

        $('.draft').toggleClass('hidden flex');

        $('.draft__child__container__reader__btnContainer__submit').click(function() {
          recordUpdateTimeOut = setTimeout(function() {
            updatedRecord = {
              table: $('.search__container__select').val(),
              id: $(`.${record2modify[1]} .search__results__container__row__item--id`).text(),
              date: new Date($('.draft__child__container__reader__date input').val()).toUTCString(),
              reader: $('.draft__child__container__reader__name input').val(),
              comment: $('.draft__child__container__comment__textarea').val(),
              title: $('.draft__child__container__reader__bookTitle input').val()
            };

            let updatedComment = updatedRecord.comment.trim().split('\n');

            $(updatedComment).each((i, item) => {
              if (item === '') {
                updatedComment.splice(i, 1, $('<br>')[0]);
              }
            });

            // Update the web interface with the changes
            $(`.${record2modify[1]} .search__results__container__row__item--date`).text(new Date(updatedRecord.date).toLocaleDateString());
            $(`.${record2modify[1]} .search__results__container__row__item--reader`).text(updatedRecord.reader);
            $(`.${record2modify[1]} .search__results__container__row__item--comment`).empty().append(updatedComment);
            $(`.${record2modify[1]} .search__results__container__row__item--title`).text(updatedRecord.title);

            // Send the update to the DB
            socket.emit('update', updatedRecord);
          }, 5000);

          $('.confirmation__body__cancel').click(() => {
            $('.draft').removeClass('blur');
            clearTimeout(recordUpdateTimeOut);
            recordUpdateTimeOut = undefined;
          });
        });
      } else if ($('.search__container__select').val() === 'in_requests') {
        $('.inRequests')
          .addClass('absolute')
          .toggleClass('hidden flex');
        $('.wrapper').toggleClass('blur backgroundColor');

        // Hide the mail field to prevent duplicate mailings
        $('.inRequests.absolute .inRequests__form__readerInfo__mail').addClass('hidden');

        // Set the initial PIB number
        initialPibNb = $(`.${record2modify[1]} .search__results__container__row__item--pib`).text();

        // Fill in all the fields with the selected record data
        $('.inRequests.absolute .inRequests__form__pibInfo__pibNb').val($(`.${record2modify[1]} .search__results__container__row__item--pib`).text());
        $('.inRequests.absolute .inRequests__form__pibInfo__borrowingLibrary').val($(`.${record2modify[1]} .search__results__container__row__item--borrowing_library`).text());
        $('.inRequests.absolute .inRequests__form__pibInfo__requestDate').val(`${date[2]}-${date[1]}-${date[0]}`);
        $('.inRequests.absolute .inRequests__form__readerInfo__container__name').val($(`.${record2modify[1]} .search__results__container__row__item--reader`).text());
        $('.inRequests.absolute .inRequests__form__docInfo__title').val($(`.${record2modify[1]} .search__results__container__row__item--title`).text());
        $('.inRequests.absolute .inRequests__form__docInfo__author').val($(`.${record2modify[1]} .search__results__container__row__item--author`).text());
        $('.inRequests.absolute .inRequests__form__docInfo__cdu').val($(`.${record2modify[1]} .search__results__container__row__item--cdu`).text());
        $('.inRequests.absolute .inRequests__form__docInfo__inv').val($(`.${record2modify[1]} .search__results__container__row__item--code`).text());

        // out_province checkbox
        if ($(`.${record2modify[1]} .search__results__container__row__item--op`).hasClass('checked')) {
          $('.inRequests.absolute .inRequests__form__pibInfo__outProvince').attr('checked', true);
        } else {
          $('.inRequests.absolute .inRequests__form__pibInfo__outProvince').attr('checked', false);
        }

        // Generate the barcode
        JsBarcode('.inRequests.absolute .inRequests__barcode__svg', $('.inRequests.absolute .inRequests__form__docInfo__inv').val(), barcodeOptions);

        // The form submit is handled in the inRequests function
        $('.inRequests.absolute .inRequests__form__btnContainer__submit').click(() => {
          // Update the web interface with the changes
          $(`.${record2modify[1]} .search__results__container__row__item--pib`).text($('.inRequests__form__pibInfo__pibNb').val());
          $(`.${record2modify[1]} .search__results__container__row__item--borrowing_library`).text($('.inRequests__form__pibInfo__borrowingLibrary').val());
          $(`.${record2modify[1]} .search__results__container__row__item--date`).text(new Date($('.inRequests__form__pibInfo__requestDate').val()).toLocaleDateString());
          $(`.${record2modify[1]} .search__results__container__row__item--reader`).text($('.inRequests__form__readerInfo__container__name').val());
          $(`.${record2modify[1]} .search__results__container__row__item--title`).text($('.inRequests__form__docInfo__title').val());
          $(`.${record2modify[1]} .search__results__container__row__item--author`).text($('.inRequests__form__docInfo__author').val());
          $(`.${record2modify[1]} .search__results__container__row__item--cdu`).text($('.inRequests__form__docInfo__cdu').val());
          $(`.${record2modify[1]} .search__results__container__row__item--code`).text($('.inRequests__form__docInfo__inv').val());

          if ($('.inRequests__form__pibInfo__outProvince').is(':checked')) {
            $(`.${record2modify[1]} .search__results__container__row__item--op`).addClass('checked');
          } else {
            $(`.${record2modify[1]} .search__results__container__row__item--op`).addClass('unchecked');
          }
        });
      }
    });

    $('.search__results__container__row .actionsMenu__item--del').click(function() {
      let record = $(this).parents('.search__results__container__row').attr('class').split(' ');
      let deletionKey = {};
      hideParent(record[1]);
      confirmation();

      if ($('.search__container__select').val() === 'drafts') {
        deletionKey = {
          table: 'drafts',
          key: $(`.${record[1]} .search__results__container__row__item--id`).text()
        };
      } else if ($('.search__container__select').val() === 'in_requests') {
        deletionKey = {
          table: 'in_requests',
          key: $(`.${record[1]} .search__results__container__row__item--pib`).text()
        };
      }

      // Hide the record from the interface
      $(`.${record[1]}`).toggleClass('hidden flex');

      recordDelTimeOut = setTimeout(() => {
        // Delete the record from the interface
        $(`.${record[1]}`).remove();
        confirmation();

        // Send the record ID to delete to the server
        socket.emit('delete data', deletionKey);
      }, 5000);

      $('.confirmation__body__cancel').click(() => {
        clearTimeout(recordDelTimeOut);
        $(`.${record[1]}`)
          .removeClass('hidden')
          .addClass('flex');
        recordDelTimeOut = undefined;
      });
    });
  });
}

$('.confirmation__body__cancel').click(() => {
  smartHide('.confirmation', 'out');
});

search();