function makeCounterLogger(n) {
  function add(num) {
    return num + 1;
  }

  function sub(num) {
    return num - 1;
  }

  return function(newNum) {
    var num = n;
    var stepper = num <= newNum ? add : sub;
    while (newNum !== num) {
      console.log(num);
      num = stepper(num);
    }
    console.log(num);
  }
}

function makeList() {
  var lst = [];
  function defaultAction() {
    if (lst.length === 0) {
      console.log('nothin\' teh see here');
    } else {
      lst.forEach(element => console.log(element))
      console.log('logged');
    }
  }

  return function(element) {
    if (element === undefined) {
      return defaultAction();
    } else if (lst.includes(element)) {
      var index = lst.indexOf(element);
      lst.splice(index, 1)
    } else {
      lst.push(element);
    }
  }
}

function makeLister(num) {
  return function() {
    console.log(...Array.from(Array(100).keys()).filter(i => i % num === 0).slice(1));
  }
}

var lister = makeLister(13);


var n = 0;
function add(num) {
  n += num;
  console.log(n);
}

function sub(num) {
  n -= num;
  console.log(n);
}

function later(func, arg) {
  return function() {
    return func(arg);
  }
}

var logWarning = later(console.log, 'The system is shutting down!');
//logWarning();

function startup() {
  var status = 'ready';
  return function() {
    console.log('The system is ready.');
  }
}

var ready = startup();
var systemStatus = ready.status;
//console.log(systemStatus);


function makeList() {
  return {
    add: function(thing) {
      items.push(thing);
    },
    remove: function(thing) {
      var index = items.indexOf(thing);
      items.splice(index, 1);
    },
    list: function() {
      items.forEach(item => console.log(item));
    }
  }

  var items = [];
}


var list = makeList();
list.add("peas");
list.list();
list.add("corn");
list.list();
list.remove("peas");
list.list();
console.log(list['items']);
