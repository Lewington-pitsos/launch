var InfoView = Backbone.View.extend({
  el: document.querySelector('.content'),
  itemContainer: $('.section'),
  events: {
    'click a.close': 'signalReturn',
    'click .next': 'nextItem',
    'click .prev': 'prevItem'
  },
  template: JST['dish_info'],
  signalReturn: function(e) {
    e.preventDefault();
    Application.trigger('index_return');
  },
  nextItem: function() {
    var currentId = this.currentModel.get('id');
    if (currentId < 19) {
      this.currentModel = this.collection.get(this.currentModel.get('id') + 1);
      this.logToHistory(currentId + 1);
    }
    this.animateForwards();

  },
  animateForwards: function() {
    var itemContainer = $('.section').last();
    this.renderSection()
    itemContainer.animate({
      left: 1000
    }, 200, function() {
      itemContainer.remove();
    });
  },
  animateBackwards: function() {
    this.renderSection()
    var itemContainer = $('.section').first();
    itemContainer.css({
      'z-index': 9,
      left: 1000
    });
    itemContainer.animate({
      left: 0
    }, 200, function() {
      $('.section').last().remove();
      itemContainer.css('z-index', 1);
    });
  },
  logToHistory: function(id) {
    console.log('logged');
    router.navigate(`info/${id}`)
  },
  prevItem: function() {
    var currentId = this.currentModel.get('id');
    if (currentId > 1) {
      this.currentModel = this.collection.get(this.currentModel.get('id') - 1);
      this.logToHistory(currentId - 1);
    }
    this.animateBackwards()
  },
  renderSection: function() {
    var section = new InfoSection({
      model: this.currentModel
    });

    this.$el.find('#item_details').prepend(section.$el.html());
  },
  render: function(id) {
    this.currentModel = this.collection.get(id);
    this.$el.html(this.template({}));
    this.renderSection();
  },
  initialize: function(options) {
  }
})
