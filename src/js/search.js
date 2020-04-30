const search = term => {
  if ($('.search__container__select').val() === 'outRequests') {
    socket.emit('search', {
      table: 'out_requests',
      request: term
    });
  } else {
    socket.emit('search', {
      table: 'in_requests',
      request: term
    });
  }
}

$('.search__container').submit((event) => {
  event.preventDefault();
  search($('.search__container__reader').val());
});

$('.search__container').keypress((event) => {
  search($('.search__container__reader').val());
});

//Submit form on svg icon click
$('.search__container').click(() => {
  search($('.search__container__reader').val());
});
