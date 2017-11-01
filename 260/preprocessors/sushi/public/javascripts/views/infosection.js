var InfoSection= Backbone.View.extend({
  template: JST['single_dish_info'],
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this
  },
  initialize: function(options) {
    return this.render();
  }
})
