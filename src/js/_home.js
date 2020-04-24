const handleHomeBtnClick = (element) => {
  $(`.home__btnContainer__${element}`).click(() => {
    $('.home')
      .fadeOut(() => {
        $(`.${element}__step1`)
          .fadeIn(() => {
            $(`.${element}__step1`)
              .toggleClass('hidden flex')
              .removeAttr('style');
          });

        setTimeout(() => {
          $('.home')
            .toggleClass('flex hidden')
            .removeAttr('style');

          $('.returnIcon, .header__msg')
            .removeClass('hidden');
        }, 1000);
      });
  });
}

handleHomeBtnClick('outRequests');
handleHomeBtnClick('inRequests');
handleHomeBtnClick('inReturns');
handleHomeBtnClick('outReturns');
