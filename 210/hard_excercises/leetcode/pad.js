 // -----------------------------------------------------------------

/*

input:
  - 2 arrays
    - full od only number primitives
    - sorted
  - output
    - single number
    - rounded 1 place

  datatypes
    - sum as an int


  alg:
    - record the total length of the combined arrays
      - half of this (rounded up) will be the median
    - set a  count to 0
    - compare the last element of each array
      - the higher of these two element is popped
      - and we increment the count
      - when the count is 1 less than the half, return the higher of the two elements instead
      - or, if the number was even to begin with, return the average of both;



*/

function median(arr1, arr2) {
  var midpoint = (arr1.length + arr2.length) / 2;
  var odd = (Math.round(midpoint) === midpoint ? false : true);
  var count = 1;
  while (true) {
    if (!odd && count >= midpoint) {
      return ((arr1[arr1.length - 1] + arr2[arr2.length - 1]) / 2 || 0);
    }

    if (odd && count > midpoint) {
      return ((arr1[arr1.length - 1] || 0) >= (arr2[arr2.length - 1] || 0) ? arr1.pop() : arr2.pop() || 0);
    }
    (arr1[arr1.length - 1] || 0) >= (arr2[arr2.length - 1] || 0) ? arr1.pop() : arr2.pop();
    count++;
  }

}
console.log(Math.max(1, undefined));

console.log(median([3, 4], [2])); // 3
console.log(median([3, 4], [1, 2])); // 2.5
console.log(median([], [2, 3])); // 2
console.log(median([2, 3], [])); // 2
console.log(median([], [])); // 0
console.log(median([], [1])); // 1
console.log(median([3, 6, 7, 9, 77], [1, 2, 8, 88, 100])); // ?
