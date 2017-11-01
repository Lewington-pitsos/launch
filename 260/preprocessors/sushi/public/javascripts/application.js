var Application = {
  createDishes: function() {
    this.headerView = new HeaderView();
    this.dishes = new Dishes();
    this.dishes.fetch({
      success: this.renderDishes.bind(this)
    });
  },
  renderDishes: function() {
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
      collection: this.cart,
      header: this.headerView
    });
    this.checkout = new CheckoutView({
      collection: this.cart,
      header: this.headerView
    });
  },
  render: function() {
    $('#cart').removeClass('hidden');
    this.dishesView.render();
  },
  bindListeners: function() {
    _.extend(this, Backbone.Events);
    this.on('dish_added', this.addDish.bind(this));
    this.on('dish_focused', this.renderDishInfo.bind(this));
    this.on('index_return', this.render.bind(this));
    this.on('visit_checkout', this.visitCheckout.bind(this))
  },
  addDish: function(id) {
    this.cartView.addToCart(id, this.dishes.get(id).clone())
  },
  renderDishInfo: function(id) {
    this.infoView = new InfoView({
      collection: this.dishes,
      id: id
    })
  },
  visitCheckout: function() {
    this.checkout.render();
  },
  init: function() {
    this.createDishes();
  }
}

Handlebars.registerHelper('format_price', function(price) {
  return (+price).toFixed(2);
})

Handlebars.registerHelper('aggregate_price', function(price, quantity) {
  return (price * quantity).toFixed(2);
})
