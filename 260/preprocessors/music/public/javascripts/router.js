var router = new (Backbone.Router.extend({
  routs: {
    'albums/new': app.newAlbum()
  },
  index: function() {
    app.renderIndexView();
  },
  initialize: function() {
    this.route(/^\/?$/, 'index', this.index)
  }
}))();

Backbone.history.start({
  pushState: true,
})

$(document).on('click', 'a[href^="/"]', function(e) {
  e.preventDefault();
  router.navigate($(e.target).attr('href').replace(/^\//, ''), {trigger: true});
})
