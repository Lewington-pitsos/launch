var FormView = Backbone.View.extend({
  template: JST.form,
  events: {
    'submit': 'formFinished'
  },
  formFinished: function(e) {
    e.preventDefault();
    var $f = this.$('form');

    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      data: $f.serialize(),
      success: function(json) { // json is what our router feeds us
        app.albums.add(json);
        app.renderIndexView();
      }
    });
  },
  render: function() {
    this.$el.html(this.template());
    app.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
})
