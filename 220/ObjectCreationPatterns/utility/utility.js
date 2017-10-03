var _ = function(element) {

  //-------------------------- Private Methods ----------------------------


  var randomElement = function(array, covered=[]) {
    // grabs a random element from array
    // if that element is in the covered array
    //  recursively call randomElement
    // otherwise
    //  return the element
    var random = array[Math.floor(Math.random()*array.length)];
    return (covered.includes(random) ? randomElement(array, covered) : random)
  }

  // ------------------------ Public Methods ---------------------------

  u = {
    first: function() {
      return element[0];
    },
    last: function() {
      return element[element.length - 1];
    },
    without: function(...out) {
      return element.filter(element => !out.includes(element) )
    },
    lastIndexOf: function(target) {
      // recursively keep finding the last element and checking if it's
      // the element we're after, then repeating on a shortened array
      if (this.last() === target) {
        return element.length - 1;
      } else {
        return _(element.slice(0, -1)).lastIndexOf(target);
      }
    },
    sample: function(quant) {
      // if quant is falsy, just return a random array element
      //  otherwise:
      //   use a for loop and
      //    each time pull out a random element from the array and add it to a
      //    new array
      //   return the new array.
      if (quant) {
        var narray = [];
        for (var i = 0; i < quant; i++) {
          narray.push(randomElement(element, narray));
        }
        return narray;
      } else {
        return randomElement(element);
      }
    },

    // ------------------------ OBJECT Methods ---------------------------

    findWhere: function(target) {
      // put all properties of the target object into an array (props)
      // go through all the objects in element and
      //  return the first object such that
      //    for every property in props, the object's version of that property
      //    matches the value of target for that property

      var props = Object.keys(target);
      return element.find(function(object) {
        //console.log(props);
        return props.every(function(prop) {
          return object[prop] === target[prop];
        });
      });
    },

    where: function(target) {
      // put all properties of the target object into an array (props)
      // go through all the objects in element and
      //  return ALL objects such that
      //    for every property in props, the object's version of that property
      //    matches the value of target for that property

      var props = Object.keys(target);
      return element.filter(function(object) {
        //console.log(props);
        return props.every(function(prop) {
          return object[prop] === target[prop];
        });
      });
    },

    pluck: function(key) {
      // make a nwe array (allValues)
      // iterate through eveery object in elements and
      //  add the value of object[key] to allValues
      // return allValues

      return element.reduce((all, obj) => obj[key] ? all.concat(obj[key]) : all, [])
    },

    keys: function() {
      return Object.getOwnPropertyNames(element);
    },

    values: function() {
      return Object
        .getOwnPropertyNames(element)
        .map(key => element[key]);
    },

    pick: function(...picked) {
      // puts all the strings passed in into an array (picked)
      // creates a new object (newObject)
      //  for each element in picked, creates a new property in newObject
      //  with the same value as the value of that propert in element
      return picked.reduce((o, prop) => [o[prop] = element[prop], o][1], {});

    },

    omit: function(...picked) {
      // puts all the strings passed in into an array (picked)
      // create a new object (newObject) by assigning all the properties of
      // element
      // for every property (prop) in picked assign newObject[prop] = undefiend
      return picked
        .reduce((o, prop) => [delete o[prop], o][1], Object.assign({}, element));

    },

    has: function(prop) {
      // put all the properties of the object into an array (props)
      // return includes on the keys of element
      return _(element).keys().includes(prop);

    }

  };

  // ------------------------- Boolean Checking Methods ------------------

  ['isElement', 'isArray', 'isObject', 'isNumber', 'isString', 'isBoolean', 'isFunction'].forEach(function(method) {
    u[method] = _[method];
  })

  return u;
};

// grabs all extra arguemnts into an array and reverses it
// for each objcect in here:
//  puts all of its keys into an array and for each key
//    adds that key to the initial object with the same value as it has in
//    the current objext
// returns the initial object
_.extend = function(a, ...b) {
  b
    .reverse()
    .forEach(obj => Object.assign(a, obj));
  return a;
},

_.range = function(start, end) {
  if (end) {
    return [...Array(end - start).keys()]
      .map(element => element + start);
  } else {
    return [...Array(start).keys()];
  }
}

// ------------------------- Boolean Checking Methods ------------------

_.isElement = function(obj) {
  return obj instanceof HTMLElement;
}

_.isArray = function(obj) {
  return Array.prototype.isPrototypeOf(obj);
}

_.isObject= function(obj) {
  return typeof obj === 'object' || typeof obj === 'function'  && !Array.prototype.isPrototypeOf(obj);
}

_.isFunction = function(obj) {
  return typeof obj === 'function';
};

['String', 'Number', 'Boolean'].forEach(function(type) {
  _['is' + type] = function(obj) {
    return toString.call(obj) === "[object " + type + "]";
  };
});
