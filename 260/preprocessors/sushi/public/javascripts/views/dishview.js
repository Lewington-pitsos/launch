var DishView = Backbone.View.extend({
  template: JST['index_item'],
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this
  },
})
