function Honda(model) {
  if (this.verify(model, models)) {
    Car.call(this, {'make': 'honda', 'model': model});
    this.price = Honda.getPrice(model);
    this.models = models;
  }
}

var models = ["Accord", "Civic", "Crosstour", "CR-V", "CR-Z", "Fit", "HR-V", "Insight", "Odyssey", "Pilot"]

Honda.getPrice = function(model) {
  var prices = [16500,    14500,   21000,       15800,  12000,  13100, 16000,  18100,     22500,     19300];
  return prices[models.indexOf(model)]
}

Honda.prototype = Object.create(Car.prototype)

Honda.constructor = Honda;

Honda.prototype.verify = function(model, models) {
  if (!models.includes(model)) {
    throw new Error(`Model ${model} does not exist.`);
    return undefined
  }

  return true;
}

Honda.prototype.getModels = function() {
  return this.models;
}
