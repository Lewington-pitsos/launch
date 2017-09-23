$(function() {
  $('.close').on('click', function(e) {
    $(this).closest('.modal-background').animate({opacity: '0'}, 'slow', function() {
      $(this).closest('.modal-background').addClass('hidden');
    });
  })

  $('#team a').on('click', function(e) {
    e.preventDefault();
    console.log($(this).next());
    $(this).next().removeClass('hidden');
    $(this).next().animate({opacity: '1'}, 'slow')
  })
})
