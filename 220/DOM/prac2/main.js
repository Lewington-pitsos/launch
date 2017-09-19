function walk(node, callback) {
  node.children.forEach(element => walk(element, callback));
  return callback(node);
}

function makeLister(element, callback) {
  var list = [];
  return function(node) {
    if (node.) {

    }
  }
}

function mapNodeList(list, callback) {
  var array = Array.prototype.slice.call(list);
  return array.map(callback);
}

function eachNodeList(list, callback) {
  var array = Array.prototype.slice.call(list);
  return array.forEach(callback);
}

function wordCount(element) {
  return element.textContent.match(/\w+/g).length;
}

function alternateingAlter(element, index) {
  if (index % 2 !== 0) {
    element.style.color = 'green';
  }
}

function grabText(element) {
  return element.textContent.trim();
}

function makeClassification(values) {
  var classes = ['Kingdom', 'Phylum', 'Class', 'Order', 'Suborder', 'Family', 'Genus', 'Species'];
  var obj = {};
  classes.forEach(function(element, index) {
    obj[classes[index]] = values[index];
  });
  return obj;
}
