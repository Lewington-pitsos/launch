var firstName = 'Louka';
var lastName = 'Ewington-Pitsos'
var fullName = firstName + ' ' + lastName
console.log(fullName);

console.log(firstName.concat(lastName));

var arr = fullName.split(' ');

console.log(arr);

var lan = 'JavaScript';

var ind = lan.substr(-6, 1);

console.log(ind);

var charCode = lan.charCodeAt(ind);

console.log(charCode);

console.log(String.fromCharCode(charCode));

console.log(lan.lastIndexOf('a'));

var aIndex = lan.indexOf('a');
var vIndex = lan.indexOf('v');

console.log(lan.substring(aIndex, 4));
console.log(lan.substring(vIndex, 4));
