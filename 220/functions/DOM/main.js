/*
input:
  - array
  - onloy numbes in
  - ONLY ONE SOLOUTION
  - non-empty
  - has enough values

output:
  - array of indicies, the indicies of the numbers that add up to the target
  - both numbers

datatypes:
  - array

alg:
  - for each element
    - check each OTHER element to see if it and the other one add up to the target
      - if so, return both their indicies
      - otherwise move on.

*/

function twoSum(nums, target) {
  var ends = []
  nums = nums.filter(element => element + );
  nums.forEach(function(firstElement, firstIndex) {
    nums.forEach(function(secondElement, secondIndex) {
      if (firstElement + secondElement === target && firstIndex !== secondIndex) {
        ends[0] = firstIndex;
        ends[1] = secondIndex;
      }


    });

  });

  return ends;
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([2, 7], 9)); // [0, 1]
console.log(twoSum([1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 7], 9)); // [5, 11]
console.log(twoSum([5, 5, 5], 10)); // [1, 0]
console.log(twoSum([5, 5, 0, 0], 0)); // [2, 3]
