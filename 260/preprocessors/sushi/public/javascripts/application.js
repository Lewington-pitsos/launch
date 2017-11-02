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
    router.navigate('index', {trigger: true});
    this.infoView = new InfoView({
      collection: this.dishes
    })
  },
  trackCart: function() {
    this.cart = new CartItems();
    this.cart.fetch({
      success: this.setCartRelatedViews.bind(this)
    });
  },
  setCartRelatedViews: function() {
    this.cartView = new CartView({
      collection: this.cart,
      header: this.headerView
    });
    this.checkout = new CheckoutView({
      collection: this.cart,
      header: this.headerView
    });
    if (this.cart.length > 0) {
      this.cartView.renderAll();
    }
  },
  render: function() {
    $('#cart').removeClass('hidden');
    this.dishesView.render();
  },
  bindListeners: function() {
    _.extend(this, Backbone.Events);
    this.on('dish_added', this.addDish.bind(this));
  },
  addDish: function(id) {
    this.cartView.addToCart(id, this.dishes.get(id).clone())
  },
  goDishInfo: function(id) {
    router.navigate(`info/${id}`, {trigger: true});
  },
  renderDishInfo: function(id) {
    this.infoView.render(id);
  },
  visitCheckout: function() {
    this.checkout.render();
  },
  init: function() {
    this.createDishes();
    router.navigate('');
  }
}

Handlebars.registerHelper('format_price', function(price) {
  return (+price).toFixed(2);
})

Handlebars.registerHelper('aggregate_price', function(price, quantity) {
  return (price * quantity).toFixed(2);
})
