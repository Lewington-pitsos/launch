var DishesView = Backbone.View.extend({
  tagName: 'ul',
  id: 'items',
  events: {
    'click .add_cart': 'triggerAdd'
  },
  triggerAdd: function(e) {
    e.preventDefault();
    var id = $(e.target).closest('li').attr('data-id')
    Application.trigger('dish_added', id);
  },
  render: function() {
    this.collection.forEach(this.renderModel.bind(this));
    $('.content').html(this.$el)
  },
  renderModel: function(model) {
    console.log(model);
    var modelView = new DishView({
      model: model
    })
    this.$el.append(modelView.render().$el.html())
  },
  initalize: function() {
  }
})
