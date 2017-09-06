// ----------------------- 1 ---------------


// ----------------------- 2 ---------------
var myArray = [1, 2, 3, 4];
var myOtherArray = myArray.slice();

myArray.pop();
//console.log(myOtherArray);

var narray = [];
for (var i = 0; i < myArray.length; i++) {
  narray.push(myArray[i])
}

myArray.pop();
//console.log(narray);
// ----------------------- 3 ---------------

function concat(array, arg) {
  var narray = [];
  for (var i = 0; i < array.length; i++) {
    narray[i] = array[i];
  }

  if (Array.isArray(arg)) {
    for (var i = 0; i < arg.length; i++) {
      narray[narray.length] = arg[i];
    }
  } else {
    narray[narray.length] = arg;
  }

  return narray;
}

//console.log(concat([1, 2, 3], [4, 5, 6]));            // [1, 2, 3, 4, 5, 6]
//console.log(concat([1, 2], 3));                       // [1, 2, 3]
//console.log(concat([2, 3], ['two', 'three']));        // [2, 3, "two", "three"]
//console.log(concat([2, 3], 'four'));                  // [2, 3, "four"]


var obj = { a: 2, b: 3 };
var newArray = concat([2, 3], obj);      // [2, 3, { a: 2, b: 3 }]
obj.a = 'two';
//console.log(newArray);                                // [2, 3, { a: 'two', b: 3 }]

var arr1 = [1, 2, 3];
var arr2 = [4, 5, obj];
var arr3 = concat(arr1, arr2);
//console.log(arr3);                                    // [1, 2, 3, 4, 5, { a: 'two', b: 3 }]
obj.b = 'three';
//console.log(arr3);                                    // [1, 2, 3, 4, 5, { a: 'two', b: 'three' }]

//console.log(arr3[5].b = 3);                           // or arr3[5]['b'] = 3
//console.log(obj);                                     // { a: 'two', b: 3 }

// ----------------------- 4 ---------------

function concat2() {
  var narray = [];
  for (var i = 0; i < arguments.length; i++) {
    narray = concat(narray, arguments[i]);
  }

  return narray;
}

//console.log(concat2([1, 2 ,3], [4, 5, 6], [7, 8, 9]));           // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
//console.log(concat2([1, 2], "a", ["one", "two"]));               // [ 1, 2, "a", "one", "two" ]
//console.log(concat2([1, 2], ["three"], 4));                      // [ 1, 2, "three", 4 ]

// ----------------------- 5 ---------------

function pop(array) {
  return [array[array.length - 1], array.length = Math.max(0, array.length - 1) ][0];
}

var array = [1, 2, 3];
//console.log(pop(array));                   // 3
//console.log(console.log(array));           // [1, 2]
//console.log(pop([]));                      // undefined
//console.log(pop([1, 2, ['a', 'b', 'c']])); // [ 'a', 'b', 'c' ]

function push(array) {
  return [array.length, array.push(...Object.values(arguments).slice(1))][0];
}

var array = [1, 2, 3];
//console.log(push(array, 4, 5, 6));         // 6
//console.log(array);           // [1, 2, 3, 4, 5, 6]
//console.log(push([1, 2], ['a', 'b']));     // 3
//console.log(push([], 1));                  // 1
//console.log(push([]));                     // 0

// ----------------------- 6 ---------------

function reverse(input) {
  if (input.length <= 1) {
    return input;
  } else if (Array.isArray(input)) {
    return concat(reverse(input.slice(1)), input.slice(0, 1));
  } else {
    return reverse(input.slice(1)) + input.slice(0, 1);
  }
}

//console.log(reverse('Hello'));          // olleH
//console.log(reverse('a'));              // a
//console.log(reverse([1, 2, 3, 4]));     // [4, 3, 2, 1]
//console.log(reverse([]));               // []
// ----------------------- 7 ---------------

function shift(array) {
  return [array[0], array.splice(0, 1)][0];
}

//console.log(shift([1, 2, 3]));                // 1
//console.log(shift([]));                       // undefined
//console.log(shift([[1, 2, 3], 4 ,5]));        // [1, 2, 3]

function unshift(array, args) {
  array.splice(0, 0, ...Object.values(arguments).slice(1));
  return array.length;
}

