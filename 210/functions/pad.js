function average(arr) {
  total = sum(arr)

  return total / arr.length;
}

var answer = average([3, 4, 6, 8, 9, 10]);

console.log(answer)

function sum(arr) {
  var total = 0;
  for (var index = 0, length = arr.length; index < length; index++) {
    var current = arr[index];
    total += current
  }
  return total
}

var name = "henry";

function kill(name) {
  console.log(name + ' has died a grusome death');
}

kill("steve");

function killbob() {
  var name = "bob";
  kill(name);
}

killbob();

kill();

console.log(typeof kill);

var lol = kill;
console.log(typeof lol);

lol();
