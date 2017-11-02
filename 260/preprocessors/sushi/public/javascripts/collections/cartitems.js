var CartItems = Backbone.Collection.extend({
  model: Dish,
  url: '/data/cart.json',
  addToCart: function(id, model) {
    var currentModel = this.get(id);
    if (currentModel) {
      this.increment(model);
    }
  },
  bindListeners: function() {
    this.on('change update reset', this.saveModel.bind(this));
    this.on('empty_self', this.empty.bind(this));
  },
  saveModel: function(model) {
    Backbone.sync('create', this);
  },
  empty: function() {
    console.log('asdasdasd');
    this.reset();
  },
  increment: function(model) {
    model.set('quantity', model.get('quantity') + 1);
  },
  initialize: function() {
    this.bindListeners();
  }
})
