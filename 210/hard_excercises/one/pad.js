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

console.log(Vingenere('apple', 'bbcc')); // bqrnf
console.log(Vingenere('appLe HHH!', 'bbcc')); // bqrNf IJJ!
console.log(Vingenere('appLe HHH!', 'bBCc')); // bqrNf IJJ!
