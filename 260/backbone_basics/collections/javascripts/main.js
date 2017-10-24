$(function() {
  var User = Backbone.Model.extend({
    url: "http://jsonplaceholder.typicode.com/users"
  });


  var UserCollection = Backbone.Collection.extend({
    model: User,
    url: "http://jsonplaceholder.typicode.com/users",
    renderAll: function() {
      var template = Handlebars.compile($('#users').text());
      var html = template({users: this.toJSON()})
      if (html) {
        $('main').html(html);
      }

    },
    initialize: function() {
      this.on('sync sort', this.renderAll.bind(this));
    },
    parse: function(e) {
      console.log(e);
      e.forEach(function(modal) {
        var company = modal['company']
        modal['company_name'] = company['name']
        modal['catchPhrase'] = company['catchPhrase']
        modal['company_bs'] = company['bs']
        delete modal.company
      })
      console.log(e);
    }
  })

  var users = new UserCollection();

  users.fetch({
    success: function() {
      console.log(users.toJSON());
    }
  })




});
