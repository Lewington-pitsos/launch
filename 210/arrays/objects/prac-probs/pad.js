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

function toDegrees(rads) {
  return (rads * 180) / Math.PI;
}

function toRads(degrees) {
  return (degrees * Math.PI) / 180;
}


var a = 50.72;
var b = 49.2;
var c = 49.86;

function randomNumber(lower, upper) {
  var narray = [];
  for (; lower <= upper; lower++) {
    narray.push(lower)
  }

  while (narray.length > 1) {
    console.log(narray)
    var tokeep = [];
    for (var i = 0; i < narray.length; i++) {
      if (Math.random() >= 0.5) {
        tokeep.push(narray[i])
      }
    }

    if (tokeep.length >= 1) {
      console.log(tokeep)
      narray = tokeep;
    }
  }

  return narray[0];
}





function dateSuffix(num) {
  var str = String(num);
  if (str[0] === '1') {
    return 'th';
  }
  var last = str[str.length - 1];
  switch (last) {
    case '1':
      return 'st';
    case '2':
      return 'nd';
    case '3':
      return 'rd';
    default:
      return 'th'
  }
}

function formattedMonth(date) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[date.getMonth()];
}

function formattedDay(date) {
  var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[date.getDay()];
}

function formattedDate(date) {
  var dayNumber = date.getDate();
  var dayString = 'today is day '
  var x = dayString + formattedDay(date) + ', ' + formattedMonth(date) + ' ' + dayNumber + dateSuffix(dayNumber);
  console.log(x);
  return x;
}


var nate = new Date();
console.log(nate.getFullYear());
console.log(nate.getYear());
console.log(nate.getTime());

formattedDate(nate);
var tomorrow = new Date(nate.getTime());
tomorrow.setDate(6);
console.log(tomorrow);
formattedDate(tomorrow);

var nextWeek = new Date(nate.getTime());

console.log(formattedDate(nextWeek) === formattedDate(nate));

nextWeek.setDate(nextWeek.getDate() + 7);

console.log(formattedDate(nextWeek) === formattedDate(nate));
