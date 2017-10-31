var CartView = Backbone.View.extend({
  tagName: 'ul',
  cart: $('#cart'),
  renderAll: function() {
    this.collection.forEach(this.renderItem.bind(this));
    this.cart.html(this.$el)
  },
  renderSingleItem: function() {
    var modelView = new CartItemView({
      model: model
    });
    this.cart.append(modelView.render().$el.html());
  },
  renderItem: function(model) {
    var modelView = new CartItemView({
      model: model
    });
    this.$el.append(modelView.render().$el.html())
  },
  initalize: function() {
  }
})
