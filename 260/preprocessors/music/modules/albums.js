var fs = require('fs');
var path = require('path');
var albumsPath = path.resolve(path.dirname(__dirname), 'data/albums.json');

module.exports = {
  __readFile: function() {
    return JSON.parse(fs.readFileSync(albumsPath, 'utf8'))
  },

  get: function() {
    return this.__readFile().data;
  },

  set: function(data) {
    data.id = this.getLastId() + 1;
    fs.writeFileSync(albumsPath, JSON.stringify({
      last_id: data.id,
      data: data.data
    }), 'UTF8');
  },

  getLastId: function() {
    return this.__readFile().last_id;
  }
}
