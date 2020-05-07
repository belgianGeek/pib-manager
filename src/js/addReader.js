const addReader = () => {
  let addReaderTimeout = '';
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

      addReaderTimeout = setTimeout(function () {
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
           $('.header__icon, .header__msg').toggleClass('hidden');

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
    $('.confirmation')
      .fadeOut(function() {
        $(this)
          .addClass('hidden')
          .removeClass('flex')
          .removeAttr('style');

        $('.wrapper, .header').removeClass('blur');

        clearTimeout(addReaderTimeout);
      });
  });
}

addReader();
