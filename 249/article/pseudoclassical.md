# Pseudoclassical Object Creation in Javascript

## Preamble (feel free to skip)
In programming, object is the name given to an isolated bundle of (ideally) related functionality and data, which is kept separate from the general flow of the existing code-base. Objects in this sense have proven to be exceedingly useful to programmers working on large projects which routinely contain thousands upon thousands of interacting objects, many of which are very similar, or contain overlapping functionality or information. In order to help programmers successfully build programs using objects, object-oriented programming languages like Javascript need to furnish programmers with a way of reusing or recycling the behaviour or functionality attached to certain objects and applying it to other objects in a way that is easy to follow and implement. Similarly, these languages should provide programmers a similarly intuitive and fiddle-free means of extending or altering the functionality of large quantities of similar objects at once, in case code needs refacroting.

The most widely used solution today to the issues of extensibility and reusability between objects is the classical model, wherein the creation of new objects is handled through entities called classes, which are basically object template. These classes, which usually aren’t objects in their own right, essentially work by defining a list of behaviour and data that an object in that particular language might contain. The language will then provide a way for the programmer to create (the technical term is instantiate) an object from that template, which contains all the information and functionality specified by the template. Furthermore, classes are generally able to be defined in terms of other classes, meaning that the programmer can easily manage the creation of objects with overlapping functionality or information. This allows the programmer to quickly (ideally at least) create vast swarms of identical or related objects for whatever nefarious purposes they please.

## javascript
Javascript is an object-oriented programming language, however almost uniquely it does not adhere to the classical model. In Javascript, classes to not exist as separate entities in their own right. Instead, objects can only inherit functionality and data directly from other objects.

However, Javascript, politely enough, does provide programmers with a means of creating objects in a way that simulates classical object reaction. This is known as the Pseudoclassical Object Instantiation Pattern, and while relatively straightforward, it does involve some complicated moving parts.

## Javascript Pseudoclassical Syntax
### new
The `new` operator lies at the heart of the Psueoclassical pattern. Presented before a constructor function (see below) this operator will enact the following steps:
1.	A new, empty object is created
2.	The constructor function is called with its execution context (which broadly just defines the meaning of `this` within that function) set to that new object
3.	In the absence of any explicit return value for the constructor function, the same object is then returned.

```javascript
function Man() { // example constructor function
  this.height = 4;
  this.complain = function() {
    console.log('What is the deal with all these taxes?');
  }
}

var bob = new Man();
// a modified object is now bound to the variable bob

console.log(bob.height); // logs 4
bob.complain(); // logs 'What is the deal with all these taxes?'
```

### Constructor Functions
Any function could theoretically act as a constructor function, but *useful* constructor functions are functions that:
1.	Specify a useful name for the class or type of objects that they are going to generate.
2.	Expect their execution context to be set to an empty object, and subsequently make alterations to it.
3.	Additionally most constructor functions generally avoid having an explicit return value
With all this in mind, the following is not very useful as a constructor function:

```javascript
function Man1() {

}

var phil = new Man1();

console.log(phil);

function Man2() {
  this.height = 4;
  this.complain = function() {
    console.log('What is the deal with all these taxes?');
  }

  return {};
}

var fred = Man2();

console.log(fred);

function Man() {
  this.height = 4;
  this.complain = function() {
    console.log('What is the deal with all these taxes?');
  }
}

var bob = new Man();

console.log(bob);
```

The first makes no alterations to any objects passed into it through the `new` operator, while the second returns a completely new empty object, so it’s prior alterations to its execution context on line are effectively lost. Only `Man` is a useful constructor function.

### Inheritance
Once again, in actuality, there are no classes in Javascript, programmers using the Psuedoclassical pattern are merely creating lots of new, empty, *classless* objects, and adding properties to them uniformly, according to the specifications of a certain predefined constructor function. Objects created through the same constructor can be thought of as being of the same *type* but there are no actual classes involved in the traditional sense.
What about inheritance then? What if, say, we wanted to create a lot of objects with the functionality specified in the `Man` constructor below.

```javascript
function Man() {
  this.height = 4;
  this.complain = function() {
    console.log('What is the deal with all these taxes?');
  }
}

var bob = new Man();
var zhang = new Man();
var omar = new Man();
```

As we can see, all is well, we can create as many as we like, but what if we also wanted to reuse that functionality in a slew of new `German` objects, but which also had an additional `bePunctual` behaviour? Perhaps we could simply add that behaviour to the original `Man` constructor:

