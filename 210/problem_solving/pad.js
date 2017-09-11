function makeRow(spaces, stars) {
  var starSymbol = '*';
  var whitespace = '';
  for (var i = 0; i < spaces; i++) {
    whitespace += ' ';
  }

  var allStars = '';
  for (var q = 0; q < stars; q++) {
    allStars += starSymbol;
  }

  console.log(whitespace, allStars);
}


//makeRow(2, 1);
//makeRow(1, 3);
//makeRow(0, 5);

function diamond(num) {
  var spaces = Math.floor(num / 2);
  var stars = 1;

  while (spaces >= 0) {
    makeRow(spaces, stars);
    spaces--;
    stars += 2;
  }

  stars -= 4;
  spaces += 2;

  while (stars >= 1) {
    makeRow(spaces, stars);
    spaces++;
    stars -= 2;
  }
}

//diamond(3);

//diamond(5);

//diamond(10);

/*

only odd numbers
0 => *

*/


// --------------------------------------------------------------------------

/*
inputs:
  -string
    - space-seperated words
    - each word number or operation or instigating string
    - ends with number, with '?' appended
    - only ever 2 numnes 1 word
    - numbers can be negative
Outputs:
  - int
  - devided by rounds to nearest int.

examples:
  - empty input? no
  - 4 usual operations
*/

var operators = {
  plus: function(a, b) {
    return a + b;
  },

  minus: function(a, b) {
    return a - b;
  },

  'multiplied': function(a, b) {
    return a * b;
  },

  'divided': function(a, b) {
    return Math.round(a / b);
  }
}


function mathAnswer(string) {
  var useful = string
    .substring(8, string.length - 1)
    .replace('by ', '')
    .split(' ');

  var operator = useful[1];
  return operators[operator](Number(useful[0]), Number(useful[2]));
}

//console.log(mathAnswer('What is 1 plus 19?')); // 20
//console.log(mathAnswer('What is 1 plus -19?')); // -18
//console.log(mathAnswer('What is 4 multiplied by -10?')); // -40
//console.log(mathAnswer('What is 10 divided by 4?')); // 3
//console.log(mathAnswer('What is -10 divided by -4?')); // 3


// --------------------------------------------------------------------------

/*

input:
  - string
  - dots and ints
  - ints can br 0
output:
  - 1, 0 -1
  - 1 iff version 1 is larger

Test cases:
  - string without dots
  - just 0's and dots
  - dot at the end/dot at beginning

datatype:
  - array

alg:
  - first validate string with reegex
  - break up into 2 arrays iterate through same time
    - as soon as the numbers aren't === return -1 or 1 depending which
    - If one of the arrays is shorter, the longer one is creater SO LONG AS
      - ANY of it's longer values aren't 0;
*/

function validate(string) {
  return !!(string.match(/^([0-9]+\.)*[0-9]$/));
}

function compareVersions(a, b) {
  if (!(validate(a) && validate(b))) {
    return null;
  }

  a = a.split('.');
  b = b.split('.');

  var longestLength = a.length >= b.length ? a.length : b.length;

  for (var i = 0; i < longestLength; i++) {
    if ((Number(a[i]) > Number(b[i])) || (b[i] === undefined && Number(a[i]) !== 0)) {
      return 1;
    } else if ((Number(a[i]) < Number(b[i])) || (a[i] === undefined && Number(b[i]) !== 0)) {
      return -1;
    }

  }

  return 0;
}

//console.log(validate('1.2.3.4.5')); // true
//console.log(validate('1..3.4.5')); //false
//console.log(validate('1.2.3.4.5.')); //false
//console.log(validate('.1.2.3.4.5')); //false
//console.log(validate('1.2.3.4/5')); //false

//console.log(compareVersions('1.2.3', '1.3.3'));  // -1
//console.log(compareVersions('1.2..3', '1.3.3')); // null
//console.log(compareVersions('11.2.3', '1.3.3')); // 1
//console.log(compareVersions('1.2.3', '1.2.3')); // 0
//console.log(compareVersions('1.2.3.5', '1.2.3')); // 1
//console.log(compareVersions('4.2.3', '1.3.3')); // 1
//console.log(compareVersions('1.2.3', '1.111111.3')); // -1
//console.log(compareVersions('0.2.3', '1.3')); // -1
//console.log(compareVersions('1.3.3.0.0.0', '1.3.3')); // 0
//console.log(compareVersions('1', '1')); // 0
//console.log(compareVersions('1', '3')); // -1
//console.log(compareVersions('1', '-1')); // null
//console.log(compareVersions('1.3.3.0.0.7', '1.3.3')); // 1
//console.log(compareVersions('', ''));  // null

