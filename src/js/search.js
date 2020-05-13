const search = () => {
  let searchData = {
    table: '',
    reader: '',
    title: '',
    getReader: false,
    getTitle: true
  };

  $('.search__container__select').on('change', function() {
    if ($(this).val() === 'out_requests') {
      $('.search__container__readerInput').attr('disabled', true);
    } else {
      $('.search__container__readerInput').attr('disabled', false);
    }
  });

  $('.search__container').submit(event => {
    event.preventDefault();
    $('.search__results__container').empty(function() {
      $(this).fadeOut();
    });

    if ($('.search__container__select').val() === 'in_requests') {
      searchData.table = $('.search__container__select').val();
    } else if ($('.search__container__select').val() === 'out_requests') {
      searchData.table = $('.search__container__select').val();
    }

    if ($('.search__container__readerInput').val() !== '') {
      searchData.getReader = true;
      searchData.reader = $('.search__container__readerInput').val();
    }

    if ($('.search__container__titleInput').val() !== '') {
      searchData.getTitle = true;
      searchData.title = $('.search__container__titleInput').val();
    }

    socket.emit('search', searchData);

    searchData.table = searchData.reader = searchData.title = '';
    searchData.getReader = searchData.getTitle = false;
  });

  socket.on('search results', results => {
    let header = $('<span></span>')
      .addClass('search__results__container__header flex')
      .appendTo('.search__results__container');

    // Création du titre du tableau
    for (const [i, column] of Object.keys(results[0]).entries()) {
      let columnTitle = column;
      if ($('.search__container__select').val() === 'in_requests') {
        if (column === 'borrowing_library') columnTitle = 'Prêteur';
      } else if ($('.search__container__select').val() === 'out_requests') {
        if (column === 'borrowing_library') columnTitle = 'Emprunteur';
      }

      if (column !== 'loan_library' && column !== 'book_author_firstname') {
        switch (column) {
          case 'pib_number':
            columnTitle = 'N° PIB';
            break;
          case 'request_date':
            columnTitle = 'Date';
            break;
          case 'book_title':
            columnTitle = 'Titre';
            break;
          case 'book_author_name':
            columnTitle = 'Auteur';
            break;
          case 'cdu':
            columnTitle = 'CDU';
            break;
          case 'out_province':
            columnTitle = 'Hors Province ?';
            break;
          case 'barcode':
            columnTitle = 'N° inv.';
            break;
          default:
            columnTitle;
        }

        let title = $('<span></span>')
          .addClass('search__results__container__header__item')
          .text(columnTitle)
          .appendTo(header);
      }
    }

    // Ajout des résultats, ligne par ligne
    for (const [i, data] of results.entries()) {
      let row = $('<span></span>')
        .addClass('search__results__container__row flex')
        .appendTo('.search__results__container');

      let pibNb = $('<span></span>')
        .addClass('search__results__container__row__item')
        .append(data.pib_number)
        .appendTo(row);

      let library = $('<span></span>')
        .addClass('search__results__container__row__item')
        .append(data.borrowing_library)
        .appendTo(row);

      let date = $('<span></span>')
        .addClass('search__results__container__row__item')
        .append(data.request_date.substring(0, 10))
        .appendTo(row);

      if (data.reader_name !== undefined) {
        let reader = $('<span></span>')
          .addClass('search__results__container__row__item')
          .append(data.reader_name)
          .appendTo(row);
      }

      let title = $('<span></span>')
        .addClass('search__results__container__row__item')
        .append(data.book_title)
        .appendTo(row);

      let author = $('<span></span>').addClass('search__results__container__row__item');

      if (data.book_author_firstname !== undefined && data.book_author_firstname !== null) {
        author.append(`${data.book_author_name}, ${data.book_author_firstname}`);
      } else {
        author.append(data.book_author_name);
      }

      author.appendTo(row);

      let cdu = $('<span></span>')
        .addClass('search__results__container__row__item')
        .append(data.cdu)
        .appendTo(row);

      let out_province = $('<input>')
        .addClass('search__results__container__row__item')
        .attr('type', 'checkbox')
        .attr('disabled', true)
        .appendTo(row);

      if (data.out_province) {
        out_province.attr('checked', true);
      } else {
        out_province.attr('checked', false);
      }

      if (data.barcode !== undefined) {
        let barcode = $('<span></span>')
          .addClass('search__results__container__row__item')
          .append(data.barcode)
          .appendTo(row);
      }
    }

    $('.search__results__container').fadeIn();
  });
}

search();
