$(function() {
  var links = $('a');
  var articles = $('article');

  $('body').on('click', 'a', function(e) {
    e.preventDefault()
    var id = e.target.getAttribute('href');
    setState(id);

  })

  function resetActive() {
    links.removeClass('active');
    articles.removeClass('visible');
  }

  function setState(id) {
    resetActive()
    var article = $(`#${id}`);
    $(`a[href=${id}]`).addClass('active')
    article.addClass('visible');
    var state = {
      id: id,
      text: article.text
    }
    if (true) {

    }
    updateHistory(state)
  }

  function updateHistory(object) {
    history.pushState(object, object.id)
  }

  $(window).on('popstate', function(e) {
    e.preventDefault();
    console.log(e);
    var state = e.origionalEvent.state;
    console.log(state);
    setState(state ? 'one' : state.id);
  });
})