// --------------------------------------------------------------------------

/*
input:
  - string
  - could contain all sorts of nonsense as well as digits
output:
  - string
  - should contain only digits

datatyupes:
  - string input and output

alg:
  - replace everything that is not a digit with blankspace (regex)
  - find the length of what remains
  - work out if the length is correct
    - if it statrs with a 1 it's allowed to be 11 long
    - otherwise 10
  return 0, or the result.

*/


function clean(string) {
  var badstring = '0000000000';
  var numbersOnly = string.match(/[0-9]/g);
  if (numbersOnly === null) {
    return badstring;
  }
  numbersOnly = numbersOnly.join('');

  if (numbersOnly.length !== 10) {
    if (numbersOnly[0] === '1' && numbersOnly.length === 11) {
      return numbersOnly.slice(1);
    } else {
      return badstring;
    }
  }

  return numbersOnly;
}

//console.log(clean('1111-111-111'));
//console.log(clean('11///11-111------111'));
//console.log(clean('111///11-111------111'));
//console.log(clean('91111-111-111'));  // 0
//console.log(clean('11111111-111-111')); // 0
//console.log(clean('11111111')); // 0
//console.log(clean('')); // 0
//console.log(clean('ifudigsd9999999999h//')); // 0
//console.log(clean('ifudigsd9999        999999h//')); // 0

// --------------------------------------------------------------------------


/*

input:
  - string
  - might be non-numbers
output:
  - boolean

datatyupes:
  - array of number primitives

alg:
  - clean input of non digits + convert to array of numbers
    - if there are no numbers return false
  - iterate through the array and apply "lunner" to every second one
    - lunner doubles a number and -9 from it if it's > 10 or more returns result
  - sum all digits (reduce, 0)
  - validate sum % 10 === 0
  - return result of validation

*/

function lunner(number) {
  return number * 2 >= 10 ? (number * 2) - 9 : number * 2;
}

function sum(total, number) {
  return total + number;
}

function luhn(text) {
  var text = (text.match(/[0-9]/g) || [])
    .reverse()
    .map(function(element, index) {
        return index % 2 !== 0 ? lunner(Number(element)) : Number(element);
      });

  return ((text.reduce(sum, 0) % 10 === 0) &&
          text.length !== 0);
}


//console.log(luhn('8763')); // true
//console.log(luhn('1111')); // false
//console.log(luhn(' 876 3')); // true
//console.log(luhn(' 876   -gsdfdj3')); // true
//console.log(luhn('')); // false
//console.log(luhn(' fh')); // false
//console.log(luhn('59')); // true
//console.log(luhn('0')); // true
//console.log(luhn('5959595959590000')); // true

/*
input:
  - string of numbers
output:
  - origional string OR that + the check number
  - still a string
  - still could be random chars

datatype
  - string

alg:
  - modified luhn function that returns the number % 10
  - 10 - that is what you ahve to add
    - if the result of the modified luhn is 0 then nothing needs adding
  - append to string end and return.


*/


function luhnRemainder(text) {
  var text = (text.match(/[0-9]/g) || [])
    .reverse()
    .map(function(element, index) {
        return index % 2 !== 0 ? lunner(Number(element)) : Number(element);
      });

  return text.length > 0 ? (text.reduce(sum, 0) % 10) : false;
}

function makeLuhn(string) {
  var remainder = luhnRemainder(string);
  if (remainder === 0) {
    return string;
  } else if (remainder) {
    var addNumber = luhnRemainder(string + '0');
    return string + String(10 - addNumber);
  }

  return null;
}

//console.log(makeLuhn('2323 2005 7766 355')); /// 4 on end
//console.log(makeLuhn('2323 2005 7766 3554')); /// same
//console.log(makeLuhn('1111')); // 11114
//console.log(makeLuhn('876')); // 8763

// --------------------------------------------------------------------------

/*

input
  - string
  - only letters
  - case insensititve
output
  - boolean

datatype
  - string made of pairs of letters

  - input processed as an array

alg:
  - for each letter in the inpuit string (lowercased)
      - replace the pair forrespnding to that letter from string with nothing
      - check that the replacement happened
        - if the replacement didn;t happen, we don;t have the right blocks so return false
  - return true if everything passes.

*/

function blockWord(word) {
  var blocks = ':bo::xk::dq::cp::na::gt::re::fs::jw::hu::vi::ly::zm:'

  return word.split('').every(function(letter){
    var char = letter.toLowerCase();
    var prev = blocks.length;
    blocks = blocks.replace(new RegExp('(:' + char + '.:|:.' + char + ':)'), '');
    return blocks.length !== prev;
  });
}

