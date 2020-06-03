const autocomplete = (input, dataset) => {
  $(input).keyup(() => {
    socket.emit('retrieve readers', $(input).val());
  });

  socket.on('readers retrieved', readers => {
    $(input)
      .css({
        marginBottom: 0,
        borderBottom: "2px solid transparent"
      });

    // Positionner les suggestions
    $(input).ready(() => {
      let position = $(input).position();
      $(dataset).css({
        left: position.left,
        top: position.top + $(input).outerHeight() + 12,
        width: $(input).outerWidth()
      });
    });

    $(dataset)
      .empty()
      .toggleClass('hidden flex');

    for (const reader of readers) {
      if (!$(`.${reader.name.match(/[^,\s]/gi).join('')}`).length) {
        let option = $('<p></p>')
          .append(reader.name)
          .addClass(reader.name.match(/[^,\s]/gi).join(''))
          .appendTo(dataset);

        option.click(function() {
          $(input)
            .val($(this).text())
            .removeAttr('style');

          $(dataset)
            .toggleClass('hidden flex')
            .empty();

            if (input === '.inRequests__form__readerInfo__container__name') {
              socket.emit('mail request', $(this).text());

              socket.on('mail retrieved', receiver => {
                $('.inRequests__form__readerInfo__mail').val(receiver.mail);
                gender = receiver.gender[0];
              });
            }
        });
      }
    }
  });

  $(input).focusout(() => {
    $(input).removeAttr('style', () => {
      $(dataset)
        .toggleClass('hidden flex')
        .empty();
    });
  });

  $(dataset).focusout(function() {
    $(this)
      .toggleClass('hidden flex')
      .empty();
  });
}
