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
