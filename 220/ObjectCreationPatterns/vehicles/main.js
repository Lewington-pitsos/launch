
// creates new vehicle objects
function Vehicle() {
  this.doors = 4;
  this.wheels = 4;

}

// setting up the prototype for all objects craeted by Vehicle

var sedan = new Vehicle();

var coupe = new Vehicle();

coupe.doors = 2;

console.log(sedan.hasOwnProperty("doors"));
console.log(coupe.hasOwnProperty("doors"));

function Coupe() {

}

function Motorcycle() {

}

var c = new Coupe();
var m = new Motorcycle();

function Sedan() {

}

Sedan.prototype = Object.create(Vehicle.prototype)
