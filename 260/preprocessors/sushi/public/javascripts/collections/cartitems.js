var CartItems = Backbone.Collection.extend({
  model: Dish,
  addToCart: function(id, model) {
    var currentModel = this.at(id);
    if (currentModel) {
      this.increment(model);
    }
  },
  increment: function(model) {
    model.set('quantity', model.get('quantity') + 1);
  }
})
