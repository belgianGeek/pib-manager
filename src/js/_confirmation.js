const confirmation = () => {
  $('.confirmation').toggleClass('hidden flex');
  $('.wrapper, .header, .draft').toggleClass('blur');
  $('.wrapper *').removeClass('translateXbackwards');
}
