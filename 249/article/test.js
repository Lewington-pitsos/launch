
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

func3(); // logs 2
