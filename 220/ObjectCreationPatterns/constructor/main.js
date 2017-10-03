// 2
// 2
// 2
// 2
// 2
// 2

var RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  circumference: function() {
    return 2 * (this.width + this.height);
  }
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.circumference = RECTANGLE.circumference.call(this);
}

var rect1 = new Rectangle(2, 3);
//console.log(rect1.area);
//console.log(rect1.circumference);

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * Math.pow(this.radius, 2);
}

var a = new Circle(3);
var b = new Circle(4);

//console.log(a.area().toFixed(2)); // 28.27
//console.log(b.area().toFixed(2)); // 50.27

function Ninja(){
  this.swung = false;
}

var ninjaA = new Ninja();
var ninjaB = new Ninja();

// Add a swing method to the Ninja prototype which
// returns itself and modifies swung
Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

//console.log(ninjaA.swing().swung)      // this needs to be true
//console.log(ninjaB.swing().swung)      // this needs to be true

var ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

var ninjaB = Object.create(Object.getPrototypeOf(ninjaA))

//console.log(ninjaB.constructor === ninjaA.constructor)    // this should be true

var shape = {
  type: '',
  getType: function() {
    return this.type;
  }
}

function Triangle(a, b, c) {
  this.type = 'Triangle';
  this.a = a;
  this.b = b;
  this.c = c;
}

Triangle.prototype = shape;

Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
}

Triangle.prototype.constructor = Triangle;

var t = new Triangle(1, 2, 3);
//console.log(t.constructor);                 // Triangle(a, b, c)
//console.log(shape.isPrototypeOf(t));        // true
//console.log(t.getPerimeter());              // 6
//console.log(t.getType());                   // "triangle"


function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }
  this.name = first + ' ' + last;
}

var name = 'Jane Doe';
var user1 = new User('John', 'Doe');
var user2 = User('John', 'Doe');

//console.log(name);        // Jane Doe
//console.log(user1.name);   // John Doe
//console.log(user2.name);   // John Doe


function createObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

var foo = {
  a: 1
};

var bar = createObject(foo);
//console.log(foo.isPrototypeOf(bar));         // true

Object.prototype.begetObject = function() {
  return Object.create(this);
}

var foo = {
  a: 1
};

var bar = foo.begetObject();
//console.log(foo.isPrototypeOf(bar));         // true'


function neww(constructor, args) {
  var newObject = Object.create(constructor.prototype);
  constructor.call(newObject, ...args);
  return newObject;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
}

var john = neww(Person, ['John', 'Doe']);
john.greeting();          // Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}
