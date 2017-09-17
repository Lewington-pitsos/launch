function makeCar(rate, breaking) {
  return {
    breaking: breaking,
    rate: rate,
    speed: 0,
    accelerate: function() {
      this.speed += this.rate;
    },
    brake: function() {
      this.speed -= this.breaking;
      if (this.speed < 0) {
        this.speed = 0;
      }
    }
  }
}

function makeCountry(name, cont, visited) {
  return {
    visited: visited || false,
    name: name,
    continent: cont,
    getDescription: function() {
      var status = this.visited ? 'have' :  "haven't";
      return `${this.name} is located in ${this.continent}. I ${status} visited ${this.name}`;
    },
    visitCountry: function() {
      this.visited = true;
    }
  }
}

function makeItemMaker() {
  var total = -1;
  return function(name, stock, price) {
    total++;
    return {
      id: total,
      name: name,
      stock: stock,
      price: price,
      setPrice: function(newPrice) {
        if (newPrice >= 0) {
          this.price = newPrice
        } else {
          console.log(`${newPrice} is not a valid price`);
        }
      },
      describe: function() {
        console.log(`Name: ${this.name}
ID: ${this.id}
Price: ${this.price}
Stock: ${this.stock}`);
      }
    }
  }
}

var itemMaker = makeItemMaker();
var scissors = itemMaker('Scissors', 8, 10);
var drill = itemMaker('Cordless Drill', 15, 45);
console.log(scissors);
console.log(drill);

scissors.setPrice(45);
scissors.setPrice(-10);
console.log(scissors.price);
drill.describe();
