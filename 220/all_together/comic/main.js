$(function() {
  var $blinds = $('[id^=blind]');
  console.log($blinds.attr('lol'));
  startAnimate($blinds, 0);

  $(document).click(function() {
    $blinds.finish().removeAttr('style');
    startAnimate($blinds, 0);
  })
})


function startAnimate($blinds, delay) {
  $blinds.each(function(i) {
    var $blind = $blinds.eq(i);
    delay += 1000;
    $blind.delay(delay).animate({
      height: '0px',
      top: "+=" + $blind.height()
    }, {duration: 300})
  })
}
