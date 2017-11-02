var App = {
  setupTemplates: function setupTemplates() {
    Handlebars.partials = Handlebars.templates;
    Handlebars.registerHelper('formatPrice', function (price) {
      return Number(price).toFixed(2);
    });
    Handlebars.registerHelper('pluralize', function (quantity) {
      var msg = void 0;
      if (quantity > 1) {
        msg = quantity + ' items';
      } else {
        msg = quantity + ' item';
      }

      return msg;
    });
  },
  setupRouter: function setupRouter() {
    Backbone.history.start({
      pushState: true
    });

    $(document).on('click', 'a[href^="/"]', function (e) {
      e.preventDefault();
      App.router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
    });
  },
  updateStorage: function updateStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cart.toJSON()));
  },
  bindEvents: function bindEvents() {
    _.extend(this, Backbone.Events);
    this.on('addCartItem', this.cart.addItem.bind(this.cart));

    window.addEventListener('unload', App.updateStorage.bind(App));
  },
  init: function init(albums) {
    this.albums = new AlbumsCollection(albums);
    this.router = new Router();
    this.setupTemplates();
    this.cart = new CartItems();
    this.bindEvents();
    this.setupRouter();
  }
};
