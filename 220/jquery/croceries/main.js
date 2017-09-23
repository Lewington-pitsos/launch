$(function() {
  $list = $('ul');
  $(document).on('submit', function(e) {
    e.preventDefault();
    var name = $('#name').val();
    var number = Number($('#number').val()) || 1;
    var newLi = `<li>${number} ${name}</li>`;
    $list.append(newLi);
    var form = document.querySelector('form');
    form.reset();
  })
})
