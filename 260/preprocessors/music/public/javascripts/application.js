var app = {
  templates: JST,
  renderIndexView: function() {
    this.indexView = new IndexView();
    this.renderAlbums();
    this.createCart();
    this.bindEvents();
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cartView = new CartView({
      collection: this.cart
    });
  },
  $el: $('main'),
  renderAlbums: function() {
    this.albums.each(this.renderAlbumView.bind(this))
  },
  renderAlbumView: function(album) {
    new AlbumView({
      model: album
    });
  },
  newAlbum: function() {
    new FormView();
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events); // makes on/listenTo piossible
    this.listenTo(this.indexView, 'add_album', this.newAlbum);
    this.on('add_to_cart', this.cart.addItem.bind(this.cart));
  }
};

Handlebars.registerHelper('format_price', function(price) {
  return (+price).toFixed(2);
})
