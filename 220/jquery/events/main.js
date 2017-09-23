

$(function() {
  var $p = $('p');
  var $a = $('a');
  $a.on('click', function(e) {
    e.preventDefault();
    var $target = $(this);
    $p.text(`You have selected ${$target.text()} like a chump`);
  });

  var $input = $(':text');
  $('form').on('submit', function(e) {
    e.preventDefault();
    console.log($input.val());
    var fruit = $input.val();
    var node = document.createElement('a');
    node.setAttribute('href', '#');
    node.textContent = fruit;
    var list = document.createElement('li');
    list.appendChild(node);
    document.querySelector('ul').appendChild(list);
    $input.val('');
  })

  var b = $('.b');
  console.log(b);
  console.log(b.siblings());
});
