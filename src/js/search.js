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
      $('.search__container__titleInput').attr('disabled', false);
    } else if ($(this).val() === 'in_requests' || $(this).val() === 'drafts') {
      $('.search__container__titleInput, .search__container__readerInput').attr('disabled', false);
    } else if ($(this).val() === 'default') {
      $('.search__container__titleInput, .search__container__readerInput').attr('disabled', true);
    }
  });

  $('.search__container').submit(event => {
    event.preventDefault();
    searchData.getReader = searchData.getTitle = false;

    if ($('.search__container__select').val() !== 'default') {
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
    $('.search__results__container').empty(function() {
      $(this).fadeOut();
    });

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
          case 'id':
            columnTitle = 'N° de demande';
            break;
          case 'comment':
            columnTitle = 'Commentaires';
            break;
          case 'reader_name':
            columnTitle = 'Lecteur';
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
        .addClass(`search__results__container__row search__results__container__row--${i} flex`)
        .appendTo('.search__results__container');

      if (data.id !== undefined) {
        let id = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--id')
          .append(data.id)
          .appendTo(row);
      }

      if (data.pib_number !== undefined) {
        let pibNb = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--pib')
          .append(data.pib_number)
          .appendTo(row);
      }

      if (data.borrowing_library !== undefined) {
        let library = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--borrowing_library')
          .append(data.borrowing_library)
          .appendTo(row);
      }

      let date = $('<span></span>').addClass('search__results__container__row__item search__results__container__row__item--date');

      if (data.request_date !== null) {
        date.append(new Date(data.request_date).toLocaleDateString());
      } else {
        date.append(`Problème d'affichage...`);
      }

      date.appendTo(row);

      if (data.reader_name !== undefined) {
        let reader = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--reader')
          .append(data.reader_name)
          .appendTo(row);
      }

      let title = $('<span></span>')
        .addClass('search__results__container__row__item search__results__container__row__item--title')
        .append(data.book_title)
        .appendTo(row);

      let author = $('<span></span>').addClass('search__results__container__row__item search__results__container__row__item--author');

      if (data.book_author_name !== undefined || data.book_author_firstname !== undefined) {
        if (data.book_author_firstname !== undefined && data.book_author_firstname !== null) {
          author.append(`${data.book_author_name}, ${data.book_author_firstname}`);
        } else {
          author.append(data.book_author_name);
        }

        author.appendTo(row);
      }

      if (data.cdu !== undefined) {
        let cdu = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--cdu')
          .append(data.cdu)
          .appendTo(row);
      }

      let out_province = $('<input>').addClass('search__results__container__row__item search__results__container__row__item--op');
      if (data.out_province !== undefined) {
        out_province
          .attr('type', 'checkbox')
          .attr('disabled', true)
          .appendTo(row);

        if (data.out_province) {
          out_province.attr('checked', true);
        } else {
          out_province.attr('checked', false);
        }
      }

      if (data.barcode !== undefined) {
        let barcode = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--code')
          .append(data.barcode)
          .appendTo(row);
      }

      if (data.comment !== undefined) {
        let comment = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--comment')
          .append(data.comment.replace(/\n/gi, '<br>'))
          .appendTo(row);
      }

      // Affiche le emnu d'actions au survol
      if ($('.search__container__select').val() === 'drafts') {
        let actionsBtnOffset = $('.search__results__container__row .actionsBtn').offset();
        let actionsButton = $('<button></button>')
          .addClass('actionsBtn hidden')
          .attr('type', 'button')
          .append(`
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
              `)
          .appendTo('.search__results__container__row')
          .click(function() {
            $(this).toggleClass('hidden flex');

            if (!$('.search__results__container__row .actionsMenu').length) {
              $('.actionsMenu')
                .clone()
                .appendTo($(this).parent());
            }

            $('.search__results__container__row .actionsMenu').toggleClass('hidden flex');

            // Actions du menu contextuel
            const hideParent = () => {
              $('.search__results__container__row .actionsMenu').toggleClass('hidden flex');
            }

            $('.search__results__container__row .actionsMenu__item--modify svg, \
            .search__results__container__row .actionsMenu__item--modify p').click(function() {
              hideParent();

              let record = $(this).parents('.search__results__container__row').attr('class').split(' ');

              // Formatage de la date
              let date = $(`.${record[1]} .search__results__container__row__item--date`).text().split('/');

              // Format the date to be year, Month (0-indexed) and the day
              $('.draft__child__container__reader__date input').val(`${date[2]}-${date[1]}-${date[0]}`);
              $('.draft__child__container__reader__name input').val($(`.${record[1]} .search__results__container__row__item--reader`).text());
              $('.draft__child__container__comment__textarea').val($(`.${record[1]} .search__results__container__row__item--comment`).text());
              $('.draft__child__container__reader__bookTitle input').val($(`.${record[1]} .search__results__container__row__item--title`).text());

              $('.draft').toggleClass('hidden flex');

              $('.draft__child__container__reader__btnContainer__submit').click(function() {
                let updatedRecord = {
                  table: $('.search__container__select').val(),
                  id: $(`.${record[1]} .search__results__container__row__item--id`).text(),
                  date: new Date($('.draft__child__container__reader__date input').val()).toUTCString(),
                  reader: $('.draft__child__container__reader__name input').val(),
                  comment: $('.draft__child__container__comment__textarea').val(),
                  title: $('.draft__child__container__reader__bookTitle input').val()
                };

                // Update the web interface with the changes
                $(`.${record[1]} .search__results__container__row__item--date`).text(new Date(updatedRecord.date).toLocaleDateString());
                $(`.${record[1]} .search__results__container__row__item--reader`).text(updatedRecord.reader);
                $(`.${record[1]} .search__results__container__row__item--comment`).text(updatedRecord.comment);
                $(`.${record[1]} .search__results__container__row__item--title`).text(updatedRecord.title);

                // Send the update to the DB
                socket.emit('update', updatedRecord);
              });
            });
          });
      }
    }

    $('.search__results__container').fadeIn();
  });

}

search();
