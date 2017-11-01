var CartItems = Backbone.Collection.extend({
  model: Dish,
  url: 'data/cart.json',
  addToCart: function(id, model) {
    var currentModel = this.get(id);
    if (currentModel) {
      this.increment(model);
    }
  },
  increment: function(model) {
    model.set('quantity', model.get('quantity') + 1);
  }
})
