const search = () => {
  let recordDelTimeOut, recordUpdateTimeOut, inRequestsTimeOut, record2modify;
  let updatedRecord = {};
  let searchData = {
    table: '',
    reader: '',
    title: '',
    getReader: false,
    getTitle: true
  };

  // Actions du menu contextuel
  const hideParent = className => {
    $(`.${className} .actionsMenu`).toggleClass('hidden flex');
  }

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

      if ($('.search__container__readerInput').val() !== '') {
        searchData.getReader = true;
        searchData.reader = $('.search__container__readerInput').val().replace(/\'/g, "''");
      }

      if ($('.search__container__titleInput').val() !== '') {
        searchData.getTitle = true;
        searchData.title = $('.search__container__titleInput').val().replace(/\'/g, "''");
      }

      socket.emit('search', searchData);

      searchData.table = searchData.reader = searchData.title = '';
      searchData.getReader = searchData.getTitle = false;
    }
  });

  socket.on('search results', results => {
    $('.search__results__container').empty(function() {
      $(this).fadeOut();
    });

    if (results[0] !== undefined) {
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
            .append(data.borrowing_library.replace(/\'\'/g, "'"))
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
            .append(data.reader_name.replace(/\'\'/g, "'"))
            .appendTo(row);
        }

        let title = $('<span></span>')
          .addClass('search__results__container__row__item search__results__container__row__item--title')
          .append(data.book_title.replace(/\'\'/g, "'"))
          .appendTo(row);

        let author = $('<span></span>').addClass('search__results__container__row__item search__results__container__row__item--author');

        if (data.book_author_name !== undefined || data.book_author_firstname !== undefined) {
          if (data.book_author_firstname !== undefined && data.book_author_firstname !== null) {
            author.append(`${data.book_author_name.replace(/\'\'/g, "'")}, ${data.book_author_firstname}`);
          } else {
            author.append(data.book_author_name.replace(/\'\'/g, "'"));
          }

          author.appendTo(row);
        }

        if (data.cdu !== undefined) {
          let cdu = $('<span></span>')
            .addClass('search__results__container__row__item search__results__container__row__item--cdu')
            .append(data.cdu)
            .appendTo(row);
        }

        let out_province = $('\
      <svg xmlns="http://www.w3.org/2000/svg">\
        <circle cx="50%" cy="50%" r="5"/>\
      </svg>\
      ').addClass('search__results__container__row__item search__results__container__row__item--op flex');
        if (data.out_province !== undefined) {
          out_province
            .attr('viewBox', '0 0 75 10')
            .appendTo(row);

          if (data.out_province) {
            out_province
              .removeClass('unchecked')
              .addClass('checked');
          } else {
            out_province
              .removeClass('checked')
              .addClass('unchecked');
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
        if ($('.search__container__select').val() === 'drafts' || $('.search__container__select').val() === 'in_requests') {
          if (!$('.search__results__container__row--' + i + ' .actionsMenu').length) {
            $('.actionsMenu')
              .clone()
              .appendTo('.search__results__container__row--' + i);
          }

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
            .appendTo(`.search__results__container__row--${i}`)
            .click(function() {
              let parentClassNames = $(this).parents('.search__results__container__row').attr('class').split(' ');
              $(`.${parentClassNames[1]} .actionsMenu`).toggleClass('hidden flex');
            });
        }
      }

      $('.search__results__container').fadeIn();

      $('.search__results__container__row .actionsMenu__item--modify').click(function() {
        record2modify = $(this).parents('.search__results__container__row').attr('class').split(' ');

        hideParent(record2modify[1]);

        // Format the date to be year, Month (0-indexed) and the day
        let date = $(`.${record2modify[1]} .search__results__container__row__item--date`).text().split('/');

        if ($('.search__container__select').val() === 'drafts') {
          $('.draft__child__container__reader__date input').val(`${date[2]}-${date[1]}-${date[0]}`);
          $('.draft__child__container__reader__name input').val($(`.${record2modify[1]} .search__results__container__row__item--reader`).text());

          // Use .html() to retrieve both the node value and its children
          $('.draft__child__container__comment__textarea').val($(`.${record2modify[1]} .search__results__container__row__item--comment`).html().replace(/(<|&lt;)br(>|&gt;)/gi, '\n'));
          $('.draft__child__container__reader__bookTitle input').val($(`.${record2modify[1]} .search__results__container__row__item--title`).text());

          $('.draft').toggleClass('hidden flex');

          $('.draft__child__container__reader__btnContainer__submit').click(function() {
            recordUpdateTimeOut = setTimeout(function() {
              updatedRecord = {
                table: $('.search__container__select').val(),
                id: $(`.${record2modify[1]} .search__results__container__row__item--id`).text(),
                date: new Date($('.draft__child__container__reader__date input').val()).toUTCString(),
                reader: $('.draft__child__container__reader__name input').val().replace(/\'/g, "''"),
                comment: $('.draft__child__container__comment__textarea').val().replace(/\'/g, "''"),
                title: $('.draft__child__container__reader__bookTitle input').val().replace(/\'/g, "''")
              };

              let updatedComment = updatedRecord.comment.trim().split('\n');

              $(updatedComment).each((i, item) => {
                if (item === '') {
                  updatedComment.splice(i, 1, $('<br>')[0]);
                }
              });

              // Update the web interface with the changes
              $(`.${record2modify[1]} .search__results__container__row__item--date`).text(new Date(updatedRecord.date).toLocaleDateString());
              $(`.${record2modify[1]} .search__results__container__row__item--reader`).text(updatedRecord.reader.replace(/\'\'/g, "'"));
              $(`.${record2modify[1]} .search__results__container__row__item--comment`).empty().append(updatedComment.replace(/\'\'/g, "'"));
              $(`.${record2modify[1]} .search__results__container__row__item--title`).text(updatedRecord.title.replace(/\'\'/g, "'"));

              // Send the update to the DB
              socket.emit('update', updatedRecord);
            }, 5000);

            $('.confirmation__body__cancel').click(() => {
              $('.draft').removeClass('blur');
              clearTimeout(recordUpdateTimeOut);
              recordUpdateTimeOut = undefined;
            });
          });
        } else if ($('.search__container__select').val() === 'in_requests') {
          $('.inRequests')
            .addClass('absolute flex')
            .removeClass('hidden');

          $('.wrapper').addClass('blur backgroundColor');

          // Set the initial PIB number
          initialPibNb = $(`.${record2modify[1]} .search__results__container__row__item--pib`).text();

          // Show a button to hide the form
          $('.inRequests.absolute .inRequests__form__btnContainer__hide').removeClass('hidden');

          // Fill in all the fields with the selected record data
          $('.inRequests.absolute .inRequests__form__pibInfo__pibNb').val($(`.${record2modify[1]} .search__results__container__row__item--pib`).text());
          $('.inRequests.absolute .inRequests__form__pibInfo__borrowingLibrary').val($(`.${record2modify[1]} .search__results__container__row__item--borrowing_library`).text());
          $('.inRequests.absolute .inRequests__form__pibInfo__requestDate').val(`${date[2]}-${date[1]}-${date[0]}`);
          $('.inRequests.absolute .inRequests__form__readerInfo__container__name').val($(`.${record2modify[1]} .search__results__container__row__item--reader`).text());
          $('.inRequests.absolute .inRequests__form__docInfo__title').val($(`.${record2modify[1]} .search__results__container__row__item--title`).text());
          $('.inRequests.absolute .inRequests__form__docInfo__author').val($(`.${record2modify[1]} .search__results__container__row__item--author`).text());
          $('.inRequests.absolute .inRequests__form__docInfo__cdu').val($(`.${record2modify[1]} .search__results__container__row__item--cdu`).text());
          $('.inRequests.absolute .inRequests__form__docInfo__inv').val($(`.${record2modify[1]} .search__results__container__row__item--code`).text());

          // out_province checkbox
          if ($(`.${record2modify[1]} .search__results__container__row__item--op`).hasClass('checked')) {
            $('.inRequests.absolute .inRequests__form__pibInfo__outProvince').prop('checked', true);
          } else {
            $('.inRequests.absolute .inRequests__form__pibInfo__outProvince').prop('checked', false);
          }

          // Generate the barcode
          JsBarcode('.inRequests.absolute .inRequests__barcode__svg', $('.inRequests.absolute .inRequests__form__docInfo__inv').val(), barcodeOptions);

          // The form submit is handled in the inRequests function
          $('.inRequests.absolute .inRequests__form__btnContainer__submit').click(() => {
            // Update the web interface with the changes
            $(`.${record2modify[1]} .search__results__container__row__item--pib`).text($('.inRequests__form__pibInfo__pibNb').val());
            $(`.${record2modify[1]} .search__results__container__row__item--borrowing_library`).text($('.inRequests__form__pibInfo__borrowingLibrary').val());
            $(`.${record2modify[1]} .search__results__container__row__item--date`).text(new Date($('.inRequests__form__pibInfo__requestDate').val()).toLocaleDateString());
            $(`.${record2modify[1]} .search__results__container__row__item--reader`).text($('.inRequests__form__readerInfo__container__name').val());
            $(`.${record2modify[1]} .search__results__container__row__item--title`).text($('.inRequests__form__docInfo__title').val());
            $(`.${record2modify[1]} .search__results__container__row__item--author`).text($('.inRequests__form__docInfo__author').val());
            $(`.${record2modify[1]} .search__results__container__row__item--cdu`).text($('.inRequests__form__docInfo__cdu').val());
            $(`.${record2modify[1]} .search__results__container__row__item--code`).text($('.inRequests__form__docInfo__inv').val());

            if ($('.inRequests__form__pibInfo__outProvince').is(':checked')) {
              $(`.${record2modify[1]} .search__results__container__row__item--op`)
                .removeClass('unchecked')
                .addClass('checked');
            } else {
              $(`.${record2modify[1]} .search__results__container__row__item--op`)
                .removeClass('checked')
                .addClass('unchecked');
            }

            // Hide the button to hide the form
            $('.inRequests.absolute .inRequests__form__btnContainer__hide').toggleClass('hidden');
          });

          // Hide the form on btn click
          $('.inRequests.absolute .inRequests__form__btnContainer__hide').click(function() {
            $('.inRequests')
              .removeClass('absolute flex')
              .addClass('hidden');

            $('.wrapper').removeClass('blur backgroundColor');

            // Hide the button to hide the form
            $(this).addClass('hidden');
          });
        }
      });

      $('.search__results__container__row .actionsMenu__item--del').click(function() {
        let record = $(this).parents('.search__results__container__row').attr('class').split(' ');
        let deletionKey = {};
        hideParent(record[1]);
        confirmation();

        if ($('.search__container__select').val() === 'drafts') {
          deletionKey = {
            table: 'drafts',
            key: $(`.${record[1]} .search__results__container__row__item--id`).text()
          };
        } else if ($('.search__container__select').val() === 'in_requests') {
          deletionKey = {
            table: 'in_requests',
            key: $(`.${record[1]} .search__results__container__row__item--pib`).text()
          };
        }

        // Hide the record from the interface
        $(`.${record[1]}`).toggleClass('hidden flex');

        recordDelTimeOut = setTimeout(() => {
          // Delete the record from the interface
          $(`.${record[1]}`).remove();
          confirmation();

          // Send the record ID to delete to the server
          socket.emit('delete data', deletionKey);
        }, 5000);

        $('.confirmation__body__cancel').click(() => {
          clearTimeout(recordDelTimeOut);
          $(`.${record[1]}`)
            .removeClass('hidden')
            .addClass('flex');
          recordDelTimeOut = undefined;
        });
      });
    }
  });
}

search();
