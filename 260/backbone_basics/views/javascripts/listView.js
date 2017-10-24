var ListView = Backbone.View.extend({
  el: '#favorites',
  render: function() {
    this.collection.each(this.renderItem.bind(this));
  },
  renderItem: function(model) {
    var view = new ItemView({model: model});
    this.$el.append(view.render().el)
  },
  initialize: function() {
    this.listenTo(this.collection, 'add', this.renderItem.bind(this));
  }
})
