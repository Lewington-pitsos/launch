function makeAddFocus(textField, blinker) {
  return function addFocus(event) {
    if (!textField.classList.contains('focused')) {
      blinker = setInterval(function() {
        textField.classList.toggle('cursor');
      }, 500);
        document.addEventListener('click', makeRemoveFocus(blinker, textField));
    } else {
      clearInterval(blinker);
      textField.classList.remove('cursor');
    }

    textField.classList.toggle('focused');
    return blinker;
  }
}


function makeRemoveFocus(blinker, textField) {
  return function(event) {
    if (event.target !== textField) {
      console.log(blinker);
      clearInterval(blinker);
      textField.classList.remove('cursor');
      textField.classList.remove('focused');
    }
  }
}

function makeAddLetter(textField, content) {
  return function(event) {
    if (textField.classList.contains('focused')) {
      content.textContent += event.key;
    }
  }
}

function makeBksp(textField, content) {
  return function(event) {
    if (textField.classList.contains('focused') &&
  event.key === 'Backspace') {
      content.textContent = content.textContent.slice(0, -1);
    }
  }
}

function toggleCursor(element) {
  element.classList.toggle('cursor');
}

document.addEventListener('DOMContentLoaded', function() {
  var content = document.querySelector('.content');
  var textField = document.getElementsByClassName('text-field')[0];
  var blinker = textField.addEventListener('click', makeAddFocus(textField, blinker));
  document.addEventListener('keypress', makeAddLetter(textField, content));
  document.addEventListener('keydown', makeBksp(textField, content));
})
