/*
alg:
  - convert to string
  - reverse the string
    - split
    - reverse
    - join
  - convert to num
*/

function rev(num) {
  var negative = num < 0;
  var result = Number(String(Math.abs(num)).split('').reverse().join(''));
  if (result >= 2147483647 ) {
    return 0;
  }
  return negative ? -result : result;
}


//console.log(rev(123));
//console.log(rev(-0));
//console.log(rev(-123333));
//console.log(rev(-23));
//console.log(rev(124467763));


/* ---------------------------------------------------------------------- */

/*
ionput:
  - string
  - can be empty
  - can include whitespace

output:
  - first
  - longest stubstring
  - no rpeated chars


alg:
  - craete new array of strings (result)
  - convert string into an array
  - iterate through string
    - each time you find a repeated charecter:
      - add a copy of the string to far to result
      - destroy the string so far
  - finally, compare the strings in result and select the longest/ closests to start

*/


function longSub(str) {
 return makeSubstrings(str.split(''), 0);
}

function makeSubstrings(array, maxlen) {
  if (array.length === 0) {
    return maxlen
  }
  var chars = [];
  for (var i = 0; i < array.length; i++) {
    if (chars.includes(array[i])) {
      maxlen = chars.length > maxlen ? chars.length: maxlen
      return makeSubstrings(array.slice(1), maxlen)
    } else {
      chars.push(array[i])
    }
  }

  maxlen = array.length > maxlen ? array.length: maxlen
  return maxlen;
}
var x = 'abcabcbb'.split('');

//console.log(longSub("")); // 'abc'

//console.log(longSub("abcabcbb")); // 'abc'
//console.log(longSub('abcdefghijklmnopp')); // 'abcdefghijklmnop'
//console.log(longSub("bbbb")); // 'b'
//console.log(longSub("pwwkew")); // 'wke'
//console.log(longSub("kew")); // 'kew'
//console.log(longSub('abcdefghijklmnop')); // 'abcdefghijklmnop'
//console.log(longSub('aabcdefghijklmnop')); // 'abcdefghijklmnop'
//console.log(longSub("abcdbaabcbb")); // 'abcd'
//console.log(longSub("abcaghj")); // 'bcaghj'
