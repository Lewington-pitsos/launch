 // -----------------------------------------------------------------

 /*

input:
  - numbver primitive representing hiest possible square
  - no cleaning

output:
  - list of number primitives
  - all of them will be squares

datatyupe:
  - array to store squares
  - number primitives to multiply

alg:
  - create a results array
  - test every number from 0 incrementing till it's square is > num
    - push that square to results
    - return results
 */

function light(num) {
  return [...Array(num).keys()] // makes an array with all the numbers up to num
  .slice(1) // gets rid of that pesky 0
  .filter(element => (element * element) <= num ) // gets rid of all everything whose perfect square is > num
  .map(element => element * element); // turns everything into its square
}

//console.log([...Array(20).keys()]);

//console.log(light(0));
//console.log(light(1));
//console.log(light(9)); // should include 9
//console.log(light(1000));


 // -----------------------------------------------------------------


 /*

input:
  - a string
    - includes punctiation
    - any length
    - includes whitespace
    - can incldue capitals
    - handle empty string

  - an int represneting the offset
  - can be any number really

output
  - an offset string
  - must include non-modified punctiation and whitespace
  - case preserved

datatypes:
  - string to be returned as result
  - array storing ascii boundaries for lowercase and upper case
  - message into array

alg:
  - create new result string
  - iterate through and
    - if the char is a letter offset it and add to result
      - offset:
        - turn char into ascii code
        - add offset to ascii code according to adder:
          - adder :
            - subtracts 26 if adding breached upper bounds
    - else add to result anyway
  - return result

 */

function adder(code, bounds) {
  return code > bounds ? adder(code - 26, bounds) : code;
}

function processLetter(code, offset) {
  var asciiZ = 90;
  var asciiA = 65;
  var asciiz = 122;
  var asciia = 87;
  if (code <= asciiZ && code >= asciiA) {
    return adder(code + offset, asciiZ);
  } else if (code <= asciiz && code >= asciia) {
    return adder(code + offset, asciiz);
  } else {
    return code;
  }
}

 function caesarEncrypt(message, offset) {
   return message
    .split('')
    .map(element => String.fromCharCode(processLetter(element.charCodeAt(0), offset)))
    .join('');
 }

//console.log(caesarEncrypt('A', 0));       // 'A'
//console.log(caesarEncrypt('A', 3));       // 'D'

// Wrap around
//console.log(caesarEncrypt('y', 5));       // 'd'
//console.log(caesarEncrypt('a', 47));      // 'v'

// All letters
//console.log(caesarEncrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 25));
// ZABCDEFGHIJKLMNOPQRSTUVWXY
//console.log(caesarEncrypt('The quick brown fox jumps over the lazy dog!', 5));
// Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!

// Many non-letters
//console.log(caesarEncrypt('There are, as you can see, many punctuations. Right?; Wrong?', 2));


 // -----------------------------------------------------------------


 /*

input:
  - string
    - can be letters, spaces and whatever else
  - string
    - only letters
    - might be longer than the first
    - can be upper and lower

output:
  - string
    - encrypted
    - all origional punctuation and spaces
    - case is preserved

datatypes:
  - keyword:
    - array of charCodeAt values

  - message:
    - array


alg:
  - convert keyword into ints
    - use charCodeAt and subtract appripriate value

  - loop over array till end reached
    - apply cesar cypher at keyword index (0 innitially)
    - increase keyword index, unless it is keyword.length in which case set to 0

  return array.join.

 */

 function Vingenere(message, keyword) {
   var keys = keyword.split('').map(char => char.toLowerCase().charCodeAt(0) - 97);
   var keyIndex = -1;
   return message
    .split('')
    .map(function(element) {
      if (element.match(/[a-zA-Z]/)) {
        keyIndex = (keyIndex >= keys.length - 1 ? 0 : keyIndex + 1);
        return caesarEncrypt(element, keys[keyIndex])
      } else {
        return element;
      }
    }).join('');

 }

