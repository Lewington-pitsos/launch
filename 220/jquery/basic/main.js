var $content;

$(function() {
  $content = $('div');
  console.log($content);
  console.log($content.jquery);

  var q = "sdasd"
  console.log(q.jquery);

  console.log($content.css('font-size'));

  $content.css('font-size', '40px');

  console.log($content.css('font-size'));

  $content.css('border', '1px solid black');
  $content.width(500);
  console.log($content.height(200));
  console.log($content.width());
});
