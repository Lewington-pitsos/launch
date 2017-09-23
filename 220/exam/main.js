function printTen() {
  var number = 10;
  var count = 0;
  var times = 0;
  var wait = 1000;
  while (times < number) {
    setTimeout(function() {
      count++;
      console.log(count);
    }, wait);
    times++;
    wait += 1000;
  }
}

//printTen();

function printTillZero(num) {
  if (num > 0) {
    setTimeout(function() {
      num--;
      console.log(num);
      printTillZero(num)
    }, 1000);
  }
}

//printTillZero(5);

function getRels() {
  var paras = document.getElementsByTagName('p');
  var paraArray = Array.prototype.slice.call(paras);
  paraArray.forEach(function(element) {
    console.log(element.getAttribute('rel'));
  })
}

function getItems() {
  var inputs = document.getElementsByTagName('input');
  var inputsArray = Array.prototype.slice.call(inputs);
  var checked = [];
  var unchecked = [];
  inputsArray.forEach(function(element) {
    if (element.hasAttribute('checked')) {
      checked.push(element.nextElementSibling.textContent);
    } else {
      unchecked.push(element.nextElementSibling.textContent);
    }
  })

  return [checked, unchecked]
}

function walk(node) {
  if (node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
    var children = node.childNodes;
    children.forEach(function(child) {
      if (child.nodeValue && child.nodeValue.match(/\w/)) {
        console.log(child.nodeValue.trim());
      } else {
        walk(child);
      }
    })
  }
}

function walkList() {
  walk(document.body)
}

function addElement(tag, parent, text, attribute ) {
  var element = document.createElement(tag);
  if (text) {
    var text = document.createTextNode(text);
    element.appendChild(text);
  }
  if (attribute) {
    element.setAttribute(attribute.name, attribute.value)
  }

  parent.appendChild(element);
}

document.addEventListener('DOMContentLoaded', function() {
  //getRels();
  //console.log(getItems());
  //walkList();
  rewrite();

})

function rewrite() {
  var heading = document.createElement('h1');
  heading.textContent = 'The Day\'s News';
  document.querySelector('h2').parentNode.replaceChild( heading, document.querySelector('h2'));
  addElement('article', document.querySelector('.front-page'), null, { name:'class', value:'breaking'} );
  document.querySelector('.front-page').append(document.querySelector('p'))
  addElement('p', document.querySelector('.breaking'), 'This evening a fire took place in the old factory.');
  addElement('p', document.querySelector('.breaking'));
  addElement('a', document.querySelector('.breaking').lastChild, 'Read More', { name:'href', value:'/stories/15'} );
}

function helloLater(n) {
  setTimeout(function() {
    console.log('Hello World!');
  }, n * 1000)
}


function liCount() {
  document.addEventListener('DOMContentLoaded', function() {
    var lis = document.getElementsByTagName('li');
    console.log(lis.length)
  })
}


//liCount();

document.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    event.stopPropagation;
  }
}, true)
