function greet(a, b) {
  console.log(a.toUpperCase() + ', ' + b);
}

//greet('hi', 'fg');

function partial(func, arg) {
  return function(nextArg) {
    return func(arg, nextArg);
  };
}


var x = partial(greet, 'fuck you');
var y = partial(greet, 'die');

//x("bob");
//y('bob');


function subtract(a, b) {
  return a - b;
}

function makeSubN(a) {
  return function(b) {
    return subtract(b, a);
  }
}

var sub5 = makeSubN(5);
//console.log(sub5(10)); // 5


function makePartialFunc(func, b) {
  return function(a) {
    return func(a, b);
  }
}

function multiply(a, b) {
  return a * b;
}

var multiplyBy5 = makePartialFunc(function(a, b) {
  return a * b;
}, 5);

//console.log(multiplyBy5(100)); // 500

var subjects = {
  "English": ["Bob", "Tyrone", "Lizzy"],
  "Math": ["Fatima", "Gary", "Susan"],
  "Biology": ["Jack", "Sarah", "Tanya"]
};

function rollCall(subject, students) {
  console.log(subject + ':');
  students.forEach(function(student) {
    console.log(student);
  });
}

function makeMathRollCall() {
  var subject = 'Math';
  return function(students) {
    return rollCall(subject, students);
  }
}

var mathRollCall = makeMathRollCall();
//mathRollCall(subjects["Math"]);
// Math:
// Fatima
// Gary
// Susan

(function() {
  console.log("Sometimes, syntax isn't intuitive!")
}());

(function lpoop(num) {
  if (num === 0) {
    console.log(num);
    return num;
  } else {
    console.log(num);
    return lpoop(num - 1);
  }
})(7);
