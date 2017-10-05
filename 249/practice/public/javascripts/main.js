var currentContact;
var allContacts = [];

$(function() {
  var allContacts = JSON.parse(localStorage.getItem('contacts'));
  var curtain = $('.curtain');
  var view = $('.screen');
  var list = $('.contact-display ul');
  var emptyList = $('#filler');
  var infoDiv = $('#info');
  var noResultsBanner = $('#no-results');
  var search = $('#search');
  var allInputs = $('input');

  function resetResults() {
    noResultsBanner.addClass('hidden');
    search.val('');
    list.children().removeClass('hidden');
    list.removeClass('hidden');
    allInputs.prop('checked', false);
    updateScreenHeight();
  }

  function updateScreenHeight() {
    view.css('height', infoDiv.height());
  }

  var DisplayManager = {
    // in charge of impliemting all the handlebars necessary to convert a
    // contacts object into a bunch of DOM elements and appending them to the
    // contact list
    template: Handlebars.compile($('#contact-template').text()),
    display: function(contact, index) {
      list.css('margin-bottom', '80px')
      var formattedContact = this.template(contact);
      if (index || index === 0) {
        list.children().eq(index).replaceWith(formattedContact);
      } else {
        list.append(formattedContact);
      }
    },

    displayAll: function(array) {
      var displayNextContact = this.display.bind(this);
      array.forEach(function(element) {
        displayNextContact(element);
      });
      emptyList.addClass('hidden');
    },

    deleteAt: function(index) {
      list.children().eq(index).remove();
      view.css('height', infoDiv.height());
    },

    deleteLast: function(index) {
      list.css('margin-bottom', '0')
      list.children().eq(index).remove();
      view.css('height', 300);
      emptyList.removeClass('hidden');
    },

    init: function() {
      return this;
    }
  }

  var ContactManager = {
    addContact: function(array, index) {
      // creates a contact object from the array
      // pushes the contact the contacts array and triggers displayManager
      // for that contact
      var contact = {
        name: array[0],
        email: array[1],
        phone: array[2],
        tags: array[3].join(', ') || 'No Tags'
      };
      if (index || index === 0) {
        allContacts[index] = contact;
        this.displayContact(contact, index);
      } else {
        allContacts.push(contact);
        this.displayContact(contact);
      }

    },

    displayContact: function(contact, index) {
      this.displayManager.display(contact, index);
    },

    displayAllContacts: function() {
      this.displayManager.displayAll(allContacts);
    },

    deleteListener: function() {
      list.on('click', '.delete', this.deleteEntry.bind(this));
    },

    deleteEntry: function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to delete this contact?')) {
        var contactIndex = $(e.target).parent().index();
        allContacts.splice(contactIndex, 1);
        if (allContacts.length <= 0) {
          this.displayManager.deleteLast(contactIndex);
        } else {
          this.displayManager.deleteAt(contactIndex);
        }
      }
    },

    reloadListener: function() {
      $(window).on('unload', this.saveContacts.bind(this));
    },

    saveContacts: function() {
      // saves all of the current contact objects as a JSON string to
      // localstorage
      localStorage.setItem('contacts', JSON.stringify(allContacts));

    },

    init: function() {
      this.displayManager = Object.create(DisplayManager).init();
      if (allContacts.length > 0) {
        this.displayAllContacts();
      }

      this.deleteListener();
      this.reloadListener();
      return this;
    }
  }

  var display = {
    // keeps track of which slide is currely hidden and which is visible
    currentSlide: $('#info'),
    hiddenSlide: $('#form'),
    list: $('.contact-display ul'),

    // event listener for clicks on either of the add contact buttons
    addListener: function() {
      $(document.body).on('click', '.swapper', this.swap.bind(this))
    },

    addContact: function() {
      emptyList.hasClass('hidden') ?
                                   null :
       emptyList.addClass('hidden');
      this.swap();
    },

    swap: function(e) {
      // swaps the z index of both slides, slides the lower one up,
      // teleports the higher one down
      // and swaps the variables around (in that order)
      if (e) {
        e.preventDefault()
        currentContact = $(e.target);
      }

      var currentHeight = 530;

      if (this.hiddenSlide.attr('id') === 'info') {
        list.removeClass('hidden');
        currentHeight = infoDiv.height();
        curtain.removeClass('hidden');
        //view.css('height', this.list.height() + 150);
      }


      this.hiddenSlide.css('z-index', '999');
      this.currentSlide.css('z-index', '1');

      this.hiddenSlide.animate({
        top: '0'
      }, 500, this.reset.bind(this));

      view.animate({
        height: currentHeight
      }, {duration: 500, queue: false});
    },

    reset: function() {
      // teleports the passed in slide to the bottom
      // then swaps the slides around
      // also resets the search so that no search is occuring.
      resetResults();
      var height = infoDiv.height();
      if (this.hiddenSlide.attr('id') === 'form') {
        this.list.addClass('hidden');
        curtain.addClass('hidden');
        //view.css('height', '400px')
      }


      this.currentSlide.css({'top': height });
      this.swapVars.call(this);
    },

    swapVars: function() {
      // swaps which slide is recorded as the current sldie and which is
      // recorded as hidden
      this.hiddenSlide = [
        this.currentSlide,
        this.currentSlide = this.hiddenSlide][0];
    },

    init: function() {
      this.addListener();
    },
  }

  var inputManager = {
    // stores the the element that displays them and the contact submission form
    form: $('.contact'),
    // we can't store static references to the form inputs, they keep changing

    newContactListener: function() {
      var im = this;
      this.form.on('submit', function(e) {
        // first we grab all the inputs for the relevent form
        e.preventDefault();

        var inputs = $('#form input.text');
        // then we create an empty array and test each input for validity
        var textValues = [];
        inputs.each(function() {
          // for each input we want to push its value to textValues
          // if the value is empty or incorrect we want to notify the user
          var current = $(this)
          if (current.val()) {
            textValues.push(current.val())
            if (current.hasClass('incorrect')) {
              // stop displaying the incorrect state if the value is now correct
              // which means next attempted submission will look normal
              im.removeIncorrect(current);
            }
          } else {
            im.displayIncorrect(current);
          }
        })

        if (textValues.length === 3) {
          // if all three values were valid, we want to pass them on to the
          // contact manager
          var tags = [];
          $('#form input.checkbox:checked').each(function() {
            tags.push($(this).val());
          });
          textValues.push(tags);
          if (currentContact.hasClass('edit')) {
            var contactIndex = currentContact.parent().index();
            im.contactManager.addContact(textValues, contactIndex);
            currentContact = $(document);
            display.addContact();
          } else {
            im.contactManager.addContact(textValues);
            display.addContact();
          }
        }
      });
    },

    displayIncorrect: function(current) {
      // uses the html to make the currnet input look incorrect
      current.addClass('incorrect');
      current.parent().prev().addClass('incorrect');
      current.parent().nextAll('.warning').eq(0).addClass('incorrect');
    },

    removeIncorrect: function(current) {
      // resets html to make the currnet input look normal
      current.removeClass('incorrect');
      current.parent().prev().removeClass('incorrect');
      current.parent().nextAll('.warning').eq(0).removeClass('incorrect');
    },

    init: function() {
      this.newContactListener();
      this.contactManager = Object.create(ContactManager).init();
    }
  }

  var searchManager = {
    search: $('#search'),
    possibleTags: $('.search-wrapper input'),
    tags : [],
    indices: [],
    searchListener: function() {
      this.search.on('keyup', this.checkValue.bind(this))
    },

    tagListener: function() {
      this.possibleTags.on('change', this.checkValue.bind(this));
    },

    checkValue : function(e) {
      // first re-displays the list (in case it was hidden), then performs a
      // search IF the seawrch value isn't blank
      this.getTags();
      list.removeClass('hidden');
      if (search.val() || this.tags.length > 0) {
        this.getMatches(e);
      } else {
        // otherwise the search is reset
        resetResults();
      }
    },

    getMatches: function(e) {
      noResultsBanner.addClass('hidden');
      this.indices = [];
      allContacts.forEach(this.validElements.bind(this));

      if (this.indices.length > 0) {
        this.hideNonMatches(this.indices);
      } else {
        list.addClass('hidden');
        list.children().addClass('hidden');
        noResultsBanner.removeClass('hidden');
        if (this.search.val()) {
          noResultsBanner.find('#match').html(' containing <span id="query">' + this.search.val() + '<span>');
        }
        noResultsBanner.find('#tags').text(this.tags.join('/'))
      }

      updateScreenHeight();
      this.tags = [];
    },

    getTags: function() {
      var activeTags = []
      $('.search-wrapper :checked').each(function() {
        activeTags.push($(this).val());
      });
      this.tags = activeTags;
    },

    matchesTags: function(object, tags) {
      return tags.every(function(tag) {
        return object.tags.includes(tag);
      })
    },

    validElements: function(object, index) {
      if (object.name.includes(this.search.val()) &&
            this.matchesTags(object, this.tags)) {
        this.indices.push(index);
      }
    },

    hideNonMatches: function(indexArray) {
      list.children().addClass('hidden');
      indexArray.forEach(function(index) {
        list.children().eq(index).removeClass('hidden');
      })
    },

    init: function() {
      this.searchListener();
      this.tagListener();
      return this;
    }
  }

  searchManager.init();
  display.init();
  inputManager.init();

  $('#form').css('top', infoDiv.height());
  view.animate({
    height: infoDiv.height()
  }, 800)
});
