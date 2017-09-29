
document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ff0066';
  ctx.fillRect(10, 10, 100, 100);
  var colours = ['#000', '#003', '#006', '#009', '#00c', '#00f'];
  function draw() {
    colours.forEach(function(color, i) {
      ctx.fillStyle = color;
      ctx.fillRect(i * 20, i * 20, canvas.width - i * 40, canvas.height - i * 40);
      console.log(color);
    });

    colours.unshift(colours.pop());
  }

  draw();

  //setInterval(draw, 50);

  ctx.fillStyle = '#ff0';
  ctx.strokeStyle="#FF0000";
  ctx.arc(50, 50, 20, 0, 1 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(70, 170);
  ctx.lineTo(60, 60);
  ctx.lineTo(100, 0);
  ctx.closePath();
  ctx.fillStyle = 'rgba(80, 80, 190, 0.5)';
  ctx.fill();
  ctx.stroke();

  console.log(canvas.toDataURL());
  var q = canvas.toDataURL();
})
