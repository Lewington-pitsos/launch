var HeaderView = Backbone.View.extend({
  el: document.querySelector('header'),
  numberHolder: $('.cart .right'),
  events: {
    'click a.logo, .cart': 'signalReturn',
  },
  updateNumber: function(value) {
    var newNumber = Number(this.numberHolder.text().replace(/items?/, '')) + value
    var word = newNumber === 1 ? 'item' : 'items'
    this.numberHolder.text(`${newNumber} ${word}`);
  },
  reset: function() {
    this.numberHolder.text(`0 items`);
  },
  signalReturn: function(e) {
    e.preventDefault();
    router.navigate('index', {trigger: true});
  },
})
