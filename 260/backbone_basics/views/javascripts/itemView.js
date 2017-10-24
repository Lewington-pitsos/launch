var ItemView = Backbone.View.extend({
  tagName: 'li',
  template: Handlebars.compile($('#item-template').text()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this
  }
})
