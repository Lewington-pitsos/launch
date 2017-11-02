'use strict';

var NewAlbumView = Backbone.View.extend({
  el: 'body',
  template: Handlebars.templates.newAlbum,
  events: {
    submit: 'addAlbum'
  },

  addAlbum: function addAlbum(e) {
    e.preventDefault();
    var $formData = $('form');

    $.ajax({
      url: $formData.attr('action'),
      type: $formData.attr('method'),
      data: $formData.serialize(),
      success: function success(json) {
        App.albums.add(json);
        App.router.navigate('/', { trigger: true });
      }
    });
  },
  render: function render() {
    this.$el.html(this.template);
  }
});
