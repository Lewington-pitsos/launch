// ----------------------- forEach ---------------

function myForEach(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

var min = Infinity;
var getMin = function(value) {
  min = value <= min ? value : min;
};

var min = Infinity;
var max = -Infinity;

var getMinMax = function(value) {
  if (value >= max) {
    max = value;
  }

  if (value <= min) {
    min = value;
  }
};

[4, 5, 12, 23, 3].forEach(getMinMax);

//console.log(min, max);                          // 3

// ----------------------- Filter ---------------

function myFilter(array, callback) {
  var narray = [];
  for (var i = 0; i < array.length; i++) {
    callback(array[i], i, array) ? narray.push(array[i]) : 'whatever';
  }
  return narray;
}

var isPythagoreanTriple = function(triple) {
  return Math.pow(triple.a, 2) + Math.pow(triple.b, 2) === Math.pow(triple.c, 2);
};

//console.log(myFilter([{a: 3, b: 4, c: 5}, {a: 5, b: 12, c: 13},
          //{a: 1, b: 2, c: 3}], isPythagoreanTriple));

function multiplesOfThreeOrFive(array) {
  for (var i = 0; i < array.length; i++) {
    if (!isMultipleOfThreeOrFive(array[i])) {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
}

var isMultipleOfThreeOrFive = function(value) {
  return value % 5 === 0 || value % 3 === 0;
};

//console.log(multiplesOfThreeOrFive([1, 3, 5, 7, 11, 18, 16, 15]));    // [ 3, 5, 18, 15 ]

// ----------------------- Transform ---------------

function myMap(array, callback) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }

  return result;
}

var plusOne = function(n) { return n + 1; };

//console.log(myMap([1, 2, 3, 4], plusOne));       // [2, 3, 4, 5]


function getBooksTitle(books) {
  return myMap(books, getTitle);
}

function getTitle(book) {
  return book.title;
}

var books = [
  {
    title: 'JavaScript and JQuery: Interactive Front-End Web Development',
    author: 'Jon Ducket',
    edition: '1st',
  },
  {
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Haverbeke',
    edition: '2nd',
  },
  {
    title: 'Learning Web Design: A Beginner\'s Guide to HTML, CSS, JavaScript, and Web Graphics',
    author: 'Jennifer Niederst Robbins',
    edition: '4th',
  },
];

var getTitle = function(book) {
  return book['title'];
};

//console.log(getBooksTitle(books));
// console output
[
  'JavaScript and JQuery: Interactive Front-End Web Development',
  'Eloquent JavaScript: A Modern Introduction to Programming',
  'Learning Web Design: A Beginner\'s Guide to HTML, CSS, JavaScript, and Web Graphics'
]
// ----------------------- Reducing ---------------
function myReduce(array, callback, start) {
  var i = 0;
  if (start === undefined) {
    start = array[0];
    i = 1;
  }
  for (var i; i < array.length; i++) {
    start = callback(start, array[i], i, array)
  }

  return start;
}

var smallest = function(result, value) {
  return result <= value ? result : value;
};

var sum = function(result, value) {
  return result + value;
};

//console.log(myReduce([5, 12, 15, 1, 6], smallest));           // 1
//console.log(myReduce([5, 12, 15, 1, 6], sum, 10));            // 49

function longestWord(words) {
  return myReduce(words, longest);
}

var longest = function(result, currentWord) {
  return currentWord.length >= result.length ? currentWord : result;
};

//console.log(longestWord(['abc', 'launch', 'targets', '']));      // "targets"

// ----------------------- Interrogation ---------------

function myOwnEvery(array, func) {
  for (var i = 0; i < array.length; i++) {
    if (!func(array[i], i, array)) {
      return false;
    }
  }

  return true;
}

var isAString = function(value) {
  return typeof value === 'string';
};

//console.log(myOwnEvery(['a', 'a234', '1abc'], isAString));       // true

function areAllNumbers(array) {
  return myOwnEvery(array, isANumber);
}

var isANumber = function(value) {
  return typeof value === 'number';
};

//console.log(areAllNumbers([1, 5, 6, 7, '1']));             // false
//console.log(areAllNumbers([1, 5, 6, 7, 1]));               // true

// ----------------------- Sort ---------------


// ----------------------- Combining Abstractions ---------------

var names = ['Heather', 'Gisella', 'Katsuki', 'Hua', 'Katy', 'Kathleen', 'Otakar'];

function firstLetter(string) {
  return string[0];
}

var firsts = myMap(names, firstLetter);

function counts(list, current) {
  list[current] ? list[current] += 1 : list[current] = 1;
  return list;
}

var counts = myReduce(firsts, counts, {});

function greatest(current, candidate, index) {
  return
}

var max = myReduce(Object.keys(counts), function(current, candidate){
  return counts[current] >= counts[candidate] ? current : candidate;
});

console.log(max);


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

//console.log(signedIntegerToString(4321));      // "+4321"
//console.log(signedIntegerToString(-123));      // "-123"
//console.log(signedIntegerToString(0));         // "0"

// ----------------------- 1 ---------------
