const smartHide = (className, method, timeout) => {
  if (method === 'in') {
    $(className)
      .fadeIn(function() {
        $(this)
          .addClass('flex')
          .removeClass('hidden')
          .removeAttr('style');

        $('.wrapper, .header').removeClass('blur');
      });
  } else {
    $(className)
      .fadeOut(function() {
        $(this)
          .addClass('hidden')
          .removeClass('flex')
          .removeAttr('style');

        $('.wrapper, .header').removeClass('blur');

        if (timeout !== undefined) {
          clearTimeout(timeout);
        }
      });
  }
}
