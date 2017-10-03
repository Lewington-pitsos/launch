var words = [
  'hail'.split(''),
  'mary'.split(''),
  'killer'.split(''),
  'oxymoron'.split(''),
  'fidelity'.split(''),
  'mexican'.split('')
]

function makeNewPara(letter) {
  var para = $(document.createElement('p'));
  para.text(letter);
  para.addClass('letters');
  return para;
}

function toArray(str) {
  if (str) {
    return str.split(',').map(element => Number(element));
  } else {
    return [];
  }

}

//console.log((toArray('3,4,5,6,7')));

function randomlyChoose(array, used) {
  var rand = Math.floor(Math.random() * array.length);
  if (!used.includes(rand)) {
    return rand
  } else {
    return randomlyChoose(array, used);
  }
}

$(function() {
  var alreadyUsed = toArray(localStorage.getItem('used'));

  // if all the words have already been cycled through, we need to start again
  if (alreadyUsed.length >= words.length) {
    console.log("sadasdasdasd");
    alreadyUsed = [];
  }

  var currentIndex = randomlyChoose(words, alreadyUsed);
  alreadyUsed.push(currentIndex);
  localStorage.setItem('used', alreadyUsed);
  console.log(alreadyUsed);
  var currentWord = words[currentIndex];

  var guesses = 6;
  var alreadyGuessed = [];
  var currentApples = 0;
  var display = new Array(currentWord.length).fill('');

  display.forEach(function(letter) {
    $('.word').append($(makeNewPara(letter)));
  })

  $(document).on('keypress', function(e) {
    var pressed = e.key;

    // whatever the guess is, as long as the game is still going, we add a new // paragraph to guesses
    if (!alreadyGuessed.includes(pressed) && guesses > 0) {
      $('.guesses').append($(makeNewPara(pressed)))
      alreadyGuessed.push(pressed);

      // if the current word contains the pressed letter and display doesn't
      // we want alter display and remove those letters from the current word
      //  So: find the indexes of the pressed letters
      //    replace those indexes with ' '
      //    convert the same indicies on display to pressed
      //     and change the text of word-letters to display
      if (currentWord.includes(pressed)) {
        currentWord.forEach(function(letter, index) {
          if (letter === pressed) {
            display[index] = pressed;
            $('.word .letters').eq(index).text(pressed);
          }
        });
        // it also makes sense to check here if all the letters have been
        // correctly entered or all the guesses used at the same time, so:

        if (display.join('') === currentWord.join('')) {
          console.log("sadasdad");
          $(document.body).animate({
            'background-color': '#4040f0'
          }, 1000);
          $('#result').text('You Win!');
          $('.round-end').removeClass('hidden');
        }

      // if the guess was wrong, we decrement guesses, move the apple sprite
      // down and check if we've used up all the guesses yet
      } else {
        guesses--;
        currentApples += 20;
        $('figure').css('background-position', `50% ${currentApples}%`);
        
        if (guesses <= 0) {
          // if all the guesses have been used, display defeat stuff
          $(document.body).animate({
            'background-color': '#f04040'
          }, 1000);
          $('#result').text('You Lose');
          $('.round-end').removeClass('hidden');
        }
      }
    }
  });

  // whenever we click the round-end link we want the page to reload
  $('a').click(function(e) {
    e.preventDefault();
    location.reload();
  })

})