//console.log(unshift([1, 2, 3], 5, 6));        // 5
//console.log(unshift([1, 2, 3]));              // 3
//console.log(unshift([4, 5], [1, 2 ,3]));      // 3


var testArray = [1, 2, 3];
//console.log(shift(testArray));                // 1
//console.log(testArray);                       // [2, 3]
//console.log(unshift(testArray, 5));           // 3
//console.log(testArray);                       // [5, 2, 3]
// ----------------------- 8 ---------------

function slice(array, start, end) {
  var narray = []
  for (start; start < end && start < array.length; start++) {
    narray.push(array[start])
  }

  return narray;
}


//console.log(slice([1, 2, 3], 1, 2))//;           // [2]
//console.log(slice([1, 2, 3], 2, 0))//;           // []
//console.log(slice([1, 2, 3], 5, 1))//;           // []

var arr = [1, 2, 3];
//console.log(slice(arr, 1, 3))//;                 // [2, 3]
//console.log(arr)//;                              // [1, 2, 3]

function splice(array, start, count, ...values) {
  var narray = [];
  var count = Math.min(array.length - start, count);
  var difference = count - 0;
  var extra = shuffleUp(array, values.length, start);
  for (start; start < array.length; start++) {
    if (values.length > 0) {
      array[start] = values.shift();
    } else  {
      if (count > 0) {
        narray.push(array[start]);
        count -= 1;
      }
      array[start] = array[start + difference];
    }
  }
  array.length -= difference;
  return narray;
}

function shuffleUp(array, number, start) {
  var end = (array.length - 1) + number;
  for (end; end >= start; end--) {
    array[end] = array[end - number];
  }
  return number;
}


function splice(arr, start, deleteCount, ...items) {
  start = Math.min(start, arr.length);
  deleteCount = Math.min(deleteCount, arr.length - start);

  for (var i = start, removed = []; i < arr.length; i++) {
    i < start + deleteCount ? removed.push(arr[i]) : items.push(arr[i]);
  }

  arr.length = start;
  items.forEach(item => arr.push(item));
  return removed;
}

//console.log(splice([1, 2, 3], 1, 2));                   // [2, 3]
//console.log(splice([1, 2, 3], 1, 3));                   // [2, 3]
//console.log(splice([1, 2, 3], 1, 0));                   // []
//console.log(splice([1, 2, 3], 0, 1));                   // [1]
//console.log(splice([1, 2, 3], 1, 0, 'a'));               // []

var arr = [1, 2, 3];
//console.log(splice(arr, 1, 1, 'two'));                  // [2]
//console.log(arr);                                       // [1, 'two', 3];

var arr = [1, 2, 3];
//console.log(splice(arr, 1, 2, 'two', 'three'));          // [2 ,3]
//console.log(arr);                                       // [1, "two", "three"]

var arr = [1, 2, 3];
//console.log(splice(arr, 1, 0));                         // []
//console.log(splice(arr, 1, 0, 'a'));                    // []
//console.log(arr);                                       // [1, 'a', 2, 3]

var arr = [1, 2, 3];
//console.log(splice(arr, 0, 0, 'a'));                    // []
//console.log(arr);                                       // ['a', 1, 2, 3]

// ----------------------- 9 ---------------



// ----------------------- 10 ---------------


function areArraysEqual(arr1, arr2) {
  var sortedArr1 = arr1.sort();
  var sortedArr2 = arr2.sort();
  for (var i = 0; i < arr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }
  return arr1.length === arr2.length;
}

console.log(areArraysEqual([1, 2, 3], [1, 2, 3]));                  // true
console.log(areArraysEqual([1, 2, 3], [3, 2, 1]));                  // true
console.log(areArraysEqual(['a', 'b', 'c'], ['b', 'c', 'a']));      // true
console.log(areArraysEqual(['1', 2, 3], [1, 2, 3]));                // false
console.log(areArraysEqual([1, 1, 2, 3], [3, 1, 2, 1]));            // true
console.log(areArraysEqual([1, 2, 3, 4], [1, 1, 2, 3]));            // false
console.log(areArraysEqual([1, 1, 2, 2], [4, 2, 3, 1]));            // false
