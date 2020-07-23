const smartHide = (className, method, timeout) => {
  console.log('smartHide');
  if (method === 'in') {
    $(className)
      .fadeIn(function() {
        $(this)
          .toggleClass('hidden flex')
          .removeAttr('style');

        $('.wrapper, .header').removeClass('blur');
      });
  } else {
    $(className)
      .fadeOut(function() {
        $(this)
          .toggleClass('hidden flex')
          .removeAttr('style');

        $('.wrapper, .header').removeClass('blur');

        if (timeout !== undefined) {
          clearTimeout(timeout);
        }
      });
  }
}
