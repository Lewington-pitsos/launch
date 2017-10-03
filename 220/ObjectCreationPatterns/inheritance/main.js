function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

var lizzy = new Lizard();
//lizzy.scamper(); // ?

var prot = {};

var foo = Object.create(prot);
//console.log(Object.getPrototypeOf(foo));
//console.log(prot.isPrototypeOf(foo));


function getDefiningObject(object, propKey) {
  if (object === null) {
    return null;
  } else if (!object.hasOwnProperty(propKey)) {
    return getDefiningObject(Object.getPrototypeOf(object), propKey)
  } else {
    return object
  }
}

var foo = {
  a: 1,
  b: 2
};

var bar = Object.create(foo);
var baz = Object.create(bar);
var qux = Object.create(baz);
bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // true
console.log(getDefiningObject(qux, 'e'));             // null

function shallowCopy(object) {
  var parent = Object.getPrototypeOf(object);
  var newObject = Object.create(parent);

  var props = Object.getOwnPropertyNames(object);

  props.forEach(function(prop) {
    newObject[prop] = object[prop];
  })

  return newObject;
}

var foo = {
  a: 1,
  b: 2
};

var bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log("c is " + this.c);
}

var baz = shallowCopy(bar);
console.log(baz.a);       // 1
baz.say();                // c is 3


function extend(destination, ...objects) {
  objects.forEach(function(object) {
    Object.getOwnPropertyNames(object)
      .forEach(function(prop) {
        destination[prop] = object[prop];
      })
  })

  return destination;
}

var foo = {
  a: 0,
  b: {
    x: 1,
    y: 2
  }
};

var joe = {
  name: 'Joe'
};

var funcs = {
  sayHello: function() {
    console.log('Hello, ' + this.name);
  },
  sayGoodBye: function() {
    console.log('Goodbye, ' + this.name);
  }
};

var object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // 1
object.sayHello();                // Hello, Joe
