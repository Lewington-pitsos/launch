function oddElementsOf(array) {
  var result = [];
  for (var i = 1; i < array.length; i += 2) {
    result.push(array[i])
  }

  return result;
}
var digits = [4, 8, 15, 16, 23, 42];



function combinedArray(arr1, arr2) {
  var result = [];
  for (var i = 0; i < arr1.length; i++) {
      result.push(arr1[i]);
      result.push(arr2[i]);
  }

  return result;
}

var digits = [4, 8, 15, 16, 23, 42];
var letters = ['A', 'L', 'V', 'A', 'R', 'H'];


function addReversed(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    array.push(array[i]);
  }
  return array;
}

function sortDescending(array) {
  result = array.slice();
  result.sort(function(a, b) {
    return b - a;
  });
  return result;
}


function matrixSumsFancy(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      total += matrixSumsFancy(array[i]);
    } else {
      total += array[i];
    }
  }

  return total;
}

function matrixSums(array) {
  var result=[]
  for (var i = 0; i < array.length; i++) {
    result.push(matrixSumsFancy(array[i]));
  }

  return result;
}

function uniqueElements(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (!result.includes(array[i])) {
      result.push(array[i])
    }
  }

  return result;
}




function missing(array) {
  var result = [];
  var start = array[0] + 1;
  var end = array[array.length - 1];
  for (; start < end; start++) {
    if (!array.includes(start)) {
      result.push(start);
    }
  }

  return result;
}

console.log(missing([-3, -2, 1, 5]));                  // [-1, 0, 2, 3, 4]
console.log(missing([1, 2, 3, 4]));                    // []
console.log(missing([1, 5]));                          // [2, 3, 4]
console.log(missing([6]));                             // []