//console.log(Vingenere('apple', 'bbcc')); // bqrnf
//console.log(Vingenere('appLe HHH!', 'bbcc')); // bqrNf IJJ!
//console.log(Vingenere('appLe HHH!', 'bBCc')); // bqrNf IJJ!


 // -----------------------------------------------------------------

 /*


input:
  - single odd Number
  - n
  - 7 or higher

Output:
  - grid n*n
  - needs to match a star pattern


datatypes:
  - arrays for each row
  - indexing

alg:
  - make an array half the length of n (round up) wih a * at the end and ' ' otherwise
  - iterate through that array:
    - turn tht next index into a *
    - join to the reverse of that same array - the last index
    - join all together and add to big array
    - add "\n" to the end
  - print massive array
  -  print out n *
  - print reverse of massive array.

 */

function makeTemplate(length, index) {
  var row = new Array(length).fill(' ');
  row[index] = '*';
  return row;
}

function makeFullRow(length, index) {
  var template = makeTemplate(length, index);
  template.push('*');
  return (template.concat(makeTemplate(length, index).reverse()).join(''))
}

function star(n) {
  var half = Math.floor(n/2);
  var final = '';
  for (var i = 0; i < half; i++) {
    final += (makeFullRow(half, i) + '\n');
  }

  console.log(final);
  console.log('*'.repeat(n));
  console.log(final.slice(0, -1).split('').reverse().join(''));
}

//star(7);
//star(21);

 // -----------------------------------------------------------------

 /*
input:
  - string:
    - numbers delimited by either:
      - commas or range notaters
  - no funny inputs

output:
  - array of number primitives
  - converted accoridng to the rules

datatypes:
  - return list is an array
  - convert string to an array asap
  - keep seperators as strings, at least initially

alg:
  - iterate through string, and sepreate numebrs from seperatores
  - convert each number according to the rules:
    - convert first number literally
    - each other number
      - record the string of that number.
      - convert literally, if larger than previous, return
      - otherwise keep adding 1 untill it is largher than previious
      - reconvert to string
        - check if the end of this string matces the initial string
          - if so, return
          - otherwise kjeep adding one till it does
            - then return
  - numbers all convetred
  - create new array
  - convert each number to it's range and add to array:
    - if previous seperator is a comma, jsut add the number
    - otherwise,
      - add the number,
      - add 1
      - add number again unless it is the same as the next number, in whichc ase break

  - return this new array.


 */

function miniRange(num, seperator, nextNum) {
  if (seperator === ',' || nextNum === undefined) {
    return [num];
  }

  var final = [num]
  while (num < nextNum - 1) {
    num++;
    final.push(num);
  }

  return final;
}

function convertNum(numString, prev) {
  var num = Number(numString);
  if (num > prev) {
    return num
  }

  while (num <= prev) {
    num++;
  }

  var lengthDiff = String(num).length - numString.length ;
  while (String(num).slice(lengthDiff) !== numString) {
    num++;
    var lengthDiff = String(num).length - numString.length;
  }

  return num;
}

function toRange(str) {
  var temp = str.match(/[0-9]+|:|-|\.\.|,/g);

  var prev = 0;
  temp.forEach(function(element, index) {
    if (element.match(/[0-9]/)) {
      temp[index] = convertNum(element, prev);
      prev = temp[index];
    }
  })

  var final = [];

  temp.forEach(function(element, index) {
    if (String(element).match(/[0-9]/)) {
      seperator = temp[index + 1];
      final = final.concat(miniRange(element, seperator, temp[index + 2]))
    }
  })

  return final;
}



