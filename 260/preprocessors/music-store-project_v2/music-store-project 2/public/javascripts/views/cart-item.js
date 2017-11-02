'use strict';

var CartItemView = Backbone.View.extend({
  tagName: 'li',
  template: Handlebars.templates.cartItem,

  initialize: function initialize() {
    this.model.view = this;
    this.render();
  },
  render: function render() {
    var id = this.model.get('id');
    this.$el.attr('data-id', id);
    this.$el.html(this.template(this.model.attributes));
    return this.el;
  }
});
