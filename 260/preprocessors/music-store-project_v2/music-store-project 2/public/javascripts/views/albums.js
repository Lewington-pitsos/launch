'use strict';

var AlbumsView = Backbone.View.extend({
  tagName: 'ul',

  render: function render() {
    this.collection.each(this.renderAlbum.bind(this));
  },
  renderAlbum: function renderAlbum(album) {
    var albumView = new AlbumView({
      model: album
    });

    this.$el.append(albumView.el);
  },
  initialize: function initialize() {
    this.$el.addClass('albums');
    this.render();
  }
});
