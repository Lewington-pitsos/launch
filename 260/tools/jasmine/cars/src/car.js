function Car(options) {
  this.make = options['make'];
  this.model = options['model'];
}

Car.prototype.toString = function() {
  return `${this.make} ${this.model}`;
}

Car.prototype.honkHorn = function() {
  return 'beep';
}
