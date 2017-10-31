var CartView = Backbone.View.extend({
  el: document.querySelector('#cart ul'),
  wholeCart: $('#cart'),
  htmlStore: '',
  renderAll: function() {
    this.collection.forEach(this.renderItem.bind(this));
    this.$el.html(this.htmlStore);
  },
  findModel: function(id) {
    return this.collection.at(id);
  },
  addToCart: function(id, model) {
    if (this.collection.at(id)) {
      this.collection.increment(model)
      this.updateQuantity(id, model.get('quantity'));
    } else {
      this.collection.add(model);
      this.addSingleItem(model);
    }
  },
  updateQuantity: function(id, quantity) {
    var $updatedDish = this.$el.find(`[data-id="${id}"] p`)
    var currentText = $updatedDish.text()
    $updatedDish.text(currentText.replace(/.+?\s/, quantity + 1 + ' '));
  },
  addSingleItem: function(model) {
    this.wholeCart.addClass('visible');
    var modelView = new CartItemView({
      model: model
    });

    this.$el.append(modelView.render().$el.html());
  },
  renderItem: function(model) {
    var modelView = new CartItemView({
      model: model
    });
    this.htmlStore += modelView.render().$el.html();
  },
  initalize: function() {
  }
})
