
$(function() {
  $('a').click(function(e) {
    e.preventDefault();
    var currentArticle = $(`article[data-block=${$(this).data('block')}]`);
    var siblings = currentArticle.siblings('article');
    siblings.css('display', 'none');
    currentArticle.css('display', 'block');
  })
})
