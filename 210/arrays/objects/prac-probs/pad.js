function objectHasProperty(object, str) {
  var names = Object.keys(object);
  return names.includes(str);
}


var pets = {
  cat: 'Simon',
  dog: 'Dwarf',
  mice: null,
};


function incrementProperty(object, str) {
  if (objectHasProperty(object, str)) {
    object[str] += 1;
  } else {
    object[str] = 1;
  }

  return object[str];
}


var wins = {
  steve: 3,
  susie: 4,
};

function copyProperties(object1, object2) {
  var count = 0;
  for (prop in object1) {
    object2[prop] = object1[prop];
    count ++;
  }

  return count;
}


var hal = {
  model: 9000,
  enabled: true,
};
var sal = {};

function wordCount(str) {
  var array = str.split(' ');
  var object = {};
  for (var i = 0; i < array.length; i++) {
    incrementProperty(object, array[i])
  }

  return object;
}

console.log(wordCount('box car cat bag box'));
