var serial = {
  number: 1,
  currentNumber: function() {
    current = this.number;
    this.number += 1;
    return current;
  }
}

var Item = Backbone.Model.extend({
  defaults: {
    name: 'Unknown',
    quantity: '0'
  },
  getId: function() {
    this.set('id', serial.currentNumber());
  },
  initialize: function() {
    this.getId()
  }
});

var ItemCollection = Backbone.Collection.extend({
  model: Item,
  comparator: function(model) {
    return model.get(this.sortingAttribute);
  },
  changeComparitor: function(attribute) {
    this.sortingAttribute = attribute;
  },
  sortingAttribute: 'name',
  initialize: function() {
    this.on('add', function(e) {
      listRenderer.renderNewItem(e)
    });
    this.on('remove', function(e) {
      listRenderer.deleteItem(e.get('id'))
    });
    this.on('sort', function(e) {
      listRenderer.reRender();
    });
  }
});

var allItems = new ItemCollection(items_json);

var listRenderer = {
  $list: $('tbody'),
  template: Handlebars.compile($('#item').text()),
  pluralTemplate: Handlebars.compile($('#items').text()),
  renderNewItem: function(model) {
    var html = this.template(model.toJSON());
    this.$list.append(html);
  },
  deleteItem: function(id) {
    var gone = this.$list.find(`a[data-id="${id}"]`).closest('tr');
    gone.remove()
  },
  reRender: function() {
    this.$list.html('');
    allItems.each(function(item) {
      listRenderer.renderNewItem(item);
    });
  }
}

allItems.each(function(item) {
  listRenderer.renderNewItem(item);
});

var PageView = Backbone.View.extend({
  el: 'body',
  events: {
    'submit form': 'submitItem',
    'click p a': 'deleteAll',
    'click table a': 'deleteItem',
    'click th': 'sort'
  },
  submitItem: function(e) {
    e.preventDefault();
    var $name = $('dl input:first-child');
    var $quantity = $('dl input[name="quantity"]');
    var info = {
      name: $name.val(),
      quantity: $quantity.val()
    }
    allItems.add(info);
    $name.val('');
    $quantity.val('');
  },
  deleteItem: function(e) {
    e.preventDefault();
    var id = $(e.target).attr('data-id');
    allItems.remove(id);
  },
  deleteAll: function(e) {
    e.preventDefault();
    allItems.set([])
  },
  sort: function(e) {
    e.preventDefault();
    var property = $(e.target).attr('data-prop');
    allItems.changeComparitor(property);
    allItems.sort();
  }
})

var view = new PageView();
