$(function() {
  var count = 0;
  var allShapes = [];
  var animated = false;
  $('form').submit(function(e) {
    e.preventDefault();
    var values = {};
    $(this).serializeArray().forEach(function(element) {
      values[element['name']] = element['value'] || 0;
    });
    var shape = `<div class="shape ${values['shape']}" id="${count}"><div>`;
    $('.stage').append(shape);
    count += 1;
    allShapes.push(values);
  })

  $('#start').on('click', function(e) {
    e.preventDefault();
    $(document).trigger('click.happy');
    if (animated) {
      allShapes.forEach(function(data, index) {
        var $currentShape = $(`#${index}`);
        $currentShape.css( {
          'top': `${data['y-start']}px`,
          'left': `${data['x-start']}px`
        })
      })

      animated = false;
    } else {
      allShapes.forEach(function(data, index) {
        var $currentShape = $(`#${index}`);
        $currentShape.animate({
          top: `${data['y-end']}px`,
          left: `${data['x-end']}px`
        }, {duration: 1000})
      })

      animated = true;
    }

  })

  $('#end').click(function(e) {
    e.preventDefault();
    $('.shape').stop(true);
  })

  $(document).on('click.sad', function(event) {
    console.log('boo');
    $(document).off('click.sad');
  })

  $(document).on('click.happy', function(event) {
    console.log(event.namespace);
  })

  $(document).on('click', function(event) {
    console.log("gaaaaah");
  })
})
