var turk = {
  first_name: "Christopher",
  last_name: "Turk",
  occupation: "Surgeon",
  getDescription: function() {
    return this.first_name + ' ' + this.last_name + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  var returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);

var getTurkDescription = turk.getDescription.bind(turk);


var TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: "The Elder Scrolls",
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    }, this);
  }
}

TESgames.listGames();


var foo = {
  a: 0,
  incrementA: function() {
    var increment = function() {
      this.a += 1;
    }.bind(this);

    increment();
    increment();
    increment();
  }
}
console.log(foo.a);
