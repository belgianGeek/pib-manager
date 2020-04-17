$('.inReturns__step2__btn').click((event) => {
  event.preventDefault();
  socket.emit('delete data', {
    table: 'in_requests',
    barcode: $('.inReturns__step2__input').val()
  });
});

$('.inReturns__step2__confirmation').click(() => {
  confirmation();

  setTimeout(() => {
    $('.inReturns__step2')
      .fadeOut(() => {
        confirmation();

        $('.inReturns__step2')
          .removeAttr('style')
          .toggleClass('hidden flex');

        $('.home').toggleClass('hidden flex');
        $('.header__icon, .header__msg').toggleClass('hidden');
      })
  }, 5000);
});
