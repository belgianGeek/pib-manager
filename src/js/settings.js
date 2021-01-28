const settings = () => {
  let mailContent = '';
  let library = '';

  // Store the updated settings
  let updatedSettings = {};

  // Get settings from the server-side
  socket.on('settings', settings => {
    mailContent = settings.mail_content.replace(/\'\'/g, "'");
    library = settings.library.replace(/\'\'/g, "'");
    $('.settings__child__textarea__content').val(mailContent);
    $('.settings__child__libraryContainer__label__input').val(library);
  });

  // Show settings on btn click
  $('.settingsLink').click(() => {
    $('.settings__container').toggleClass('hidden flex');
    $('.wrapper').addClass('blur');
  });

  $('.settings__container').click(function(e) {
    if (e.target === this) {
      $(this).toggleClass('hidden flex');
      $('.wrapper').removeClass('blur');

      if (mailContent !== $('.settings__child__textarea__content').val()) updatedSettings.mail_content = $('.settings__child__textarea__content').val().replace(/\'/g, "''");

      if (library !== $('.settings__child__libraryContainer__label__input').val()) updatedSettings.library = $('.settings__child__libraryContainer__label__input').val().replace(/\'/g, "''");

      socket.emit('settings', updatedSettings);
    }
  });
}

settings();
