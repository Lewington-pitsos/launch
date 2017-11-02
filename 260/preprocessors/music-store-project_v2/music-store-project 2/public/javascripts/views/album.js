'use strict';

var AlbumView = Backbone.View.extend({
  tagName: 'li',
  template: Handlebars.templates.album,
  events: {
    'click .btn-add': 'addToCart'
  },

  initialize: function initialize() {
    this.model.view = this;
    this.render();
  },
  render: function render() {
    var id = this.model.get('id');
    this.$el.attr('data-id', id);
    this.$el.html(this.template(this.model.attributes));
    return this.el;
  },
  addToCart: function addToCart(e) {
    e.preventDefault();
    App.trigger('addCartItem', this.model);
  }
});
