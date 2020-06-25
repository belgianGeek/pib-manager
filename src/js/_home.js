const handleHomeBtnClick = (element, parent) => {
  $(`.home__${parent}__${element}`).click(() => {
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

          $('.returnIcon, .header__container__msg')
            .removeClass('hidden');
        }, 1000);
      });
  });
}

handleHomeBtnClick('outRequests', 'btnContainer');
handleHomeBtnClick('inRequests', 'btnContainer');
handleHomeBtnClick('inReturns', 'btnContainer');
handleHomeBtnClick('outReturns', 'btnContainer');
handleHomeBtnClick('addReader', 'optionsContainer');
