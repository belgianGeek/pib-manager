const draftNewRequest = () => {
  let reader = '.draft__child__container__reader__name input';
  let date = '.draft__child__container__reader__date input';
  let title = '.draft__child__container__reader__bookTitle input';
  let comment = $('.draft__child__container__comment__textarea');

  let draftTimeOut = '';

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
      $('drafts__child__container__reader .warning').hide();

      confirmation();

      draftTimeOut = setTimeout(() => {
        data2send.values.push($(reader).val());
        data2send.values.push($(date).val());
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
      if (!$('drafts__child__container__reader .warning').length) {
        let warning = $('<span></span>')
          .addClass('warning')
          .text('Certains champs sont incorrects...')
          .appendTo('.drafts__child__container__reader');
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
    confirmation();
    smartHide('.confirmation', 'out', draftTimeOut);
  });
}

draftNewRequest();
