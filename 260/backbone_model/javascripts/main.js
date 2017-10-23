$(function() {
  var Fruit = Backbone.Model.extend({
    defaults: {
      categories: product_json['categories']
    },
    getDate: function() {
      var current_time = new Date((this.get('date') || Date.now()));
      this.set('date_formatted', current_time.toUTCString());
      this.set('datetime', current_time.toString());
    },
    initialize: function() {
      this.getDate();
    }
  });

  var banana = new Fruit(product_json);
  console.log(banana);

  var renderer = {
    $article: $('article'),
    $fieldset: $('fieldset'),
    formTemplate: Handlebars.compile($('#form').text()),
    productTemplate: Handlebars.compile($('#product').text()),
    renderProduct: function(object) {
      var productHtml = this.productTemplate(object);
      this.$article.html(productHtml);
      var formHtml = this.formTemplate(object);
      this.$fieldset.html(formHtml);
    }
  }

  renderer.renderProduct(banana.toJSON());

  var listener = {
    findElements: function() {
      this.$name = $('dd input');
      this.$description = $('textarea');
      this.$form = $('form');
    },

    startListeneing: function() {
      this.$form.on('submit', this.updateView.bind(this));
    },
    
    updateView: function(e) {
      e.preventDefault();
      var newFruit = {};
      newFruit['name'] = this.$name.val();
      newFruit['description'] = this.$description.val();
      var fruitModal = new Fruit(newFruit);
      renderer.renderProduct(fruitModal.toJSON());
      this.findElements()
    }
  }

  listener.findElements()

  listener.startListeneing();

})
