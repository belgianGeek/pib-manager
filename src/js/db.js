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

  $('.export .btn--submit').click(() => {
    exportDB();
  });

  $('.export .btn--reset').click(() => {
    smartHide('.export', 'out');
  });

  format = '';
});
