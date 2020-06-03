const draftNewRequest = () => {
  let reader = '.draft__child__container__reader__name input';
  let date = '.draft__child__container__reader__date input';
  let title = '.draft__child__container__reader__title input';

  $('.header__actionsContainer__draft').click(() => {
    smartHide('.draft', 'in');
  });

  autocomplete('.draft__child__container__reader__name input', '.draft__child__container__reader__label__autocomplete');

  $('.draft__child__container__reader').submit(event => {
    event.preventDefault();
    data2send.table = 'drafts';

    if (reader.val() === '') {
      invalid(reader);
    }

    if (date.val() === '') {
      invalid(date);
    }

    if (title.val() === '') {
      invalid(title);
    }

    if (!validationErr) {
      $('.input').removeClass('invalid');
      $('drafts__child__container__reader .warning').hide();
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
}

draftNewRequest();
