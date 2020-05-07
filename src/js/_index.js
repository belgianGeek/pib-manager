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

// Récupérer la date du jour et l'utiliser comme valeur pour les champs date
let day, month;
if (new Date().getDate() < '10') {
  day = `0${new Date().getDate()}`;
} else {
  day = new Date().getDate();
}

if (new Date().getMonth() < '10') {
  month = `0${new Date().getMonth() + 1}`;
} else {
  month = new Date().getMonth() + 1;
}

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

$('.inRequests__step3__btn, .outRequests__step2__btn', '.inReturns__step2__btn', '.outReturns__step2__btn').click(() => {
  window.open('https://www.samarcande-bibliotheques.be/pro/');
});

$('.returnIcon').click(() => {
  const backHome = step => {
    $(step)
      .removeClass('translateXbackwards')
      .toggleClass('translateXonwards hidden');
    $('.home').toggleClass('hidden flex');
    $('.returnIcon, .header__msg').toggleClass('hidden');

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
