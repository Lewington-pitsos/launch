$(function() {
  var header = $('header:last');
  $('h1:first').prependTo(header);
  header.prependTo($('body'));

  var figures = $('section figure');
  var caption1 = $('figcaption:first').text();
  var caption2 = $('figcaption:last').text();
  $('article').append(figures.toArray().reverse());
  $('figcaption:first').text(caption1)
  $('figcaption:last').text(caption2)
})
