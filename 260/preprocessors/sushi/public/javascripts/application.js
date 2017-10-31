var Application = {
  createDishes: function() {
    this.dishes = new Dishes({
      id: 1,
      imagePath: 'images/sashimi-salad.jpg',
      price: 12,
      title: 'Sashimi salad'
    });
    this.dishesView = new DishesView({
      collection: this.dishes
    });
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
    this.on('dish_added', this.addDish.bind(this))
  },
  addDish: function() {
    console.log('asdas');
  },
  init: function() {
    this.createDishes();
    this.trackCart();
    this.bindListeners();
    this.render();
  }
}
