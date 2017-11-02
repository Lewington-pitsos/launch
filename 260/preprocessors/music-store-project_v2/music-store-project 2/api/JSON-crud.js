var fs = require('fs');
var _ = require('underscore');

module.exports = {
  JSONFilePath: '',
  tempStore: {},
  read: function read() {
    this.tempStore = JSON.parse(fs.readFileSync(this.JSONFilePath, 'utf8'));
    return this.tempStore;
  },
  getLastId: function getLastId() {
    return this.tempStore.lastId;
  },
  get: function get(id) {
    return _(this.tempStore.data).findWhere({ id: id });
  },
  put: function put(data) {
    var foundData = this.get(data.id);
    if (!foundData) return false;
    Object.assign(foundData, data);
  },
  set: function set(input) {
    var newData = Object.assign({}, input);
    this.tempStore.lastId += 1;
    newData.id = this.tempStore.lastId;
    this.tempStore.data.push(newData);

    return this.tempStore;
  },
  delete: function _delete(id) {
    var idx = _(this.tempStore.data).findIndex({ id: id });
    return _.first(this.tempStore.data.splice(idx, 1));
  },
  record: function record() {
    fs.writeFileSync(this.JSONFilePath, JSON.stringify(this.tempStore), 'utf8');
  },
  init: function init(filePath) {
    this.JSONFilePath = filePath;
    this.read();
    return this;
  }
};
