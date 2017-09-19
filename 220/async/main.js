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
      clearInterval(blinker);
      textField.classList.remove('cursor');
      textField.classList.remove('focused');
    }
  }
}

function makeInput(textField, content) {
  return function(event) {
      if (textField.classList.contains('focused')) {
      if (event.key === 'Backspace') {
        content.textContent = content.textContent.slice(0, -1);
      } else {
        content.textContent += event.key;
      }
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
  document.addEventListener('keydown', makeInput(textField, content));
})
