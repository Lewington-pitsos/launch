

function afterN(callback, num) {
  setTimeout(callback, num * 1000);
}

function xxx() {
  console.log('asdasdasdasd');
}

//afterN(fsdf, 2);

//var w = setInterval(xxx, 1000);

var counter;

function startCounting() {
  var num = 1;
  counter = setInterval(function() {
    console.log(num);
    num++;
  }, 1000);

}

//startCounting();

function stopCounting() {
  clearInterval(counter);
}

//setTimeout(stopCounting, 5000);

function yell(x) {
  var text = x.button;
  alert(text);
}

document.addEventListener('DOMContentLoaded', function(event){
  yell(event);
  document.querySelector('#message').addEventListener('click', yell)
})
