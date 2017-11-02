var DishesView = Backbone.View.extend({
  el: document.querySelector('.content'),
  $htmlStore: $('<ul>', {id: 'items'}),
  events: {
    'click .add_cart': 'triggerAdd',
    'click header': 'focusInfo'
  },
  triggerAdd: function(e) {
    e.preventDefault();
    var id = $(e.target).closest('li').attr('data-id') ||
              $(e.target).closest('.section').attr('data-id')
    Application.trigger('dish_added', id);
  },
  focusInfo: function(e) {
    e.preventDefault()
    var id = $(e.target).closest('li').attr('data-id');
    router.navigate(`info/${id}`, {trigger: true});
  },
  render: function() {
    this.collection.forEach(this.renderModel.bind(this));
    this.$el.html(this.$htmlStore.clone().wrap('<div>').parent().html());
    this.$htmlStore = $('<ul>', {id: 'items'});
  },
  renderModel: function(model) {
    var modelView = new DishView({
      model: model
    })
    this.$htmlStore.append(modelView.render().$el.html());
  },
  initalize: function() {
  }
})
