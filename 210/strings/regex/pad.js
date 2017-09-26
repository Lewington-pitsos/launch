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

function isValidEmail(string) {
  var local = /^[a-zA-Z0-9]+/
  var sign = /@/
  var domain = /([a-zA-Z]+\.)+[a-zA-Z]+$/i
  var email = new RegExp(local.source + sign.source + domain.source);
  return !!(string.match(email));
}


//console.log(isValidEmail('Foo@baz.com.ph'));          // returns true
//console.log(isValidEmail('Foo@mx.baz.com.ph'));       // returns true
//console.log(isValidEmail('foo@baz.com'));             // returns true
//console.log(isValidEmail('foo@baz.ph'));              // returns true
//console.log(isValidEmail('HELLO123@baz'));            // returns false
//console.log(isValidEmail('foo.bar@baz.to'));          // returns false
//console.log(isValidEmail('foo@baz.'));                // returns false
//console.log(isValidEmail('foo_bat@baz'));             // returns false
//console.log(isValidEmail('foo@bar.a12'));             // returns false
//console.log(isValidEmail('foo_bar@baz.com'));         // returns false
//console.log(isValidEmail('foo@bar.....com'));         // returns false


/* ----------------------- Brackets ------------------------ */

function isBalanced(string) {
  var count = 0;
  var array = string.split('');
  for (var i = 0; i < array.length; i++) {
    if (array[i] === "(") {
      count++;
    } else if (array[i] === ')') {
      count--;
      if (count < 0) {
        return false;
      }
    }
  }

  return count === 0;
}


//console.log(isBalanced('What (is) this?'));        // true
//console.log(isBalanced('What is) this?'));         // false
//console.log(isBalanced('What (is this?'));         // false
//console.log(isBalanced('((What) (is this))?'));    // true
//console.log(isBalanced('((What)) (is this))?'));   // false
//console.log(isBalanced('Hey!'));                   // true
//console.log(isBalanced(')Hey!('));                 // false
//console.log(isBalanced('What ((is))) up('));       // false

/* ----------------------- Semtiment 1 ------------------------ */
var positiveWords = ['fortune', 'dream', 'love', 'respect', 'patience', 'devout', 'noble', 'resolution'];
var negativeWords = ['die', 'heartache', 'death', 'despise', 'scorn', 'weary', 'trouble', 'oppress'];

var textExcerpt = 'To be or not to be-that is the question:\n' +
  'Whether \'tis nobler in the mind to suffer\n' +
  'The slings and arrows of outrageous fortune,\n' +
  'Or to take arms against a sea of troubles,\n' +
  'And, by opposing, end them. To die, to sleep-\n' +
  'No more-and by a sleep to say we end\n' +
  'The heartache and the thousand natural shocks\n' +
  'That flesh is heir to-\'tis a consummation\n' +
  'Devoutly to be wished. To die, to sleep-\n' +
  'To sleep, perchance to dream. Aye, there\'s the rub,\n' +
  'For in that sleep of death what dreams may come,\n' +
  'When we have shuffled off this mortal coil,\n' +
  'Must give us pause. There\'s the respect\n' +
  'That makes calamity of so long life.\n' +
  'For who would bear the whips and scorns of time,\n' +
  'Th\' oppressor\'s wrong, the proud man\'s contumely, [F: poor]\n' +
  'The pangs of despised love, the law’s delay, [F: disprized]\n' +
  'The insolence of office, and the spurns\n' +
  'That patient merit of the unworthy takes,\n' +
  'When he himself might his quietus make\n' +
  'With a bare bodkin? Who would fardels bear, [F: these Fardels]\n' +
  'To grunt and sweat under a weary life,\n' +
  'But that the dread of something after death,\n' +
  'The undiscovered country from whose bourn\n' +
  'No traveler returns, puzzles the will\n' +
  'And makes us rather bear those ills we have\n' +
  'Than fly to others that we know not of?\n' +
  'Thus conscience does make cowards of us all,\n' +
  'And thus the native hue of resolution\n' +
  'Is sicklied o\'er with the pale cast of thought,\n' +
  'And enterprises of great pitch and moment, [F: pith]\n' +
  'With this regard their currents turn awry, [F: away]\n' +
  'And lose the name of action.-Soft you now,\n' +
  'The fair Ophelia.-Nymph, in thy orisons\n' +
  'Be all my sins remembered';

