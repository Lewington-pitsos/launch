var CheckoutView = Backbone.View.extend({
  el: document.querySelector('.content'),
  template: JST['checkout'],
  events: {
    'click .checkout_footer a, .checkout_footer form': 'backToIndex',
    'click .fa-plus': 'incrimentQuantity',
    'click .fa-minus': 'decrementQuantity'
  },
  incrimentQuantity: function(e) {
    e.preventDefault();
    this.updateQuantity(e, 1);
  },
  decrementQuantity: function(e) {
    e.preventDefault();
    this.updateQuantity(e, -1);
  },
  updateQuantity: function(e, value) {
    var $row = $(e.target).closest('tr')
    var id = $row.attr('data-id');
    var model = this.collection.get(id);
    var price = model.get('price');
    model.set('quantity', model.get('quantity') + value);
    if (model.get('quantity') <= 0) {
      this.collection.remove(model);
      $row.remove();
      this.header.updateNumber(-1);
    } else {
      this.collection.trigger('update_quantity', model);
      $row.find('p').text(model.get('quantity'));
      $row.find('.total_price')
        .text(`${format_price(price * model.get('quantity'))}`);
    }
    this.updateTotal(value, price)
  },
  updateTotal: function(value, price) {
    var total = $('.total')
    var currentPrice = Number(total.html().replace('$', ''));
    $('.total').text(`$${format_price(currentPrice + (value * price))}`)
  },
  backToIndex: function(e) {
    e.preventDefault();
    this.collection.trigger('empty_self');
    router.navigate('index', {trigger: true});
  },
  render: function() {
    $('#cart').addClass('hidden')
    this.$el.html(this.template({total: this.getTotal()}));
    this.collection.each(this.renderModel.bind(this));
    $('tbody').html(this.htmlStore.html());
    this.htmlStore = $('<div>');
  },
  renderModel: function(model) {
    var html = new CheckoutItemView({
      model: model
    });

    this.htmlStore.append(html.$el.html());
  },
  getTotal: function() {
    var total = 0;
    this.collection.each(function(model) {
      total += model.get('price') * model.get('quantity')
    })
    return total;
  },
  initialize: function(options) {
    this.header = options.header;
    this.htmlStore = $('<div>');
  }
})
