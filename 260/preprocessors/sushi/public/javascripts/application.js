var Application = {
  createDishes: function() {
    this.dishes = new Dishes();
    this.dishes.fetch({
      success: this.renderDishes.bind(this)
    });
  },
  renderDishes: function() {
    console.log(this.dishes);
    this.dishesView = new DishesView({
      collection: this.dishes
    });
    this.trackCart();
    this.bindListeners();
    this.render();
  },
  trackCart: function() {
    this.cart = new CartItems();
    this.cartView = new CartView({
      collection: this.cart
    })
  },
  render: function() {
    this.dishesView.render();
  },
  bindListeners: function() {
    _.extend(this, Backbone.Events);
    this.on('dish_added', this.addDish.bind(this))
  },
  addDish: function(id) {
    this.cartView.addToCart(id, this.dishes.at(id))
  },
  init: function() {
    this.createDishes();
  }
}
