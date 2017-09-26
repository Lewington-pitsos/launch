var inventory;

function getTemplate() {
  return $('#inventory_item').remove().text();
}

$(function() {
  inventory = {
    collection: [],
    setDate: function() {
      var date = new Date();
      $('#order_date').text(date.toUTCString());
    },
    init: function() {
      this.setDate();
      // ...
    },
    template: getTemplate()
  };

  var count = 1;
  inventory.init.bind(inventory);
  $('#add_item').on('click', function() {
    $('#inventory').append(inventory.template.replace(/ID/g, count));
    inventory.collection.push({
      id: count,
      name: '',
      stock_number: '',
      quantity: 1
    })

    count += 1;
  })

  $('#inventory').on('blur', 'input', function(e) {
    var value = $(this).val();
    var name = $(this).attr('name').slice(5, -2);
    var index = $(this).closest('tr').find('input').eq(0).val() - 1;
    inventory.collection[index][name] = value;
  })

  $('#inventory').on('click', '.delete', function(e) {
    e.preventDefault();
    var index = $(this).closest('tr').find('input').eq(0).val() - 1;
    inventory.collection.splice(index, 1);
    $(this).closest('tr').remove();
    count -= 1;
  })
})
