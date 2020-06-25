// Connexion au websocket
const socket = io();
let data2send = {
  table: '',
  values: [],
  authorFirstName: true
};

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Tous les champs du formulaire sont-ils complets ?
let validationErr = false;

const handleSimpleStep = (element, step1, step2, btn) => {
  $(`${element}__${step1}__${btn}`).click(() => {
    if (!validationErr) {
      $(`${element}__${step1}`).toggleClass('translateXbackwards hidden flex');
      setTimeout(() => {
        $(`${element}__${step2}`)
          .fadeIn()
          .removeAttr('style')
          .removeClass('translateXonwards hidden')
          .toggleClass('fixed flex');
      }, 1000);
    }
  });
}

handleSimpleStep('.inRequests', 'step2', 'step3', 'btn');
handleSimpleStep('.outRequests', 'step1', 'step2', 'btn');
handleSimpleStep('.outRequests', 'step2', 'step3', 'confirmation');
handleSimpleStep('.inReturns', 'step1', 'step2', 'btn');
handleSimpleStep('.inReturns', 'step2', 'step3', 'confirmation');
handleSimpleStep('.outReturns', 'step1', 'step2', 'btn');
handleSimpleStep('.outReturns', 'step2', 'step3', 'confirmation');

$('.returnIcon').click(() => {
  const backHome = step => {
    $(step)
      .removeClass('translateXbackwards')
      .toggleClass('translateXonwards hidden');
    $('.home').toggleClass('hidden flex');
    $('.returnIcon, .header__container__msg').toggleClass('hidden');

    setTimeout(() => {
      $(step).toggleClass('translateXonwards flex');
    }, 500);
  }

  const goBack = (elt1, elt2) => {
    if (elt1.match('step1')) {
      if ($(elt1).is(':visible')) {
        backHome(elt1);
      }
    } else {
      if ($(elt1).is(':visible')) {
        $(elt1).toggleClass('translateXonwards flex hidden');

        $(elt2)
          .removeClass('translateXbackwards')
          .toggleClass('hidden flex');
      }
    }
  }

  goBack('.outRequests__step1');
  goBack('.inRequests__step1');
  goBack('.inReturns__step1');
  goBack('.outReturns__step1');
  goBack('.addReader__step1');

  goBack('.outRequests__step2', '.outRequests__step1');
  goBack('.outRequests__step3', '.outRequests__step2');
  goBack('.inRequests__step2', '.inRequests__step1');
  goBack('.inRequests__step3', '.inRequests__step2');
  goBack('.inReturns__step2', '.inReturns__step1');
  goBack('.inReturns__step3', '.inReturns__step2');
  goBack('.outReturns__step2', '.outReturns__step1');
  goBack('.outReturns__step3', '.outReturns__step2');
});
