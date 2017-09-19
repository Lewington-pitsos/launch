function makeGuessJudge() {
  var mainMessage = document.getElementsByTagName('p')[0];
  var range = Array.from(Array(100).keys());
  var answer = range[Math.floor(Math.random() * range.length)]
  var count = 0;

  return function() {
    var guess = document.querySelector('#guess').value;
    var newMessage = 'My number is ';
    count++;
    switch (true) {
      case guess > answer:
        newMessage += 'lower than ' + guess;
        break;
      case guess < answer:
        newMessage += 'higher than ' + guess;
        break;
      case guess === answer:
        newMessage = `You guessed it! It took you ${count} guesses`
        document.querySelector('[type="submit"]').disabled = true;
        break;
      default:
        newMessage = 'that input was not valid'
    }

    mainMessage.textContent = newMessage;
  }
}

function resetState() {
  var mainMessage = document.getElementsByTagName('p')[0];
  mainMessage.textContent = 'Guess a number from 1 to 100';
  document.querySelector('[type="submit"]').disabled = false;
  document.querySelector('[type="submit"]').addEventListener('click', makeGuessJudge());

}

document.addEventListener('DOMContentLoaded', function() {
  resetState();
  document.querySelector('a').addEventListener('click', resetState);
})
