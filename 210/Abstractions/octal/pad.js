function octalToDecimal(string) {
  return (string.split('').reverse()).reduce(convertToDecimal, 0);
}

function convertToDecimal(total, element, index) {
  return total + (Number(element) * (Math.pow(8, index)));
}

//console.log(octalToDecimal('1'));           // 1
//console.log(octalToDecimal('10'));          // 8
//console.log(octalToDecimal('130'));         // 88
//console.log(octalToDecimal('17'));          // 15
//console.log(octalToDecimal('2047'));        // 1063
//console.log(octalToDecimal('011'));         // 9

/* --------------------- ANAGRAMS -------------------------------- */

function anagram(word, array) {
  return array.filter(function(candidate) {
    return word.split('').sort().join() === candidate.split('').sort().join();
  });
}



//console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana'])); // [ "inlets" ]
//console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));  // [ "enlist", "inlets" ]


/* --------------------- BANDS -------------------------------- */

var bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];


function capitalize(str) {
  return str.split(' ').map(firstLetterUppercase).join(' ');
}

function firstLetterUppercase(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function processBands(array) {
  return array.map(fixBand);
}

function fixBand(band) {
  var newBand = {
    name: formatName(band['name']),
    country: 'Canada',
    active: band['active']
  }

  return newBand;
}

function formatName(name) {
  return capitalize(name.replace('.', ''));
}

//console.log(processBands(bands));
//console.log(bands);

/* --------------------- Class Records -------------------------------- */
var studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

function assignGrade(score) {
  var letter;
  switch (score) {
    case score >= 93:
      letter = "(A)";
      break;
    case score >= 85:
      letter = "(B)";
      break;
    case score >= 77:
      letter = "(C)";
      break;
    case score >= 69:
      letter = "(D)";
      break;
    case score >= 60:
      letter = "(D)";
      break;
    default:
      letter = "(F)";
      break;
  }

  return Math.round(score) + ' ' + letter;
}

function add(total, element) {
  return total + element;
}

function maximum(total, element) {
  return total >= element ? total : element;
}

function minimum(total, element) {
  return total < element ? total : element;
}

function getExamStats(array) {
  return array.reduce(add, 0) / array.length;
}

function calculateResults(student) {
  var examStats = getExamStats(student['scores']['exams'])
  var excerciseScore = student['scores']['exercises'].reduce(add, 0) * 0.35;
  var examScore = examStats * 0.65;
  var grade = assignGrade(examScore + excerciseScore);
  return [grade, student['scores']['exams']];
}

function eachExam(array) {
  array
}


function transpose(studentData) {
  var exams = []

  for (var i = 0; i < studentData[0][1].length; i++) {
    var mini = [];
    for (var j = 0; j < studentData.length; j++) {
      mini.push(studentData[j][1][i]);
    }
    exams.push(mini);
  }

  return exams
}

function generateClassRecordSummary(scores) {
  var students = Object.keys(scores).map(function(name){
    return scores[name];
  });

  var studentData = students.map(calculateResults);
  var grades = studentData.map(function(array) {
    return array[0];
  })

  var exams = transpose(studentData);

  var examStats = [];

  exams.forEach(function(current){
    var currentExam = {
      average: current.reduce(add, 0) / current.length,
      minimum: current.reduce(minimum),
      maximum: current.reduce(maximum)
    }

    examStats.push(currentExam);
  });

  return {
    studentGrades: grades,
    exams: examStats
  }
};

console.log(generateClassRecordSummary(studentScores));

/* --------------------- Class Records -------------------------------- */

function isAllUnique(string) {
  var scanned = [];
  return string.split('').every(function(current) {
    return [!scanned.includes(current), scanned.push(current)][0]
  })
}

//console.log(isAllUnique('The quick brown fox jumped over a lazy dog'));     // false
//console.log(isAllUnique('123,456,789'));                                    // false
//console.log(isAllUnique('The big apple'));                                  // false
//console.log(isAllUnique('The big apPlE'));                                  // false
//console.log(isAllUnique('!@#$%^&*()'));                                     // true
//console.log(isAllUnique('abcdefghijklmnopqrstuvwxyz'));                     // true
