'use strict';

var CartView = Backbone.View.extend({
  events: {
    'click a': 'removeItem'
  },

  template: Handlebars.templates.cart,
  initialize: function initialize() {
    this.listenTo(this.collection, 'change:quantity', this.update);
    this.listenTo(this.collection, 'add', this.addItem);
    this.$header = $('header');
    this.render();
  },
  render: function render() {
    var total = this.collection.cartTotal;
    var quantity = this.collection.cartQuantity;

    this.$el.addClass('cart');
    this.$el.html(this.template({ cartTotal: total, cartQuantity: quantity }));
    this.$header.append(this.el);
    this.loadExisitngItems();
  },
  formatQuantity: function formatQuantity(quantity) {
    var msg = void 0;
    if (quantity > 1) {
      msg = quantity + ' items';
    } else {
      msg = quantity + ' item';
    }

    return msg;
  },
  update: function update() {
    this.$('label').text(this.formatQuantity(this.collection.cartQuantity));
    this.$('p').text('$' + this.collection.cartTotal.toFixed(2));
  },
  loadExisitngItems: function loadExisitngItems() {
    this.collection.each(this.addItem.bind(this));
  },
  addItem: function addItem(item) {
    this.$items = this.$items || $('.items ul');
    var itemView = new CartItemView({ model: item });
    this.$items.append(itemView.render());
    this.update();
  },
  removeItem: function removeItem(e) {
    e.preventDefault();
    var id = $(e.currentTarget).data('id');
    this.collection.trigger('destroy', id);
    this.update();
  }
});
