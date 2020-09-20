const confirmation = () => {
  $('.confirmation').toggleClass('hidden flex');
  $('.wrapper, .header, .draft').toggleClass('blur');
  $('.wrapper *').removeClass('translateXbackwards');
}

$('.confirmation__body__cancel').click(() => {
  smartHide('.confirmation', 'out');
});
