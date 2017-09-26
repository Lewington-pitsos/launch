console.log(document);

function makeParaLog() {
  var count = 0;
  return function(node) {
    if (node.tagName === 'P') {
      console.log(node);
      count += 1;
      console.log(count);
    }
  }
}

function makeParaWords() {
  var all = []
  return function(node) {
    if (node.tagName === 'P') {
      all.push(node);
    }

    return all;
  }
}

var findParas = makeParaWords();

function makeImgLog() {
  var count = 0;
  return function(node) {
    if (node.tagName === 'IMG') {
      count += 1;
      console.log(count);
    }

  return count;
  }
}

function makePNGLog() {
  var count = 0;
  return function(node) {
    if (node.tagName === 'IMG') {
      var type = node.getAttribute('src');
      if (type.match(/png$/)) {
        count += 1;
      }
    }

  return count;
  }
}

function makeClassAdder(element, classText) {
  return function(node) {
    if (node.tagName === element) {
      node.classList.add(classText);
    }
  }
}

var addFireP = makeClassAdder('P', 'fire');

var redden = function(node) {
  if (node.tagName === 'A') {
    node.style.color = 'red'
  }

}

var countParas = makeParaLog();
var allWords = makeParaWords();

function walk(node, callback, value) {
  var children = node.childNodes;
  children.forEach(function(element) {
    walk(element, callback, value);
  })
  return callback(node);
}

var elements = document.querySelectorAll('.intro');
