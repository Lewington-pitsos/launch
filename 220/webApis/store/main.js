document.addEventListener('DOMContentLoaded', function() {
  var store = document.getElementById('store');

  var request = new XMLHttpRequest();
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');
  request.send();

  request.addEventListener('load', function(event) {
    store.innerHTML = request.response;
  });

  store.addEventListener('submit', function(event) {
    event.preventDefault();
    var target = event.target;

    var request = new XMLHttpRequest();

    console.log(target);

    var data = new FormData(target);
    console.log(data);

    request.open('PUT', 'https://ls-230-web-store-demo.herokuapp.com' + target.getAttribute('action') )

    request.setRequestHeader('Authorization', ' token AUTH_TOKEN');

    request.send(data);

    request.addEventListener('load', function(event) {
      store.innerHTML = request.response;
    });
  })

  store.addEventListener('click', function(event) {
    var target = event.target;
    if (target.tagName !== 'A') {
      return;
    }

    event.preventDefault();

    var request = new XMLHttpRequest();

    request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com' + target.getAttribute('href'));
    request.send();

    request.addEventListener('load', function(event) {
      store.innerHTML = request.response;
    });

  });

});
