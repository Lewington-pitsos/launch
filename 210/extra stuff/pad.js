function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function properConjunction(str) {
  if ('aeiouy'.includes(str.slice(0, 1))) {
    return 'are an';
  } else {
    return 'are a';
  }
}

var angryAdjectives = ['nasty', 'evil', 'sly', 'dastardly', 'cowardly', 'vain', 'mean-spirited', 'filthy', 'low-born', 'back-stabbing', 'impious', 'develish', 'foreign', ];
var angryNouns =  ['wench', 'wrongdoer', 'villain', 'coward', 'cheat',        'wanker', 'tartar', 'frenchman'];

var happyNouns = ['friend', 'monarch', 'lord', 'prince', 'brother', 'companion', 'gentleman'];
var happyAdjectives = ['pleasent', 'keen', 'well-wrought', 'kindly', 'hearty', 'hale', 'princely', 'lordly', 'handsome', 'fair', 'blessed', 'elegant', 'Napoleonesque', 'important'];

function makeOpinon(adjectives, nouns) {
  return {
    'adj': adjectives,
    'noun': nouns,
    pickAdj: function() {
      return randomElement(this['adj']);
    },
    pickNoun: function() {
      return randomElement(this['noun']);
    },
  }

}

var angry = makeOpinon(angryAdjectives, angryNouns);
var happy = makeOpinon(happyAdjectives, happyNouns);

function describe(...opinons) {
  var intro = 'You';
  return function(names) {
    names.forEach(function(name) {
      var opinon = randomElement(opinons);
      var firstAdjective = opinon.pickAdj();
      var postName = properConjunction(firstAdjective)
      console.log([intro, name, postName + ",", firstAdjective, opinon.pickAdj(), opinon.pickNoun() + '!'].join(' '));
    })
  }
}

var talkAbout = describe(angry, happy);
var lords = ['Lord Byron', 'Littlefinger', 'Wainwright Spottingweather', 'Lars the Minstril'];
//talkAbout(lords);

function xxx() {
  return "apple";
}

var qqq = function() {
  return 'pear';
}


console.log(xxx());
console.log(qqq());
console.log(xxx);
console.log(qqq);

var d = xxx;
console.log(d);
