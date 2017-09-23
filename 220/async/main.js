var blinker;

function addFocus(event) {
  var target = event.target;
  removeFocus();
  if (target.classList.contains('text-field')) {
    target.classList.add('focused');
    blinker = setInterval(function() {
      target.classList.toggle('cursor');
    }, 500);
  }
}

function isFocused(element) {
  return element.classList.contains('focused');
}

function removeFocus() {
  var element = document.querySelector('.focused');
  if (element) {
    clearInterval(blinker);
    element.classList.remove('cursor');
    element.classList.remove('focused');
  }
}

function typeInput(event) {
  var target = document.querySelector('.focused');
  if (target) {
    var content = target.firstElementChild;
    if (event.key === 'Backspace') {
      content.textContent = content.textContent.slice(0, -1);
    } else if (event.key.length === 1) {
      content.textContent += event.key;
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('click', addFocus);
  window.addEventListener('keydown', typeInput);
})
