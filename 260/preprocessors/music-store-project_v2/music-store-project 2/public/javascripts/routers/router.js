'use strict';

var Router = Backbone.Router.extend({
  routes: {
    'albums/new': 'newAlbum'
  },

  newAlbum: function newAlbum() {
    var newAlbum = new NewAlbumView();
    newAlbum.render();
  },
  index: function index() {
    this.indexView = new IndexView();
    this.indexView.render();
    this.$main = $('main');
    this.renderAlbums();
    this.cartView = new CartView({ collection: App.cart });
  },
  renderAlbums: function renderAlbums() {
    this.albumsView = new AlbumsView({
      collection: App.albums
    });

    this.$main.html(this.albumsView.el);
  },
  initialize: function initialize() {
    this.route(/^\/?$/, 'index');
  }
});
