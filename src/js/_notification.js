socket.on('notification', notification => {
  if (notification.type === 'success') {
    $('.notification').toggleClass('hidden flex notificationTranslate');
    $('.notification__msg').text('Tes changements ont été enregistrés avec succès ! 😉');
  }

  setTimeout(() => {
    $('.notification')
      .fadeOut(() => {
        $('.notification')
          .removeAttr('style')
          .toggleClass('flex hidden notificationTranslate');
      });
  }, 2000);
});
