var bob = {
  name: 'bob',
  colours: ['red', 'green', 'blue']
}

var larry = {
  name: 'bobkkk',
  colours: ['red', 'indigo', 'blue']
}

var david = {
  name: 'bdavid',
  colours: ['white', 'green', 'blue']
}

var AppView = Backbone.View.extend({
  el: 'body',
  events: {
    'click #add-person': 'renderNewPerson',
    'submit form': 'addPerson',
    'click #obscure': 'unObscure'
  },
  personTemplate: Handlebars.templates.new_person,
  template: Handlebars.compile($('#innitial-template').text()),
  render: function() {
    this.$el.html(this.template);
  },
  renderNewPerson: function() {
    this.$el.append(this.personTemplate)
  },
  addPerson: function(e) {
    e.preventDefault();
    var person = {};
    person['name'] = $('input[name="name"]').val();
    var array = [];
    array.push($('input[name="colour1"]').val());
    array.push($('input[name="colour2"]').val());
    array.push($('input[name="colour3"]').val());
    person['colours'] = array;
    app.list.add(person);
    console.log(app.list);
    $('#obscure')[0].remove();
  },
  unObscure: function(e) {
    if (e.target === $('#obscure')[0]) {
      $('#obscure')[0].remove();
    }
  }
})

var app = {
  list: new List([bob, larry, david]),
  init: function() {
    var appView = new AppView();
    appView.render()
    var listView = new ListView({collection: this.list});
    listView.render();

  }
}

app.init();
