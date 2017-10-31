var CartItemView = Backbone.View.extend({
  template: JST['cart_item'],
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this
  },
})
