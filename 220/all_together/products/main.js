$(function() {
  var categories = [];
  var list = $('ul');
  var form = $('form');
  catalogue.forEach(function(el) {
    var cat = el['category'];
    var node = `<li data-id="${el['id']}" data-cat="${cat}">${el['title']}</li>`;
    list.append(node);
    if (!categories.includes(cat)) {
      var checkbox = `<label><input type="checkbox" data-cat="${cat}" checked>${cat}</label>`
      form.append(checkbox);
      categories.push(cat);
    }
  })

  $(':checkbox').change(function() {
    var currentCat = $(this);
    var items = $(`li[data-cat="${currentCat.data('cat')}"]`);
    items.toggleClass('invisible');
  })
})
