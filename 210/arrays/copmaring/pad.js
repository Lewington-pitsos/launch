function arraysEqual (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function firstElement(array) {
  return array[0];
}


function lastElementOf(array) {
  return array[array.length - 1];
}


function nthElementOf(array, index) {
  if (index < 0) {
    index = array.length + index;
  }

  return array[index];
}

var digits = [4, 8, 15, 16, 23, 42];

function firstNOf(arr, count) {
  arr.length = count;
  return arr;
}

function lastNOf(array, count) {
  if (count > array.length) {
    count = array.length;
  }
  return array.slice(array.length - count);
}

function endsOf(arr1, arr2) {
  return [arr1[0], arr2[arr2.length - 1]]
}
console.log(endsOf([4, 8, 15], [16, 23, 42]));
