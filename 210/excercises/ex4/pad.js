// ----------------------- 1 ---------------


// ----------------------- 2 ---------------

// ----------------------- 3 ---------------



// ----------------------- 4 ---------------


// ----------------------- 5 ---------------


// ----------------------- 6 ---------------

var myArray = [5, 5];
myArray[-1] = 5;
myArray[-2] = 5;
function average(array) {
  var keys = Object.keys(array);
  var sum = 0;
  keys.forEach(function(key) {
    sum += array[key];
  });

  return sum / keys.length;
}

//console.log(average(myArray));

// ----------------------- 7 ---------------
function calculateBonus() {
  return arguments[1] ? arguments[0] / 2 : 0;
}

//console.log(calculateBonus(2800, true));      // 1400
//console.log(calculateBonus(1000, false));     // 0
//console.log(calculateBonus(50000, true));     // 25000

// ----------------------- 8 ---------------
//console.log(penultimate('last word'));               // 'last'
//console.log(penultimate('Launch School is great!')); // 'is'

function penultimate(string) {
  return string.split(' ').slice(-2, -1);
}

// ----------------------- 9 ---------------

var MINUTES_PER_HOUR = 60;
var HOURS_PER_DAY = 24;
var MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

function timeOfDay(deltaMinutes) {
  return String(new Date(2017, 1, 1, 0, deltaMinutes)).substr(16, 5);
}

//console.log(timeOfDay(0));       // "00:00"
//console.log(timeOfDay(-3));      // "23:57"
//console.log(timeOfDay(35));      // "00:35"
//console.log(timeOfDay(-1437));   // "00:03"
//console.log(timeOfDay(3000));    // "02:00"
//console.log(timeOfDay(800));     // "13:20"
//console.log(timeOfDay(-4231));   // "01:29"

// ----------------------- 10 ---------------

function afterMidnight(str) {
  return Number(str.slice(3)) + Number(str.slice(0, 2)) * 60;
}

function beforeMidnight(str) {
  return 1440 - ((Number(str.slice(3)) + Number(str.slice(0, 2)) * 60) || 1440);
}
console.log(afterMidnight('00:00'));        // 0
console.log(beforeMidnight('00:00'));       // 0
console.log(afterMidnight('12:34'));        // 754
console.log(beforeMidnight('12:34'));       // 686
