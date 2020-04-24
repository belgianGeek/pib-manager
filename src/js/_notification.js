socket.on('notification', notification => {
  if (notification.type === 'success') {
    $('.notification__icon').attr('src', './src/scss/icons/thumbs-up.svg');
    $('.notification').addClass('notificationSuccess');
    $('.notification__msg').text('Changements enregistrés avec succès ! 😉');
  } else if (notification.type === 'error') {
    $('.notification__icon').attr('src', './src/scss/icons/error.svg');
    $('.notification').addClass('notificationFailure');
    $('.notification__msg').text('Une erreur s\'est produite... 😱');
  }

  $('.notification').toggleClass('hidden flex notificationTranslate');

  setTimeout(() => {
    $('.notification')
      .fadeOut(() => {
        $('.notification')
          .removeAttr('style')
          .removeClass('notificationSuccess notificationFailure')
          .toggleClass('flex hidden notificationTranslate');
      });
  }, 5000);
});
