$(function() {
  var filter = 'greyscale';
  var currentImage;
  $(document).click(function(e) {
    if (e.target.tagName === 'IMG') {
      currentImage = e.target;
    } else if (e.target.classList.contains('draw')) {
      var currentCanvas = document.createElement('canvas');
      var ctx = currentCanvas.getContext('2d');

      var trueImage = new Image();
      trueImage.src = currentImage.getAttribute('src');
      currentCanvas.setAttribute('width', trueImage.width + 'px');
      currentCanvas.setAttribute('height', trueImage.height + 'px');

      ctx.drawImage(currentImage, 0, 0);

      var altered = filters[filter](ctx, currentCanvas);
      ctx.putImageData(altered, 0, 0);
      $('.end').append($(currentCanvas));
    } else if (e.target.tagName === 'BUTTON') {
      filter = e.target.id;
      $('button').removeClass('active');
      e.target.className = 'active';
    }

  })
})

var filters = {
  binary: function toBinary(ctx, canvas) {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = pixels.data;

    for (var i = 0; i < data.length; i += 4) {
      var red = data[i];
      var green = data[i + 1];
      var blue = data[i + 2];
      if (red + green + blue > 381) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      } else {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }

    return pixels;
  },

  greyscale: function toGreyscale(ctx, canvas) {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = pixels.data;

    for (var i = 0; i < data.length; i += 4) {
      var red = data[i];
      var green = data[i + 1];
      var blue = data[i + 2];
      var val = (red * .3086 + green * .6094 + blue * .0820);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
    }

    return pixels;
  },

  contrast: function toContrast(ctx, canvas) {
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = pixels.data;

    data.forEach(function(element, index) {
      data[index] = element > 127 ? 255 : 0
    })

    return pixels;
  }
}