console.log(toRange('21,3,7,2,4,1'));  // [1, 3, 7, 12, 14, 21]
console.log(toRange('1-3,7,1-2'));  // [1, 2, 3, 11, 12]
console.log(toRange('1:5:2'));  // [1, 2, 3, 4, 5, ... 12]
console.log(toRange('1..5-2'));  // [1, 2, 3, 4, 5, ... 12]
console.log(toRange('104-2'));  // [104, ... 112]
console.log(toRange('104:02'));  // [104, ... 202]
console.log(toRange('545, 64:11'));  // [545, 546, ... 611]


// -----------------------------------------------------------------

/*
input:
  - number of rails
  - string
  - contains letters and other chars

output:
  scrambleed string
  -  only containing letters

datatypes:
  - an object storing
    - beginning
    - middles
    - end
      - all of these contain 1 or more arrays,
  - string stored as an array;

alg:
  - convert string into array, stripping non letters
  - initialize object
  - iterate through array and
    - add letter to start
    - add letter to middles
    - add letter to end
    - add letter to middles in reverse order
      - add letter is helper fucntion
        - puts one letter into each array in the passed in argument
  - concat annd then join start, middles and end and return

*/

function slotRails(letters, rails, block) {
  for (var i = 0; i < letters.length;) {
    block(rails['start'], letters, i);
    i++;

    rails['middles'].forEach(function(row) {
      block(row, letters, i);
      i++;
    });

    block(rails['end'], letters, i);
    i++;

    rails['middles'].reverse();

    rails['middles'].forEach(function(row) {
      block(row, letters, i);
      i++;
    });

    rails['middles'].reverse();
  }

}

var pushIfValid = function(array, input, i) {
  if (input[i]) {
    array.push(input[i])
  }
}

function createRows(num) {
  var middleArrays = [];
  for (var i = 0; i < num - 2; i++) {
    middleArrays.push([]);
  }
  return {
    start: [],
    middles: middleArrays,
    end: [],
  }
}

function encode(str, num) {
  var letters = str.match(/[a-z]/gi);

  var rails = createRows(num);

  slotRails(letters, rails, pushIfValid);

  return rails['start'].concat(...rails['middles']).concat(rails['end']).join('');
}

/*
input:
  -string of letters
  - nothing but letters

  - number of rails

output:
  - string, but re-ordered

datatypes:
  - object for start middles and end
  - array to add stuff to

alg:
  - convert the input string intop rails
    - devide input string length by number of rails rounding down
    - times that number by the number of rails, if it's the same as string length, proceed otherwise record the difference
    - create an array
    - unshift that many from the input string and add to first
    - unshift that many * 2 - difference from input string for each middle and add
    - unshift and add to end.
      - if the string devides unevenly this is ok, middles and end might miss out (this will automatically be shortened if necessairy as we reach the end of the string)

  - apply slotRails with popIfValid
  - return the result joined together.
*/

var popIfValid = function(array, input, i) {
  if (array[0]) {
    input.push(array.shift());
  }
}

function slotRails2(letters, rails, block) {
  var final = rails['start'].length;
  for (var i = 0; i < final; i++) {
    block(rails['start'], letters, i);

    rails['middles'].forEach(function(row) {
      block(row, letters, i);
    });

    block(rails['end'], letters, i);

    rails['middles'].reverse();

    rails['middles'].forEach(function(row) {
      block(row, letters, i);
    });

    rails['middles'].reverse();
  }

}

function decode(letters, num) {
  var rowLength = Math.ceil(letters.length / (num + num - 2));
  var minRowLength = Math.floor(letters.length / (num + num - 2));
  var rails = createRows(num);
  letters = letters.split('');
  rails['start'] = letters.splice(0, rowLength);
  rails['middles'].forEach(function(_, index) {
    rails['middles'][index] = letters.splice(0, (rowLength - ((rowLength - minRowLength))) * 2)
  })

  rails['end'] = letters.splice(0, rowLength);
  var final = [];
  return final;
}

//console.log(encode('WE ARE DISCOVERED FLEE AT ONCE', 3));

//var z = encode('WE ARE DISCOVERED FLEE AT ONCE', 3);

//console.log(decode(z, 3));
