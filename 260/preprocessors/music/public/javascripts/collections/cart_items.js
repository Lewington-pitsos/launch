var CartItems = Backbone.Collection.extend({
  modal: Album,
  setTotal: function() {
    this.total = this.toJSON().reduce(function(a, b) {
      return a + b.price * b.quantity;
    }, 0)

    return this
  },
  getTotal: function() {
    return this.total;
  },
  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0);

    return this
  },
  getQuantity: function() {
    return this.quantity;
  },
  destroy: function(id) {
    this.remove(id);
    this.setQuantity().setTotal();
    this.writeStorage();
  },
  readStorage: function() {
    var store = JSON.parse(localStorage.getItem('cart'));
    this.reset(store);
    this.setTotal().setQuantity();
  },
  writeStorage: function() {
    localStorage.setItem('cart', JSON.stringify(this.toJSON()));
  },
  addItem: function(item) {
    var existing = this.get(item.get('id'))

    if (existing) {
      existing.set('quantity', existing.get('quantity') + 1);
    } else {
      item = item.clone();
      item.set('quantity', 1);
      this.add(item);
    }
    this.setQuantity().setTotal();
    this.trigger('cart_updated');
    this.writeStorage()
  },
  initialize: function() {
    this.readStorage();
    this.on('destroy', this.destroy.bind(this));
  }
})
