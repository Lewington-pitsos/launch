var AlbumView = Backbone.View.extend({
  tagName: 'li',
  template: JST.album,
  events: {
    'click a.button': 'addToCart'
  },
  addToCart: function(e) {
    e.preventDefault();
    app.trigger('add_to_cart', this.model);
  },
  render: function() {
    var id = this.model.get('id');

    this.$el.attr('id', `album_${id}`)
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(app.$el.find('ul'));
    return this
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
})
