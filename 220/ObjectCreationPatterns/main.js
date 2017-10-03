function newPerson(name) {
  var newObject = {};
  Object.defineProperties(newObject, {
    name: {
      value: name,
      writable: false
    },
    log: {
      value: function() {
        console.log(name);
      },
      writable: false
    }
  });

  return newObject;
}

var me = newPerson('Shane Riley');
me.log();     // Shane Riley
me.log = function() { console.log("Amanda Rose"); };
me.log();     // Shane Riley
