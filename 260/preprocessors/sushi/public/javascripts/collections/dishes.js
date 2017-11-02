var Dishes = Backbone.Collection.extend({
  model: Dish,
  url: '/data/dishes.json'
})
