var $ = document.createElement('script');
$.src = '//code.jquery.com/jquery-1.11.0.min.js';
document.getElementsByTagName('head')[0].appendChild($);

$().ready(() => {
  $('.project-name').first().text("Copernicane 2019");
});
