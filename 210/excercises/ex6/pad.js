// ----------------------- 1 ---------------

//console.log((false && undefined)); // false
//console.log((false || undefined)); // undefined
//console.log(((false && undefined) || (false || undefined))); //undefined
//console.log(((false || undefined) || (false && undefined))); //undefined
//console.log(((false && undefined) && (false || undefined))); //false
//console.log(((false || undefined) && (false && undefined))); //false
//console.log((undefined && false)); //false
//console.log(('a' || (false && undefined) || '')); //a
//console.log(((false && undefined) || 'a' || '')); //a
//console.log(('a' && (false || undefined) && '')); //false
//console.log(((false || undefined) && 'a' && '')); //false
//console.log('' && 'pear');
// ----------------------- 2 ---------------

// ----------------------- 3 ---------------

// ----------------------- 4 ---------------
function getSelectedColumns(numbers, cols) {
  var result = [];
  for (var i = 0; i < numbers.length; i++) {
    for (var j = 0; j < cols.length; j++) {
      if (!result[j]) {
        result[j] = [];
      }

      result[j][i] = numbers[i][cols[j]];
    }
  }

  return result;
}

// Given array of number arrays
var array1 = [[1, 2, 3], [4, 5 ,6], [7, 8 ,9]];
var array2 = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];

// array1 in row/column format
// [[1, 2, 3],
//  [4, 5, 6],
//  [7, 8, 9]]

//console.log(getSelectedColumns(array1, [0]));     // [[1]]; expected [[1, 4, 7]]
//console.log(getSelectedColumns(array1, [0, 2]));  // [[1, 4], [3, 6]]; expected [[1, 4, 7], [3, 6, 9]]
//console.log(getSelectedColumns(array2, [1, 2]));  // [[2, 2], [3, 4]]; expected [[2, 2, 2], [3, 3, 3]]
// ----------------------- 5 ---------------
//console.log(undefined * undefined);

// 'the total values is 15'
//'the total value is NaN'
// 'the total values is 15'

// ----------------------- 6 ---------------

// ----------------------- 7 ---------------
function invoiceTotal(...args) {
  return args.reduce((sum, num) => sum + num, 0);
}
console.log(invoiceTotal());
console.log(invoiceTotal(20, 30, 40, 50));             // works
console.log(invoiceTotal(20, 30, 40, 50, 40, 40));     // doesn't work; how can you make it work?
// ----------------------- 9 ---------------

// ----------------------- 10 ---------------
