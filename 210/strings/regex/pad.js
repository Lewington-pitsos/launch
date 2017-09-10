/* ----------------------- REVERSE ------------------------ */

function rev(str) {
  return str.split('').reverse().join('');
}
//console.log(rev('hello'));               // returns "olleh"
//console.log(rev('The quick brown fox')); // returns "xof nworb kciuq ehT"


/* ----------------------- Acronym ------------------------ */

function acronym(string) {
  return string.split(/[\s-]/).map((substring) => substring[0].toUpperCase()).join('');
}


//console.log(acronym('Portable Network Graphics'));                 // "PNG"
//console.log(acronym('First In, First Out'));                       // "FIFO"
//console.log(acronym('PHP: HyperText Preprocessor'));               // "PHP"
//console.log(acronym('Complementary metal-oxide semiconductor'));   // "CMOS"
//console.log(acronym('Hyper-text Markup Language'));                // "HTML"

/* ----------------------- Email ------------------------ */
var port = /:[0-9]{4}/;
var nam = /walky\.com/;
var protocol = /https?\/\//;



var string = 'https//walky.com:3340';

console.log(string.match(port));
console.log(string.match(protocol));
console.log(string.match(nam));

var whole = new RegExp('w')

console.log(string.match(whole));
