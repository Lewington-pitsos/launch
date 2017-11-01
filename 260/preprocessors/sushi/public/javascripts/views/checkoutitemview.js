var CheckoutItemView = Backbone.View.extend({
  template: JST['checkout_item'],
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },
  initialize: function() {
    this.render();
  }
})
