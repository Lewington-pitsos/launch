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

$(function() {
  $(document).on('submit', function(e) {
    e.preventDefault();
    first = Number($('#first').val());
    second = Number($('#second').val());
    operand = $('select').val();
    console.log(first);
    console.log(second);
    console.log(operand);
    var result = operandConvert[operand](first, second);
    $('h1').text(result);
  })


})
