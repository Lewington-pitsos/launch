function moveX(event) {
  var ex = document.querySelector('.x');
  ex.style.top = event.clientY + 'px';
  ex.style.left = event.clientX + 'px';
}

function changeX(event) {
  var ex = document.querySelectorAll('.x div');
  for (var i = 0; i < ex.length; i++) {
    switch (event.key) {
      case 'r':
        ex[i].style.background = 'red';
        break;
      case 'g':
        ex[i].style.background = 'green';
        break;
      case 'b':
        ex[i].style.background = 'blue';
        break;
    }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  addEventListeners('mousemove', moveX);
  document.onkeypress = changeX;
})
