var request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');
request.responseType = 'json';

console.log(request);

request.addEventListener('loadend', function(event) {
  console.log(event.target.response);
  console.log(event.target.status);
  console.log(event.target.response.open_issues);
})

request.addEventListener('error', function(event) {
  console.log('The request could not be completed!');
})

request.send();
