// -------------- Non-DOM-Dependent Vars ---------------- //



var currentContact;
var allContacts;



// -------------- Non-DOM-Dependent Vars ---------------- //



$(function() {
  // -------------- Global Vars and Helper Functions ---------------- //
  /*
    the valriables and functions listed here are used by/in more than one object
  */


  var allContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  var view = $('.screen');
  var list = $('.contact-display ul');
  var emptyList = $('#filler');
  var infoDiv = $('#info');
  var noResultsBanner = $('#no-results');
  var search = $('#search');
  var allInputs = $('input');

  function resetResults() {
    // this clears the DOM of any alterations the Search Manager might have made
    noResultsBanner.addClass('hidden');
    search.val('');
    list.children().removeClass('hidden');
    allInputs.prop('checked', false);
    updateScreenHeight();
  }

  function updateScreenHeight() {
    /*
    Because I didn't use routing (and becasuse the alternating contact-containing and contact editing divs are displayed absoloutely) the height of the page bottom often needs updating manually
    */
    view.css('height', infoDiv.height());
  }



  // -------------- Global Vars and Helper Functions ---------------- //
  // ------------------------------- Search Manager ---------------- //
    /*
    Has Access to:
      - the search bar element
      - the search-related tag checkboxes
      - the array listing all the contact objects

    Makes Alterations To:
      - the individual list items in the contacts list
      - the noResultsBanner

    Basic Structure:
      - Listens for user interactions with the search elements
      - If it hears anything:
        - it checks whether the search values are at their default state
          - if so, it returns the contacts display to it's normal stats
          - otherwise it hides all elements that don't match the search
            - if there are no matches it displays a the NoResultsBanner
          - it then adjusts the height of the view-field

    */


  var searchManager = {
    possibleTags: $('.search-wrapper input'),
    tags : [],
    indices: [],
    searchListener: function() {
      search.on('keyup', this.checkValue.bind(this))
    },

    tagListener: function() {
      this.possibleTags.on('change', this.checkValue.bind(this));
    },

    checkValue : function(e) {
      // performs a search IF the search query isn't blank
      this.getTags();
      if (search.val() || this.tags.length > 0) {
        this.getMatches(e);
      } else {
        // otherwise we clear all search-related DOM alterations
        resetResults();
      }
    },

    getMatches: function(e) {
      this.indices = [];
      allContacts.forEach(this.checkIfMatching.bind(this));

      if (this.indices.length > 0) {
        this.hideNonMatches(this.indices);
      } else {
        this.displayFailureMessage();
      }

      updateScreenHeight();
      this.tags = [];
    },

    getTags: function() {
      // updates tags to represent the current search query
      this.tags = $('.search-wrapper :checked').map(function() {
         return $(this).val();
      }).toArray();
    },

    matchesTags: function(object, tags) {
      // booolean indicating iff the object has all the tags specified
      return tags.every(function(tag) {
        return object.tags.includes(tag);
      })
    },

    checkIfMatching: function(object, index) {
      // records all the indicies of elements that match the search
      if (object.name.includes(search.val()) &&
            this.matchesTags(object, this.tags)) {
        this.indices.push(index);
      }
    },

    displayFailureMessage: function() {
      // displays the appropriate no-results-found message
      list.children().addClass('hidden');
      noResultsBanner.removeClass('hidden');
      if (search.val()) {
        noResultsBanner
          .find('#match')
          .html(` containing <span id="query">${search.val()}<span>`);
      }
      noResultsBanner
        .find('#tags')
        .text(this.tags.join('/'))
    },

    hideNonMatches: function(indexArray) {
      // hides the banner and all contact elements, then makes the matches visible
      noResultsBanner.addClass('hidden');
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



  // ------------------------------- Search Manager ---------------- //
  // ------------------------ General Display Manager ------------------ //
    /*
    Has Access to:
      - all the 'swapper' elements (edit, add contact and cancel buttons)

    Makes Alterations To:
      - the screen element
      - contact list (itself, not it's elements)
      - the filler element (when there are no contacts)
      - the form element

      - also clears all Search Manager effects

    Basic Structure:
      - Listens for user interactions with any of the 'swapper' elements
      - If it hears anything:
        - swaps the current slides and adjusts the height of the screen accordingly
        - also resets Search manager efefcts

    */


  var generalDisplayManager = {
    // keeps track of which slide is currely hidden and which is visible
    currentSlide: $('#info'),
    hiddenSlide: $('#form'),

    addListener: function() {
      $(document.body).on('click', '.swapper', this.swap.bind(this))
    },

    addContact: function() {
      // additionally hides the empty list banner whenever a new contact is
      // added
      emptyList.addClass('hidden');
      this.swap();
    },

    swap: function(e) {
      // swaps the z index of both slides, slides the lower one up,
      // teleports the higher one down, and
      // swaps the variables (current/hidden) around (in that order)
      if (e) {
        // no other object is listening for clicks on the edit buttons so
        // when one is pressed, the generalDisplayManager records it
        // for later use
        e.preventDefault()
        currentContact = $(e.target);
      }

      var currentHeight = 530; // deafult height for the form object

      if (this.hiddenSlide.attr('id') === 'info') {
        // un-hide the list and re-adjust the height BEFORE animation begins, if
        // the list is the slide about to be rolled in
        list.removeClass('hidden');
        currentHeight = infoDiv.height();
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
      // teleports the previously-visible slide to below the current one
      // swaps the slide varsiables around
      // and clears all search effects (in case there were any)
      if (this.hiddenSlide.attr('id') === 'form') {
        // hides the contact-list AFTER animation if the slide now visible is
        // the form list (so the page can be smaller)
        list.addClass('hidden');
      }

      this.currentSlide.css({'top': infoDiv.height() });
      this.swapVars();
      resetResults();
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



  // ---------------------------- General Display Manager -------------- //
  // ----------------------------- Contact Display Manager ---------------- //
    /*
    Has Access to:

    Makes Alterations To:
      - the list of contacts
      - the empty list filler element

    Basic Structure:
      - waits for orders from the contact manager, like:
        - formatting conatct objects into DOM elements and
           - adding them to the list
           - replaceing existing elements on the list
        - removing contact elements from the list and (possibly) un-hiding the filler element
        - adding a whole bunch of contact objects at once
    */


  var ContactDisplayManager = {
    template: Handlebars.compile($('#contact-template').text()),
    renderObject: function(contact, index) {
      var formattedContact = this.template(contact);
      if (index || index === 0) {
        list.children().eq(index).replaceWith(formattedContact);
      } else {
        list.append(formattedContact);
      }
    },

    renderAll: function(array) {
      var displayNextContact = this.renderObject.bind(this);
      array.forEach(function(element) {
        displayNextContact(element);
      });
      emptyList.addClass('hidden');
    },

    deleteAt: function(index) {
      // removes the contact element using indexing and updates screen height
      list.children().eq(index).remove();
      view.css('height', infoDiv.height());
    },

    deleteLast: function() {
      // if the last element is being deleted we need to re-display the
      // empty list message and update the hight accordingly
      list.empty();
      emptyList.removeClass('hidden');
      view.css('height', infoDiv.height());
    },

    init: function() {
      return this;
    }
  }



  // ----------------------------- Contact Display Manager ---------------- //
  // ----------------------------- Contact Manager ------------------- //
    /*
    Has Access to:
    - the delete buttons
    - the page window
    - the array listing all the contact objects

    Makes Alterations To:
    - the array listing all the contact objects

    Basic Structure:
      - waits for orders from input Manager
        - converts input-data into objects and passes those objects to the contact manager for foprmattign and rendering
      - listns to the delet buttons:
        - on trogger deletes the appropriate object and asks the contact display maneger to update the DOM
      - listens for page reloads:
        - on trogger stores all current objects in localstorage
    */


  var ContactManager = {
    addContact: function(array) {
      var contact = this.makeNewObject(array);
      allContacts.push(contact);
      this.displayContact(contact);
    },

    updateContact: function(array, index) {
      var contact = this.makeNewObject(array);
      allContacts[index] = contact;
      this.displayContact(contact, index);
    },

    makeNewObject: function(array) {
      return {
        name: array[0],
        email: array[1],
        phone: array[2],
        tags: array[3].join(', ') || 'No Tags'
      };
    },

    displayContact: function(contact, index) {
      this.contactDisplayManager.renderObject(contact, index);
    },

    displayAllContacts: function() {
      this.contactDisplayManager.renderAll(allContacts);
    },

    deleteListener: function() {
      list.on('click', '.delete', this.deleteEntry.bind(this));
    },

    deleteEntry: function(e) {
      // works out the index of the delet button and deletes that contact from
      // the list
      // also checks if it was the last contact, in which case a different
      // command is sent to the Contact Display Manager
      e.preventDefault();
      if (confirm('Are you sure you want to delete this contact?')) {
        var contactIndex = $(e.target).parent().index();
        allContacts.splice(contactIndex, 1);
        if (allContacts.length <= 0) {
          this.contactDisplayManager.deleteLast();
        } else {
          this.contactDisplayManager.deleteAt(contactIndex);
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
      this.contactDisplayManager = Object.create(ContactDisplayManager).init();
      // if a Contact Manager object is intialized (which happens on page load)
      // and allContacts contains entries, then these have to be rendered to
      // the DOM immidiately
      if (allContacts.length > 0) {
        this.displayAllContacts();
      }

      this.deleteListener();
      this.reloadListener();
      return this;
    }
  }



  // ----------------------------- Contact Manager ------------------- //
  // ------------------------------- Input Manager ---------------- //
    /*
    Has Access to:
    - the contact editing/creation form

    Makes Alterations To:
    - the contact editing/creation form

    Basic Structure:
      - listens for form submits
        - verifies that the submissions have enough values
          - if not, warns the user which values were not submitted
        - sends these submissions on to the Contact Manager
    */


  var inputManager = {
    form: $('.contact'),
    textValues: [],

    newContactListener: function() {
      this.form.on('submit', this.parseInput.bind(this));
    },

    parseInput: function(e) {
      e.preventDefault();
      var inputs = $('#form input.text').toArray();
      this.textValues = [];
      inputs.forEach(this.parseValue.bind(this));
      if (this.textValues.length === 3) {
        // if all three values were valid, we want to pass them on to the
        // contact manager along with any tags
        var tags = [];
        $('#form input.checkbox:checked').each(function() {
          tags.push($(this).val());
        });

        this.textValues.push(tags);
        this.makeNewContact();
      }
    },

    parseValue: function(element) {
      // for each input we want to push its value to textValues
      // if the value is empty we want to notify the user
      var current = $(element)
      if (current.val()) {
        this.textValues.push(current.val())
        if (current.parent().hasClass('incorrect')) {
          // stop displaying the incorrect state if the value is now correct
          // which means next attempted submission will look normal
          this.removeIncorrect(current);
        }
      } else {
        this.displayIncorrect(current);
      }
    },

    makeNewContact: function() {
      // currentContact will be undefined unless the current form summission
      // was a contact update.
      if (currentContact.hasClass('edit')) {
        var contactIndex = currentContact.parent().index();
        this.contactManager.updateContact(this.textValues, contactIndex);
        currentContact = $(document);
      } else {
        this.contactManager.addContact(this.textValues);
        generalDisplayManager.addContact();
      }
    },

    displayIncorrect: function(current) {
      // uses the html to make the currnet input look incorrect
      current.parent().addClass('incorrect');
      current.parent().prev().addClass('incorrect');
    },

    removeIncorrect: function(current) {
      // resets html to make the currnet input look normal
      current.parent().removeClass('incorrect');
      current.parent().prev().removeClass('incorrect');
    },

    init: function() {
      this.newContactListener();
      this.contactManager = Object.create(ContactManager).init();
    }
  }


  // ------------------------------- Input Manager ---------------- //
  // ------------------------------- Execution Code ---------------- //



  searchManager.init();
  generalDisplayManager.init();
  inputManager.init();

  $('#form').css('top', infoDiv.height());
  view.animate({
    height: infoDiv.height()
  }, 800);



  // ------------------------------- Execution Code ---------------- //
});
