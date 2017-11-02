var CartView = Backbone.View.extend({
  el: document.querySelector('#cart'),
  htmlStore: '',
  events:{
    'click .empty_cart': 'animateOut',
    'click a.checkout': 'focusCheckout'
  },
  renderAll: function() {
    this.collection.forEach(this.renderAndUpdateTotal.bind(this));
    this.animateIn();
  },
  renderAndUpdateTotal: function(model) {
    this.renderItem(model);
    this.updateTotal(model.get('price') * model.get('quantity'));
  },
  findModel: function(id) {
    return this.collection.get(id);
  },
  emptyCart: function() {
    this.collection.reset();
    this.$el.find('ul').html('');
    this.resetTotal();
  },
  addToCart: function(id, model) {
    var cartModel = this.collection.get(id)
    if (cartModel) {
      this.collection.increment(cartModel)
      this.updateQuantity(cartModel);
    } else {
      this.collection.add(model);
      this.addSingleItem(model);
    }
    this.updateTotal(model.get('price'));
  },
  updateQuantity: function(model) {
    var $updatedDish = this.$el.find(`[data-id="${model.get('id')}"] p`)
    var currentText = $updatedDish.text()
    $updatedDish.text(currentText.replace(/.+?\s/, model.get('quantity') + ' '));
  },
  addSingleItem: function(model) {
    this.animateIn();
    this.renderItem(model);
  },
  updateTotal: function(price) {
    this.totalHolder = this.$el.find('.total')
    var newTotal = Number(this.totalHolder.text().replace('$', '')) + price
    this.totalHolder.text(`$${format_price(newTotal)}`);
  },
  resetTotal: function() {
    this.totalHolder.text('$0.00');
    this.header.reset();
  },
  animateIn: function() {
    this.$el.animate({
      height: 120
    }, 300)
  },
  animateOut: function() {
    this.$el.animate({
      height: 0
    }, 500, this.emptyCart.bind(this));
  },
  flashOut: function() {
    this.$el.css('height', 0);
    this.emptyCart();
  },
  focusCheckout: function(e) {
    e.preventDefault();
    console.log('checkout');
    router.navigate('cart', {trigger: true});
  },
  renderItem: function(model) {
    var modelView = new CartItemView({
      model: model
    });

    this.$el.find('ul').append(modelView.render().$el.html());
    this.header.updateNumber(1);
  },
  removeModel: function(model) {
    var $toRemove = this.$el.find(`[data-id="${model.get('id')}"]`);
    $toRemove.remove();
  },
  bindEvents: function() {
    this.listenTo(this.collection, 'empty_self', this.flashOut.bind(this));
    this.listenTo(this.collection, 'remove', this.removeModel.bind(this));
    this.listenTo(this.collection, 'update_quantity', this.updateQuantity.bind(this));
  },
  initialize: function(options) {
    this.header = options.header;
    this.bindEvents();
  }
})