function sentiment(str) {
  var toProcess = str.toLowerCase().split(/[^\w]+/);
  var positive = [];
  var negative = [];
  toProcess.forEach(function(word) {
    if (positiveWords.includes(word)) {
      positive.push(word);
    } else if (negativeWords.includes(word)) {
      negative.push(word);
    }
  })

  var verdict = 'Neutral';
  if (positive.length > negative.length) {
    verdict = 'Positive'
  } else if (positive.length < negative.length) {
    verdict = 'Negative'
  }

  console.log('there are ' + positive.length + ' positive words');
  console.log('Positive sentiments: ' + positive.join(' '));

  console.log('there are ' + negative.length + ' negative words');
  console.log('Negative sentiments: ' + negative.join(' '));

  console.log('The sentement of the text is ' + verdict);
}

//sentiment(textExcerpt);


/* ----------------------- Semtiment 1 ------------------------ */
var positiveRegex = /(fortunes?)|(dream(s|t|ed)?)|(love(s|d)?)|(respect(s|ed)?)|(patien(ce|t)?)|(devout(ly)?)|(nobler?)|(resolut(e|ion)?)/gi;
var negativeRegex = /(die(s|d)?)|(heartached?)|(death)|(despise(s|d)?)|(scorn(s|ed)?)|(weary)|(troubles?)|(oppress(es|ed|or('s)?)?)/gi;

function toLowerCaseWord(word) {
  return word.toLowerCase();
}

function sentiment2(str) {
  var positive = str.match(positiveRegex);
  var negative = str.match(negativeRegex);

  var verdict = 'Neutral';
  if (positive.length > negative.length) {
    verdict = 'Positive'
  } else if (positive.length < negative.length) {
    verdict = 'Negative'
  }

  console.log('there are ' + positive.length + ' positive words');
  console.log('Positive sentiments: ' + positive.join(' '));

  console.log('there are ' + negative.length + ' negative words');
  console.log('Negative sentiments: ' + negative.join(' '));

  console.log('The sentement of the text is ' + verdict);
}

//sentiment2(textExcerpt);

/* ----------------------- Mail ------------------------ */

function sortDates(a, b) {
  var firstDate = a.split('-');
  var secondDate = b.split('-');
  var aDate = new Date(Number(firstDate[2]), Number(firstDate[0]), Number(firstDate[1]));
  var bDate = new Date(Number(secondDate[2]), Number(secondDate[0]), Number(secondDate[1]));

  if (aDate > bDate) {
    return 1;
  } else if (aDate < bDate) {
    return -1;
  }

  return 0;
}

function mailCount(emails) {
  var dates = emails.match(/[0-9]{2}-[0-9]{2}-[0-9]{4}/g);
  dates.sort(sortDates);
  var number = emails.match(/##\|\|##/g).length + 1;
  console.log('Count of email: ' + number);
  var start = dates[0];
  var end = dates[dates.length - 1];
  console.log('Date Range: ' + start + ' - ' + end )
}

//mailCount(emailData);

/* ----------------------- Longest Sentence ------------------------ */
var longText = 'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced. It is rather for' +
  ' us to be here dedicated to the great task remaining' +
  ' before us -- that from these honored dead we take' +
  ' increased devotion to that cause for which they gave' +
  ' the last full measure of devotion -- that we here highly' +
  ' resolve that these dead shall not have died in vain' +
  ' -- that this nation, under God, shall have a new birth' +
  ' of freedom -- and that government of the people, by' +
  ' the people, for the people, shall not perish from the' +
  ' earth.';

function longestArray(longest, candidate) {
  return longest.length >= candidate.length ? longest : candidate;
}

function stringToWords(string) {
  return string.split(/\s/)
}

function longestSentence(text) {
  var result = (text.match(/\w.+?[!?.]/g) || [])
    .map(stringToWords)
    .reduce(longestArray, []);

  console.log(result.join(' '));
  console.log('\nThe longest sentence has ' + result.length + ' words');

}

longestSentence(longText);
longestSentence('hello.  ');
longestSentence('');
longestSentence('hello  '); // 0 words, i'm, assuming this is ok since we're counting sentences here, so we only care about stuff that's syntactically a sentence
longestSentence('hello h.');
