document.addEventListener('DOMContentLoaded', function() {
  var currents = document.getElementsByClassName(localStorage.getItem('currentTab'));
  for (var i = 0; i < currents.length; i++) {
    currents[i].classList.add('active');
  }

  document.getElementsByTagName('textarea')[0].value = localStorage.getItem('currentText');

  var currentColour = localStorage.getItem('currentColour');
  document.body.style.background = currentColour;

  document.addEventListener('click', function(e) {

    var target = e.target;
    if (target.tagName === "A") {
      e.preventDefault();
      var activeClass = 'active';
      var tabs = document.getElementsByClassName('linked');
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove(activeClass);
      }

      target.classList.add(activeClass);
      var currentPara = document.querySelector(`p.${target.getAttribute('href')}`)
      currentPara.classList.add(activeClass);
      localStorage.setItem('currentTab', currentPara.id);
    } else if (target.tagName === "LABEL") {
      setTimeout(setColour, 0);
    }
  })

  window.addEventListener('unload', function(e) {
    localStorage.setItem('currentText', document.getElementsByTagName('textarea')[0].value)
  })

  function setColour() {
    var inputs = document.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        var colour = inputs[i].value;
        document.body.style.background = colour;
        localStorage.setItem('currentColour', colour);
      }
    }
  }
})
