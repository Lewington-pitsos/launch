var Router = Backbone.Router.extend({
  routes: {
    'index': 'goIndex',
    'info/:id': 'goTo',
    'cart': 'goCart'
  },
  goIndex: function() {
    Application.render();
  },
  goTo: function(id) {
    Application.renderDishInfo(id);
  },
  goCart: function() {
    Application.visitCheckout();
  },
  initialize: function() {
  }
})

var router = new Router();

Backbone.history.start({
  pushState: true,
  silent: true
})
