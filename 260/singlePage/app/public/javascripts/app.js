var app = {
  fetchAlbums: function() {
    this.albums = new Albums();
    this.view = new AlbumsView({
      collection: this.albums
    })
    this.albums.fetch({
      success: this.albumsLoaded.bind(this)
    })
  },
  albumsLoaded: function (){
    this.view.render();
  },
  tracksLoaded: function() {
    var tracks_modal = new TracksView({
      collection: tracks,
      album: this.selected_album.toJSON()
    })

    console.log('loaded');

    tracks_modal.render();
    this.tracks = tracks_modal;
  },
  fetchTracks: function(name) {
    var tracks = new (Tracks.extend({
      url: "/albums" + name + ".json"
    }))();

    console.log('fetched');

    this.selected_album = this.albums.findWhere({title: name});

    tracks.fetch({
      success: this.tracksLoaded.bind(this)
    })
  },
  init: function() {
    this.fetchAlbums();
  }
}

var Router = Backbone.Router.extend({
  routs: {
    'albums/:name': 'getAlbum'
  },
  getAlbum: function(name) {
    console.log('going to get albvum');
    app.fetchTracks(name);
  },
  index: function() {
    if (!app.tracks.$el.is(':animated')) {
      app.tracks.fadeOut();
    }
  },
  initialize: function() {
    this.route(/^\/?$/, 'index', this.index);
  }
})

var router = new Router();

Backbone.history.start({
  pushState: true,
  silent: true
});

$(document).on('click', 'main li a', function(e) {
  e.preventDefault();
  console.log($(e.currentTarget).attr('href').replace(/^\//, ""));
  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ""), {trigger: true} );
})
