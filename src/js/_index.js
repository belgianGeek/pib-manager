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

$('.outRequests__step1__btn').click(() => {
  $('.outRequests__step1').toggleClass('translateXbackwards hidden flex');
  setTimeout(() => {
    $('.outRequests__step2')
      .fadeIn()
      .removeAttr('style')
      .removeClass('translateXonwards hidden')
      .toggleClass('fixed flex');
  }, 1000);
});

$('.outRequests__step2__btn').click(() => {
  // window.open('https://www.samarcande-bibliotheques.be/pro/');
  $('.outRequests__step2').toggleClass('translateXbackwards hidden flex');
  setTimeout(() => {
    $('.outRequests__step3')
      .fadeIn()
      .removeAttr('style')
      .removeClass('translateXonwards hidden')
      .toggleClass('fixed flex');
  }, 1000);
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
  }
});
