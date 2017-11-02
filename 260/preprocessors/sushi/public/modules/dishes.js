var fs = require('fs');
var path = require('path');
var dataPath = path.resolve(path.dirname(__dirname), 'data/cart.json');

module.exports = {
  __readFile: function() {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  },

  get: function() {
    return this.__readFile().data;
  },

  set: function(data) {
    data.id = this.getLastId() + 1;
    fs.writeFileSync(dataPath, JSON.stringify({
      last_id: data.id,
      data: data.data
    }), 'UTF8');
  },

  getLastId: function() {
    return this.__readFile().last_id;
  }
}
