var first;
var second;
var operand;

var operandConvert = {
  '+': function(a, b) {
    return a + b
  },
  '-': function(a, b) {
    return a - b
  },
  '/': function(a, b) {
    return a / b
  },
  '*': function(a, b) {
    return a * b
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('submit', function(e) {
    e.preventDefault();
    first = Number(document.querySelector('#first').value);
    second = Number(document.querySelector('#second').value);
    operand = document.querySelector('select').value;
    console.log(first);
    console.log(second);
    console.log(operand);
    var result = operandConvert[operand](first, second);
    document.querySelector('h1').textContent = result;
  })
})
