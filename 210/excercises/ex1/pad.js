// ----------------------- 1 ---------------
var paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed \
ligula at risus vulputate faucibus. Aliquam venenatis nibh ut justo dignissim \
dignissim. Proin dictum purus mollis diam auctor sollicitudin. Ut in bibendum \
ligula. Suspendisse quam ante, dictum aliquam tristique id, porttitor pulvinar \
diam. Maecenas blandit aliquet ipsum. Integer vitae sapien sed nulla rutrum \
hendrerit ac a urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.';

//console.log(paragraph);
// ----------------------- 2 ---------------
//console.log(Boolean([]))

// ----------------------- 3 ---------------
var name = 'Bob';
var saveName = name;
name.toUpperCase();
//console.log(name, saveName);

// ----------------------- 4 ---------------
//var number1 = Number(prompt('Enter the first number:'));
//var number2 = Number(prompt('Enter the second number:'));

//console.log(number1 + ' + ' + number2 + ' = ' + (number1 + number2));
//console.log(number1 + ' - ' + number2 + ' = ' + (number1 - number2));
//console.log(number1 + ' * ' + number2 + ' = ' + (number1 * number2));
//console.log(number1 + ' / ' + number2 + ' = ' + Math.floor(number1 / number2));
//console.log(number1 + ' % ' + number2 + ' = ' + (number1 % number2));
//console.log(number1 + ' ** ' + number2 + ' = ' + Math.pow(number1, number2));

// ----------------------- 5 ---------------

function phrase() {
  var answer = prompt('Please write a phrase').replace(/[^a-zA-Z]/g, '');
  return ('there are ' + answer.length + ' chars in "' + answer + '"' );
}

//console.log(phrase());

// ----------------------- 6 ---------------

function stringToInteger(str) {

  var magnitude = 1;
  var total = 0;
  str = str.split('').reverse().join('');
  for (var i = 0; i < str.length; i++) {
    var number = (str[i].charCodeAt(0) - 48);
    total += number * magnitude;
    magnitude *= 10;
  }

  return total;
}

//console.log(stringToInteger('4321'));          // 4321
//console.log(stringToInteger('570'));           // 570
// ----------------------- 7 ---------------

function stringToSignedInteger(str) {
  var magnitude = 1;
  if (str[0] === '+' || str[0] === '-') {
    if (str[0] === '-') {
      magnitude = -1;
    }
    str = str.substr(1);
  }

  var total = 0;
  str = str.split('').reverse().join('');
  for (var i = 0; i < str.length; i++) {
    var number = (str[i].charCodeAt(0) - 48);
    total += number * magnitude;
    magnitude *= 10;
  }

  return total;
}

//console.log(stringToSignedInteger('4321'));      // 4321
//console.log(stringToSignedInteger('-570'));      // -570
//console.log(stringToSignedInteger('+100'));      // 100

// ----------------------- 8 ---------------

function integerToString(int) {
  var chars = [];
  for (var i = 10; i <= (int * 10); int /= 10) {
    chars.unshift(String.fromCharCode((int % i) + 48));
    int -= int % i;
  }

  return chars.join('');
}


//console.log(integerToString(4321));    // "4321"
//console.log(integerToString(0));       // "0"
//console.log(integerToString(5000));    // "5000"
// ----------------------- 9 ---------------

function signedIntegerToString(int) {
  if (int == 0) {
    return '0';
  }

  var answer = integerToString(Math.abs(int));
  if (int < 0) {
    return '-' + answer;
  } else {
    return '+' + answer;
  }
}

console.log(signedIntegerToString(4321));      // "+4321"
console.log(signedIntegerToString(-123));      // "-123"
console.log(signedIntegerToString(0));         // "0"

// ----------------------- 1 ---------------
