'use strict';

var IndexView = Backbone.View.extend({
  el: 'body',
  template: Handlebars.templates.index,
  render: function render() {
    this.$el.html(this.template);
  }
});
