// Connexion au websocket
const socket = io();
let data2send = {
  table: '',
  values: [],
  authorFirstName: true
};

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

const handleSimpleStep = (element, step1, step2) => {
  $(`${element}__${step1}__btn`).click(() => {
    if (element === '.outRequests' && step1 === 'step2') {
      window.open('https://www.samarcande-bibliotheques.be/pro/');
    }

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

handleSimpleStep('.inRequests', 'step2', 'step3');
handleSimpleStep('.outRequests', 'step1', 'step2');
handleSimpleStep('.outRequests', 'step2', 'step3');
handleSimpleStep('.inReturns', 'step1', 'step2');

$('.inRequests__step3__btn').click(() => {
  window.open('https://www.samarcande-bibliotheques.be/pro/');
});

$('.returnIcon').click(() => {
  const backHome = step => {
    $(step).toggleClass('translateXonwards hidden');
    $('.home').toggleClass('hidden flex');
    $('.returnIcon, .header__msg').toggleClass('hidden');

    setTimeout(() => {
      $(step).toggleClass('translateXonwards flex');
    }, 500);
  }

  if ($('.outRequests__step1').is(':visible')) {
    backHome('.outRequests__step1');
  } else if ($('.outRequests__step2').is(':visible')) {
    $('.outRequests__step2').toggleClass('translateXonwards flex hidden');
    $('.outRequests__step1').toggleClass('translateXbackwards hidden flex');
  } else if ($('.outRequests__step3').is(':visible')) {
    $('.outRequests__step3').toggleClass('translateXonwards flex hidden');
    $('.outRequests__step2').toggleClass('translateXbackwards hidden flex');
  } else if ($('.inRequests__step1').is(':visible')) {
    backHome('.inRequests__step1');
  } else if ($('.inRequests__step2').is(':visible')) {
    $('.inRequests__step2').toggleClass('translateXonwards flex hidden');
    $('.inRequests__step1')
      .removeClass('translateXbackwards')
      .toggleClass('hidden flex');
  } else if ($('.inRequests__step3').is(':visible')) {
    $('.inRequests__step3').toggleClass('translateXonwards flex hidden');
    $('.inRequests__step2').toggleClass('translateXbackwards hidden flex');
  } else if ($('.inReturns__step1').is(':visible')) {
    backHome('.inReturns__step1');
  } else if ($('.inReturns__step2').is(':visible')) {
    $('.inReturns__step2').toggleClass('translateXonwards flex hidden');
    $('.inReturns__step1').toggleClass('translateXbackwards hidden flex');
  }
});
