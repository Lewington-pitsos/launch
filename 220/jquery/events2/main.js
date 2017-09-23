$(function() {
  var $form = $('form');
  var char;
  $form.on('submit', function(e) {
    e.preventDefault();
    var $input = $form.find(':text')
    console.log($input);
    char = $input.val().charCodeAt(0);

  })

  $(document).off('keypress').on('keypress', function(e) {
    if (char === e.which) {
      $('a').trigger('click');
    }
  })

  $('a').on('click', function functionName(e) {
    e.preventDefault();
    $('#accordion').slideToggle();
  })
})
