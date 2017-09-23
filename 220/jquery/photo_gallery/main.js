$(function() {
  $('ul').on('click', 'li img', function(e) {
    $('li img').removeClass('active');
    $(this).addClass('active');

    var currentSource = $(this).attr('src');
    $('figure img').animate({
      opacity: '0',
      top: '100px',
      height: '800px',
      width: '400px'
    }, { duration: 500, queue: false })

    $(`figure [src='${currentSource}']`).animate({
      opacity: '1',
      top: '0',
      height: '900px',
      width: '1000px'
    }, { duration: 500, queue: false })
  })
})