```javascript
function Man() {
  this.height = 4;
  this.complain = function() {
    console.log('What is the deal with all these taxes?');
  }
  this.bePunctual = function() {
    console.log('*arrives on time*');
  }
}

var bob = new Man();
var zhang = new Man();
var omar = new Man();

var hermann = new Man();
var otto = new Man();

hermann.bePunctual(); // logs *arrives on time*
otto.bePunctual(); // logs *arrives on time*
bob.bePunctual(); // Also logs *arrives on time*
```

This works, but as we can see, it also gives all out `Man` objects exactly the same `bePunctual` behaviour, which is not what we want. Instead we need a way drawing on the behaviour and information defined in `Man` when creating new objects with additional properties, without also altering the objects it creates. enter prototyping.

### prototyping
In Javascript, every object is linked to another object known as the *prototype* of the first object. An object’s prototype can be found with the `Object.getPrototypeOf()` method, and by default the prototype of all objects is the special `Object.prototype` object.

```Javascript
var obj = {}
console.log(Object.getPrototypeOf(obj)); // logs the Object.prototype object
```

An object can draw functionality and data from its prototype because of Javascript’s *prototype chain* a rule which basically says that if a property is referenced on an object and can’t be found on that object, the object’s prototype will then be searched for the same property, and then *it’s* prototype, and so on until we inevitably his the `Object.prototype` object, and if the property *still* can’t be found, *then* and only then do we give up and return undefined (or throw an error if the property was referenced through a method call). Otherwise, if the property is found at any stage, Javascript acts like it existed on the original object all along and proceeds. In this way we can assign properties to an object’s prototype, and access them through the object itself.

```Javascript
var obj = {}
console.log(Object.getPrototypeOf(obj));

proto = { // new object
  name: 'john'
}

Object.setPrototypeOf(obj, proto);
console.log(obj.name); // obj still has no name property, but because of lookup 'john' gets logged
console.log(obj.height); // undefined is logged because no height property is found anywhere on the lookup tree
```

Now, whenever an object is created using the `new` and a constrictor function, it’s prototype is set to a special prototype object, which can itself be accessed through the constructor function itself using the `prototype` property.

```Javascript
function Man() {
  this.height = 4;
  this.complain = function() {
    console.log('What is the deal with all these taxes?');
  }
}

console.log(Man.prototype); // logs an almost empty prototype object
console.log(Object.getPrototypeOf(bob) === Man.prototype); // logs true
```

This is convenient, since all objects created using out `Man` constructor actually end up having their prototype assigned to the *exact same* object (the `Man.prototype` object), meaning that we can define the `complain` method on Man's prototype object, and eben though it now only gets defined in once place (rather than once for each Man object), all the Man objects can still access it.

```Javascript
function Man() {
  this.height = 4;
}

Man.prototype.complain = function() {
  console.log('What is the deal with all these taxes?');
}
console.log(Man.prototype);

var bob = new Man();
var zhang = new Man();
var omar = new Man();

console.log(bob.complain()); // logs 'What is the deal with all these taxes?'
console.log(zhang.complain()); // logs 'What is the deal with all these taxes?'
console.log(omar.complain()); // logs 'What is the deal with all these taxes?'
```

This still doesn’t solve our inheritance issue though. There is still one more piece to this puzzle.

### Object.create()
The `Object.craete()` method returns a new, empty object that inherits from a passed in object. For instance, in the following code `magnus` gets assigned to an empty object that inherits from the `Man.prototype` object, but is not given all the properties of regular man objects:

```Javascript
function Man() {
  this.height = 4;
}

Man.prototype.complain = function() {
  console.log('What is the deal with all these taxes?');
}

var magnus = Object.create(Man.prototype)
console.log(Object.getPrototypeOf(magnus) === Man.prototype); // logs true
magnus.complain(); // logs 'What is the deal with all these taxes?'
console.log(magnus.height); /// logs undefined
```

Using this, we can set the `.prototype` object of one constructor to inherit from the `.prototype` of another constructor. All objects created using the second constructor will now have all the qualities of the first constrictor’s `.prototype`, and additional data or functionality can be added to them without effecting objects created using the original constructor:

```Javascript
function Man() {

}

Man.prototype.complain = function() {
  console.log('What is the deal with all these taxes?');
}

Man.prototype.height = 4;

function German() {
  this.bePunctual = function() {
    console.log('*arrives on time*');
  }
}

German.prototype = Object.create(Man.prototype);

var bob = new Man();
var otto = new German();

bob.complain();// logs 'What is the deal with all these taxes?'
otto.complain(); // logs 'What is the deal with all these taxes?'

otto.bePunctual(); // logs *arrives on time*
bob.bePunctual(); // throws an error
```

In this way Javascript’s Psuedoclassical pattern is able to simulate the very important functionality of classical inheritance without actually containing classes or diverging from its inherently object-based inheritance.
