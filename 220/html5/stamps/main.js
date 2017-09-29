$(function() {
  var width = 50;
  var height = 50;
  var canvas = document.getElementsByTagName('canvas')[0];
  var currentShape = 'square';
  var ctx = canvas.getContext('2d');
  $(document).click(function(e) {

    if (e.target.tagName === 'CANVAS') {
      var offset = (Number($(document.body).css('margin-left').slice(0, -2)));
      var x = e.clientX - offset;
      var y = e.clientY;
      shapes[currentShape](ctx, x, y, width, height);
    } else if (e.target.tagName === 'A') {
      e.preventDefault();
      currentShape = e.target.textContent.toLowerCase();
      $('a').removeClass('active');
      $(e.target).addClass('active');
    } else if (e.target.tagName === 'BUTTON') {
      console.log('asdasd');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

  })

  $('form').submit(function(e) {
    e.preventDefault();
    var colour = $(e.target).serializeArray()[0].value;
    ctx.fillStyle = colour;
  })
})

var shapes = {
  square: function(ctx, x, y, width, height) {
    ctx.fillRect(x, y, width, height);
  },

  triangle: function(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.closePath();
    ctx.fill();
  },

  circle: function(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.arc(x, y, (width + height) / 4, 0, Math.PI * 2);
    ctx.fill();
  }
}
