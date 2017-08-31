function logOdds(num) {
  var allOdds = '';
  for (var start = 1; start <= num; start += 2) {
    if (start % 2 === 0) continue;
    allOdds += (start + '\n');
  }

  console.log(allOdds);
}

function mults(start, end) {
  var step = 3;
  for (; start <= end; start++ ) {
    if (start % 3 === 0 && start % 5 === 0) {
      console.log(start + '!');
    } else if (start % 3 === 0) {
      console.log(start);
    } else if (start % 5 === 0) {
      console.log(start);
    }
  }
}



function logMults(num) {
  for (var start = 100, end = 0; start >= end; start--) {
    if (start % 2 === 1 && start % num === 0) {
      var first = start;
      break;
    }
  }
  while (first > 0) {
    if (first % 2 === 1) {
      console.log(first);
    }
    first -= num;
  }
}


function fizzbuzz(start, end) {
  var step = 3;
  for (; start <= end; start++ ) {
    if (start % 3 === 0 && start % 5 === 0) {
      console.log('FizzBuzz');
    } else if (start % 3 === 0) {
      console.log('Fizz');
    } else if (start % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(start);
    }
  }
}

function isPrime(num) {
  var half = Math.floor(num / 2);
  if (num === 2) return true
  if (num % 2 === 0) return false

  for (var start = 3; start <= half; start += 2) {
    if (num % start === 0) {
      return false;
    }
  }
  return true;
}

function isXor(a, b) {
  return !!((!!(a) || !!(b)) && !(!!(a) && !!(b)))
}

function password() {
  var password = 'password';

  for (var guesses = 0; guesses < 4; guesses++) {
    var guess = prompt('enter password pls');

    if (guess === password) {
      console.log('Very good sir');
      return
    }
  }
  console.log('Guards! Arrest that imposter!')
}

function grade(num) {
  var verdict = 'Based on the average of your 3 scores your letter grade is '
  var message = 'Please enter your score: '
  var total = 0
  for (var times = 1; times <= num; times++) {
    var score = prompt(message + String(times));
    total += Number(score)
  }

  total /= num;
  switch (true) {
    case (total >= 90):
      console.log(verdict + '"A"');
      break;
    case (total >= 70):
      console.log(verdict + '"B"');
      break;
    case (total >= 50):
      console.log(verdict + '"C"');
      break;
    default:
      console.log(verdict + '"F"');
      break;
  }
}

function gcd(a, b) {
  var higher = a >= b ? a : b;

  for(;higher > 1; higher--) {
    if ((a % higher === 0) && (b % higher === 0)) {
      return higher;
    }
  }

  return 1;
}

function metaGcd(arr) {
  while (arr.length > 1) {
    var a = arr.shift();
    var b = arr[0];
    var c = gcd(a, b);
    arr[0] = c
  }

  console.log(arr[0])
}

function goldbach(num) {
  var upperBound = num;

  if (!(num % 2 == 0) || num < 4) {
    console.log(null);
    return null;
  }

  for (var start = 2; start <= num/2; start++) {
    if (isPrime(start)) {
      for (var highStart = upperBound; highStart >= num/2; highStart--) {
        if (isPrime(highStart) && ((start + highStart) === num))  {
          upperBound = highStart;
          console.log(start, highStart)
        }
      }
    }
  }
}

function pattern(num) {
  var start = 1;
  var symbol = "********";
  var string = ''

  for(;num > 0; num --) {
    string += start++;
    console.log(string + symbol.slice(0, num));
  }

}

function indexOf(string, match) {
  var end = (match.length );

  for (var start = 0; end <= string.length; start++) {
    if (string.slice(start, end) === match) return start
    end++;
  }
  return -1;
}

function lastIndexOf(string, match) {
  var current = -1;
  var start = 0;
  while (start <= string.length) {
    start = indexOf(string, match);
    if (start === -1) {
      return (current > -1 ? current + 2 : current);
    }

    current += start;
    string = string.slice(start + 1);
    start = 0;
  }
}

function reverseTrim(string) {
  var newString = '';
  var stripped = false;
  for (var i = string.length - 1; i > -1; i--) {
    if (string[i] !== ' ') stripped = true;
    if (stripped) {
      newString += string[i];
    }
  }
  return newString;
}

function trim(string) {
  var newString = '';
  var stripped = false;
  for (var i = 0; i < string.length; i++) {
    if (string[i] !== ' ') stripped = true;
    if (stripped) {
      newString += string[i];
    }
  }
  return reverseTrim(reverseTrim(newString));
}

function splitString(string, delim) {
  if (delim === '') {
    for (var i = 0; i < string.length; i++) console.log(string[i])
    return;
  }

  if (!delim) {
    console.log('ERROR');
    return;
  }

  var mini = '';

  for (var i = 0; i < string.length; i++) {
    if (string[i] === delim){
      console.log(mini);
      mini = '';
    } else {
      mini += string[i];
    }
  }
  console.log(mini);
}

function repeat(string, times) {
  switch (true) {
    case (times < 0 || isNaN(times)):
      return undefined;
    case 0:
      return "";
  }

  var result = '';

  for (var i = 0; i < times; i++) {
    result += string;
  }

  return result;
}

function startsWith(string, search) {
  for (var i = 0; i < search.length; i++) {
    if (string[i] !== search[i]) {
      return false;
    }
  }
  return true;
}

function lower(string) {
  result = ''
  for (var i = 0; i < string.length; i++) {
    if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(string[i]) > -1) {
      var code = string[i].charCodeAt(0);
      code += 32;
      result += String.fromCharCode(code);
    } else {
      result += string[i];
    }
  }
  return result;
}

function substr(string, start, length) {
  if (start < 0) start += string.length;
  var result = '';
  for (var i = 0; (i < length && i < string.length); i++) {
    if (i >= start) {
      result += string[i]
    } else {
      length += 1;
    }
  }

  return result;
}

var string = 'hello world';
console.log(substr(string, 2, 4))     // "llo "
console.log(substr(string, -3, 2))    // "rl"
console.log(substr(string, 8, 20))    // "rld"
console.log(substr(string, 0, -20))   // ""
console.log(substr(string, 0, 0))     // ""
