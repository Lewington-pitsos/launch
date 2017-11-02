'use strict';

var CartItems = Backbone.Collection.extend({
  initialize: function initialize() {
    this.on('add', this.calculateTotals);
    this.on('change:quantity', this.update);
    this.on('destroy', this.destroy);
    this.cartTotal = 0;
    this.cartQuantity = 0;
    this.readStorage();
  },
  readStorage: function readStorage() {
    var storedItems = JSON.parse(localStorage.getItem('cartItems'));
    this.reset(storedItems);
    this.calculateTotals();
  },
  addItem: function addItem(album) {
    var item = this.findWhere({ id: album.id }) || album.clone();
    if (item.has('quantity')) {
      item.set('quantity', Number(item.get('quantity')) + 1);
    } else {
      item.set('quantity', 1);
      this.add(item);
    }
  },
  calculateTotals: function calculateTotals() {
    this.cartTotal = this.reduce(function (total, item) {
      return total + Number(item.get('quantity')) * Number(item.get('price'));
    }, 0);

    this.cartQuantity = this.reduce(function (total, item) {
      return total + Number(item.get('quantity'));
    }, 0);
  },
  update: function update(model) {
    this.calculateTotals();
    model.view.render();
  },
  destroy: function destroy(id) {
    this.get(id).view.remove();
    this.remove(id);
    this.calculateTotals();
  }
});
