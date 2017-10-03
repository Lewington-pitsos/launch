var wordKeeper = {
  words: [
    'hail'.split(''),
    'mary'.split(''),
    'killer'.split(''),
    'oxymoron'.split(''),
    'fidelity'.split(''),
    'mexican'.split('')
  ],
  used: [],
  chooseOne: function() {
    var used = storage.getStorage();
    if (this.words.length <= used.length) {
      used = [];
      console.log('chosen words reset');
    }
    var index = this.chooseNewIndex(used);
    storage.setStorage(used, index);
    return this.words[index];
  },
  setWord: function() {
    return this.chooseOne();
  },
  chooseNewIndex: function(array) {
    var index = Math.floor(Math.random() * this.words.length);
    if (!array.includes(index)) {
      return index;
    } else {
      return this.chooseNewIndex(array);
    }
  }

}

var storage = {
  getStorage: function() {
    var stored = localStorage.getItem('used') || '';
    var storedArray = stored.split(',').map(element => Number(element));
    return storedArray
  },
  setStorage: function(array, index) {
    array.push(index);
    localStorage.setItem('used', array);
  }
}



$(function() {
  var protoGuessTracker = {
    makeGuess: function() {
      this.remaining--;
      this.appleLevel += 20;
      if (this.remaining < 0) {
        gameEnder.endGame();
      }
      $('figure').css('background-position', `50% ${this.appleLevel}%`);
    },

    init: function() {
      this.appleLevel = 0;
      this.remaining = 6;
      return this;
    }
  }

  var protoWordTracker = {
    displayArea: $('.word'),
    tryLetter: function(letter) {
      this.letter = letter;
      this.fits = false;
      this.word.forEach(this.insertLetters.bind(this));
      if (!this.fits) {
        this.guessTracker.makeGuess();
      } else if (this.word.join('') === this.guesses.join('')) {
        gameEnder.endGame(true);
      }
    },

    insertLetters: function(element, index) {
      if (element === this.letter) {
        this.guesses[index] = this.letter;
        this.displayArea.find('p').eq(index).text(element);
        this.fits = true;
      }
    },

    init: function() {
      this.word = wordKeeper.setWord();
      this.fits = false;
      this.guesses = new Array(this.word.length).fill(' ');
      this.guesses.forEach(appendParagraph.bind(this));
      this.guessTracker = Object.create(protoGuessTracker).init();
      return this;
    }
  }

  function appendParagraph(element) {
    var para = makeParagraph(element)
    this.displayArea.append(para);
  }

  function makeParagraph(element) {
    var para = $(document.createElement('p'));
    para.addClass('letters')
    para.text(element);
    return para;
  }

  var protoLetterTracker = {
    displayArea: $('.guesses'),
    guessed: [],
    newGuess: function(guess) {
      if (!this.guessed.includes(guess)) {
        this.guessed.push(guess);
        appendParagraph.call(this, guess);
        this.wordTracker.tryLetter(guess);
      }
    },

    init: function() {
      this.wordTracker = Object.create(protoWordTracker).init();
      return this;
    }
  }

  var inputWatcher = {
    keypress: function() {
      $(document).on('keypress', this.getKey.bind(this))
    },

    valid: function(input) {
      return (input <= 122 && input >= 97);
    },

    getKey: function(e) {
      if (this.valid(e.which)) {
        this.letterTracker.newGuess(e.key);
      }
    },

    init: function() {
      this.letterTracker = Object.create(protoLetterTracker).init();
      this.keypress();
      return this;
    }
  }

  var gameEnder = {
    toShow: $('.round-end'),
    background: $(document.body),
    messageHolder: $('#result'),
    replayLink: $('a'),
    endGame: function(won) {
      console.log("ssssssssss");
      this.toShow.removeClass('hidden');
      var colour = (won ? '#4040f0' : '#f04040')
      var message = (won ? 'You won!' : 'Sorry, you lost.')

      this.messageHolder.text(message);
      this.background.animate({
        backgroundColor: colour
      }, 1000);

      this.replayLink.on('click', function(e) {
        e.preventDefault();
        location.reload();
      })

      $(document).unbind('keypress');
    }
  }

  inputWatcher.init();
});