//console.log(blockWord('HIPPO')); // false
//console.log(blockWord('BATCH')); // true
//console.log(blockWord('BUTCH')); // false
//console.log(blockWord('jest'));  // true

// --------------------------------------------------------------------------

/*

input:
  - string
  - number chars
  - delimiters between them
  - raange notators

output:
  - number priimites in an array

datatype
  - delimiters: regex
  - range notators : regex
  - input processed a a string with regex
  - then as an array oif strings

alg:
  - split the input according to dleimiters
  - craete empty array
  - for each string in the input array insert a range of numbers into the new array
    - helper function rangeMaker(string):
      - split strign according to range notators
      - create new array
      - insert into new array using for loop from bottom delimiter to toop delimiter
      - return new array

  - return new array

*/




//console.log(rangeMaker('1:4'));
//console.log(rangeMaker('1..10'));
//console.log(rangeMaker('1-4'));



//console.log(allNums('1,3,5,7,2,4,1')); // [1, 3, 5, 7, 12, 14, 21]
//console.log(allNums('1:3,5:7,2:4')); // [1, 3, 5, 7, 12, 14]
//console.log(allNums('1..3,2..4')); // [1, 2, 3, 12, 13, 14]
//console.log(allNums('1,3,5,7,2:4,1')); // [1, 3, 5, 7, 12, 13, 14, 21]
//console.log(allNums('9,8,7,7,2,4,1')); // [1, 3, 5, 7, 12, 14, 21]
//console.log(allNums('9')); // [9]
//console.log(allNums('1,3,5,7,2,4..1'));

// --------------------------------------------------------------------------

/*
input:
  - string,
  - space deliniated
  - all caps

output:
  - same letters, re-ordered

alg:
  - group letters accioridng to rows
    - pattern:
      - add next letter to top row
      - add a letter toe each middle row
      - add a letter to the bottom row
      - add a letter to each middle row
        - repeat untill no more letters
  - stitch each group together end to end
  - return


*/


function makeRows(rails) {
  var currentRows = 0;
  var rows = []
  while (currentRows < rails) {
    rows.push('');
    currentRows++;
  }

  return rows;
}

function clean(input) {
  return input.match(/[a-zA-Z]/g);
}

function encode(string, rails) {
  var rows = makeRows(rails);
  array = clean(string);
  var index = 0;

  while (index < array.length) {
    var currentRow = 0;
    while (currentRow < rows.length && index < array.length) {
      rows[currentRow] += array[index];
      index++;
      currentRow++;
    }

    currentRow -= 2;

    while (currentRow > 0 && index < array.length) {
      rows[currentRow] += array[index];
      index++;
      currentRow--;
    }

    currentRow--;
  }

  return rows.join('');
}


function decode(string, rails) {
  var outerRailLength = Math.floor(string.length / ((rails - 2) * 2 + 2)) + 1;
  var result = [];
  var count = 0;
  var currentIndex = 0;
  var final = [];

  result.push(string.substr(currentIndex, outerRailLength));
  count++;
  currentIndex += outerRailLength;

  while (count < rails) {
    result.push(string.substr(currentIndex, outerRailLength - 1));
    currentIndex += outerRailLength - 1;
    result[count] += ((string.substr(currentIndex, outerRailLength - 1)));
    count++;
    currentIndex += outerRailLength - 1;
  }

  count--;
  result[count] += (string.substr(currentIndex, outerRailLength));
  var ahead = 0;
  for (var i = 0; i < result[0].length; i++) {
    var row = 0
    final.push(result[row][i]);
    row ++;
    for (; row < result.length - 1; row++) {
      if (result[row][i + ahead]) {
        final.push(result[row][i + ahead]);
      }
    }

    ahead += 1;
    if (result[row][i]) {
      final.push(result[row][i]);
    }

    row--;

    for (; row > 0; row--) {
      if (result[row][i + ahead]) {
        final.push(result[row][i + ahead]);
      }
    }

  }

  return final;
}
console.log(encode("WE ARE DISCOVERED. FLEE AT ONCE", 3));
var x = encode("WE ARE DISCOVERED. FLEE AT ONCE", 3);

console.log(decode(x, 3));

console.log(encode("WE ARE DISCOVERED. FLEE AT ONCE", 5));
var x = encode("WE ARE DISCOVERED. FLEE AT ONCE", 5);

console.log(decode(x, 5));
