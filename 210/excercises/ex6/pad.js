// ----------------------- 1 ---------------

// ----------------------- 2 ---------------

// ----------------------- 3 ---------------

// ----------------------- 4 ---------------
function makeDoubler(name) {
  return function(int) {
    console.log('This function was called by ' + name + '.');
    return int + int;
  }
}

var doubler = makeDoubler('Victor');
//console.log(doubler(5));
// ----------------------- 5 ---------------
//3, 4, 3, 5
// -2 and 3.4 are both keys in the array obejct, but the .length property only cares about whole intiger keys.
// ----------------------- 6 ---------------
//all of them, 3, all of them + undefined, 4, ['javascript'], 1, ['js', undefined, undefined], 3 ['js', undefined, 'python'], undfeind, 2
// ----------------------- 7 ---------------
// welcome to the matrix!
// ----------------------- 9 ---------------
console.log(doubler(5));
// ----------------------- 10 ---------------
