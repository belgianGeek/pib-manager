socket.on('notification', notification => {
  if (notification.type === 'success') {
    $('.notification__icon').attr('src', './src/scss/icons/thumbs-up.svg');
    $('.notification').toggleClass('notificationSuccess');
    $('.notification__msg').text('Changements enregistrés avec succès ! 😉');
  } else if (notification.type === 'error') {
    $('.notification__icon').attr('src', './src/scss/icons/error.svg');
    $('.notification').toggleClass('notificationFailure');
    $('.notification__msg').text('Une erreur s\'est produite... 😱');
  }

  $('.notification').toggleClass('hidden flex notificationTranslate');

  setTimeout(() => {
    $('.notification')
      .fadeOut(() => {
        $('.notification')
          .removeAttr('style')
          .toggleClass('flex hidden notificationTranslate');
      });
  }, 2000);
});
