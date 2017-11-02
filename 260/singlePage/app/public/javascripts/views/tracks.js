var $overlay = $("overlay");

var TracksView = Backbone.View.extend({
  duration: 300,
  template: Handlabars.compile($('[data-name="tracks"]').html()),
  open: function() {
    console.log('opening');
    this.$el.add($overlay).fadeIn(this.duration);
  },
  render: function() {
    this.$el.html(this.template({
      album: album,
      tracks: this.collection.toJSON()
    }));
    this.open();
  },
  fadeOut: function() {
    $overlay.fadeOut(this.duration)
    this.$el.fadeOut(this.duration, function() {
      this.remove()
    }).bind(this);
  },
  close: function(e) {
    e.preventDefault();
    this.fadeOut();
    history.back();
  },
  initialize: function(options) {
    this.album = options.album;
    this.$el.appendTo(document.body);
  }
})
