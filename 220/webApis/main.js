var request = new XMLHttpRequest();
request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products')

var obj = JSON.stringify({ name: 'insullt', sku: "2312scfhhkkwa", price: 500});

request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Authorization', 'token AUTH_TOKEN');



request.addEventListener('load', function(event) {
  console.log(request.responseText);
})

request.send(obj);
