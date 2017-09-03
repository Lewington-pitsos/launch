function lastInArray(array) {
  return array[array.length - 1];
}

function rollCall(array) {
  for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

function revArray(arr) {
  var result = [];

  for (var i = (arr.length - 1); i >= 0; i--) {
   result[result.length] = arr[i];
  }

  return result;
}

function findVal(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}

function join(arr) {
  var str = '';
  for (var i = 0; i < arr.length; i++) {
    var char = String(arr[i]);
    str += char;
  }
  return str;
}

function push(arr, val) {
  arr[arr.length] = val;
  return arr.length;
}

function pop(array) {
  var result = array[array.length - 1];
  array.length = array.length - 1;
  return result;
}

function unshift(array, val) {
  for (var i = array.length - 1; i > 0; i--) {
    array[i + 1] = array[i];
  }

  array[0] = val;
  return array.length;
}

function shift(array) {
  var result = array[0];
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i + 1];
  }

  array.length = (array.length - 1)
  return result;
}

function indexOf(arr, val) {
  var result = -1;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      result = i;
      break;
    }
  }

  return result;
}

function lastIndexOf(arr, val) {
  var result = -1;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      result = i;
    }
  }
  return result;
}

function slice(array, start=0, end=array.length) {
  var result = [];
  for (; (start < array.length && start < end); start++) {
    push(result, array[start]);
  }

  return result;
}

function splice(array, start=0, end=array.length) {
  var result = [];
  for (var count = 0; (start < array.length && count < end); count++, start++) {
    push(result, array[start]);
  }

  return result;
}

function concat(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    push(arr1, arr2[i]);
  }

  return arr1;
}

function join(arr, str) {
  var result = '';
  for (var i = 0; i < arr.length; i++) {
    result += String(arr[i])

    if (i < arr.length - 1) {
      result += str;
    }
  }

  return result;
}
var count = [1, 2, 3, 1];
var lount = ['a', 'b', 'c']
console.log(join(count, "kkkk"));   // 4
console.log(count);            // [ 1, 2, 3, 4 ]
