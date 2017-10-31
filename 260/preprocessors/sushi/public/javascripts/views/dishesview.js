var DishesView = Backbone.View.extend({
  tagName: 'ul',
  id: 'items',
  events: {
    'click .add_cart': 'triggerAdd'
  },
  triggerAdd: function(e) {
    e.preventDefault();
    console.log('added');
    Application.trigger('dish_added');
  },
  render: function() {
    this.collection.forEach(this.renderModel.bind(this));
    $('.content').html(this.$el)
  },
  renderModel: function(model) {
    var modelView = new DishView({
      model: model
    })
    this.$el.append(modelView.render().$el.html())
  },
  initalize: function() {
  }
})
