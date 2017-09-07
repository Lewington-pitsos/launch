function greetings(fullname, job) {
  var name = fullname.join(' ');
  var title = job.title + ' ' + job.occupation;
  console.log('hello ' + name + ', I hate ' + title + "'s" )
}

//greetings(['John', 'Q', 'Doe'], { title: 'Master', occupation: 'Plumber' });

function repeatedCharacters(str) {
  var letters = [];
  var result = {};
  for (var i = 0; i < str.length; i++) {
    if (letters.includes(str[i])) {
          addProperty(result, str[i]);
    }
    letters.push(str[i]);
  }

  return result;
}


function addProperty(obj, prop) {
  if (Object.keys(obj).includes(prop)) {
    obj[prop] += 1;
  } else {
    obj[prop] = 2;
  }
}

//console.log(repeatedCharacters('Programming'));    // { r: 2, g: 2, m: 2 }
//console.log(repeatedCharacters('Combination'));    // { o: 2, i: 2, n: 2 }
//console.log(repeatedCharacters('Pet'));            // {}
//console.log(repeatedCharacters('Paper'));          // { p: 2 }
//console.log(repeatedCharacters('Baseless'));       // { s: 3, e: 2 }
