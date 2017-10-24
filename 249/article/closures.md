# Javascript Closures
Scoping in javascript is relatively straightforward: in ordinary circumstances a scope every variable defined everywhere, except for variables defined inside functions which are themselves defined on the same level as the one currently being assessed (or within any functions that are themselves within such functions):

```javascript
var a = 1;

function func() {
  var b = 2;
  console.log(b); // 2
  console.log(a); // 1
  // a is still accessable inside this function because a is not inside a lower, scope
  function func2() {
    var c = 3;
    console.log(c); // 3
    console.log(b); // 2
    // b is accessable because again, its from a higher scope
    console.log(a); // 1
  }

  func2();
  console.log(c); // throws an error because c was defined in a more inner scope than the current one
}

var d = 4;
func();

console.log(a); // 1
console.log(d); // 4

console.log(b); // throws an error because b was defined in a more inner scope than the current one
```

A question remains though: what about function calls? Should their scope be worked out relative to where the function is *called* or should their scope be based on where the function in question was initially *defined*? Javascript has opted for the latter:

```Javascript
function func() {
  var a = 1;
  return function() {
    console.log(a);
  }
}

var func2 = func(); // func2 now stores the inner function

func2(); // logs 1, because func2's scope was created when func2 was defined with the scope it was defined in, i.e. within the scope of func

console.log(a); // throws an error because a is not accessbale to the global scope


function func3() {
  var a = 4;
  func2(); // still logs 1 because the scope a function is called in does not effect the scope that applies to it
}

func3();
```

What actually happens here is that whenever a function is defined or stored in a function expression, the scope of the function’s definition (and hence all the variables withinin that scope) is recorded and stored in what is known as a *closure*. Then, where or whenever that function is called, its scope is set to the function’s recorded closure and the scope of calling is ignored.

## Private Variables
This setup is particularly useful for creating private variables. As we have seen, all variables defined within a function are inaccessible to a global scope. However, they are accessible to anything whose scope includes that function. Therefore, if by defining an inner function within an outer function that contains some variables, that inner function will uniquely have access to those variables, and will be free to modify them without interference:

```javascript
function func() {
  var a = 1;
  return function() {
    a++;
    console.log(a);
  }
}

var func2 = func(); // func2 now stores the inner function

// ... lots of code ...

func2(); // logs 2,
func2(); // logs 3

console.log(a); // throws an error
```

Because of closure rules, this still holds if that inner function is stored and then executed at a later date in a completely different scope. Note also that in this particular situation `func()` returns a new function every time it is executed, and that function is bound to a new `a` variable that cannot be accessed by anything except that particular returned function.

```javascript
function func() {
  var a = 1;
  return function() {
    a++;
    console.log(a);
  }
}

var func2 = func(); // func2 now stores the inner function

// ... lots of code ...

func2(); // logs 2,
func2(); // logs 3
func2(); // logs 4

var func3 = func();

func3(); // logs 2 because func3 was defined in a scope containing a different a variable than the one accessible to func2

console.log(a); // throws an error
```
