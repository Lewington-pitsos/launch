$(function() {
  // ----------------------------- Modal Display Manager -------------------//



  var modalDisplayManager = {
    $modalParent: $('.activater'),
    $modalBringer: $('.modal-bringer'),
    $modalBanisher: $('.dimmer'),
    $allInputs: $('input'),
    $descriptionText: $('#description'),
    $dateInputs: $('select'),

    modalListener: function() {
      this.$modalBringer.on('click', this.showModal.bind(this));
    },

    showModal: function() {
      this.$modalParent.css('display', 'block');
      this.$modalBanisher.on('click', this.hideModal.bind(this));
    },

    hideModal: function() {
      // cosmetically hided the modal and resets all the modals input values to blank
      this.$modalParent.css('display', 'none');
      this.$modalBanisher.unbind('click');

      this.$allInputs.val('');
      this.$dateInputs.val('');
      this.$descriptionText.val('');
    },

    renderModal: function(todo) {
      $title.val(todo.title)
      $day.val(todo.day || '');
      $month.val(toDoubleDigits(todo.month));
      $year.val(todo.year || '');
      $description.val(todo.desc)
      this.showModal();
    },

    init: function() {
      this.modalListener();
      return this;
    }
  }



  // ----------------------------- Modal Display Manager -------------------//
  // ----------------------------- Modal Input Manager-------------------//
  /*
  structure:
    - listens for form inputs
    - formatts the submitted data into an array, adding defaults where no input
      was provided
    - sends this array off to the Todos Manager and requests the
      modalDisplayManager to close the modal
  */



  var inputManager = {
    $modalSubmits: $('.form-buttons a'),
    addformListener: function() {
      this.$modalSubmits.on('click', this.processInput.bind(this));
    },

    processInput: function(e) {
      var visibleDate = this.processDate()
      var todo = {
        title: $title.val(),
        desc: $description.val(),
        day: Number($day.val()),
        month: Number($month.val()),
        year: Number($year.val()),
        date: visibleDate,
        complete: e.target.getAttribute('id') === 'complete'
      }
      todosManager.processTodo(todo)
      modalDisplayManager.hideModal();
    },

    processDate: function() {
      var month = $month.val();
      var year = $year.val();
      // the visible date is stored as a number for easier sorting
      // later we can turn it into a string
      return (month && year) ? Number( year + month) : 0;
    },

    init: function() {
      this.addformListener();
      return this;
    }
  }



  // ----------------------------- Modal Input Manager-------------------//
  // ----------------------------- Id Tracker ---------------------//
  /*
  USED AS PART OF TODOS MANAGER
  structure:
  - contains an object for storing ids associated with dates
    - adds new entries by associating each incoming date with an empty array, to which it adds all ids associated with that date
    - deletes elements based on date and id
    - can also return the number of entries for agiven date
  */


  var IdTracker = {
    addId: function(date, id) {
      if (this.allIds[date]) {
        this.allIds[date].push(id);
      } else {
        this.allIds[date] = [id];
      }
    },

    deleteId: function(date, id) {
      var idArray = this.allIds[date]
      if (idArray && idArray.includes(id)) {
        idArray.splice(idArray.indexOf(id), 1);
      }
    },

    getNumber: function(date) {
      return this.allIds[date].length;
    },

    getIndex: function(date) {
      var sortedDates = Object.keys(this.allIds).sort();
      console.log(sortedDates);
      return sortedDates.indexOf(date);
    },

    init: function() {
      this.allIds = {};
      //this.allDates = []; // a sorted array of dates
      return this;
    }
  }



  // ----------------------------- Id Tracker ---------------------//
  // ----------------------------- Todos Manager ---------------------//
  /*
  structure:
    - keeps track of all todos objects by;
      - associating each with a unique ID in an AllTodos object
      - creating two objects representing complete and incomplete todos
      - associating each id with a date key within one of these two objects
    - Also orders stored todos to be displayed though the List Manager and Nav
      Manager
    - saves the state of all current todos to localStorage on page-reload
  */

  var todosManager = {
    completed: Object.create(IdTracker).init(),
    incomplete: Object.create(IdTracker).init(),
    allTodos: {},
    currentId: 0,
    toUpdate: false,
    updateId: false,

    processTodo: function(todo, update) {
      if (this.toUpdate) {
        this.updateTodo(todo);
      } else {
        this.addTodo(todo);
      }
    },

    addTodo: function(todo) {
      // adds the todo to Alltodos, giving it a unique id, then adds that id to the appropriate idtracker object. Then prompts List and nav managers to make cosmetic changes
      this.allTodos[this.currentId] = todo;
      var currentIndex;
      if (todo.complete) {
        this.completed.addId(todo.date, this.currentId);
        currentIndex = this.completed.getIndex(todo.date)
      } else {
        this.incomplete.addId(todo.date, this.currentId);
        currentIndex = this.incomplete.getIndex(todo.date)
      }

      this.addToDisplay(todo.date, todo.complete, todo.title, currentIndex, this.currentId);
      this.currentId++;
    },

    updateTodo: function(info) {
      console.log(this.toUpdate);
      var releventId = this.updateId;
      var currentIndex;
      if (this.toUpdate.complete !== info.complete) {
        if (this.toUpdate.complete) {
          currentIndex = this.completed.getIndex(this.toUpdate.date);
          this.switchCompletion(this.completed, this.incomplete, this.toUpdate.date, info.date, releventId);
        } else {
          currentIndex = this.incomplete.getIndex(this.toUpdate.date);
          this.switchCompletion(this.incomplete, this.completed, this.toUpdate.date, info.date, releventId);
        }
      }

      this.deleteTodo(releventId);
      this.allTodos[releventId] = info;
      this.addToDisplay(info.date, info.complete, info.title, currentIndex, releventId);
      this.toUpdate = false;
      this.updateId = false;
      // super important to reset this or else we will always update and never add new todos
    },

    switchCompletion: function(oldCompletion, newCompletion, date, newDate, id) {
      oldCompletion.deleteId(date, id);
      newCompletion.addId(newDate, id);
    },

    addToDisplay: function(date, complete, title, currentIndex, id) {
      var formattedDate = toDateString(date);
      navManager.addNew(formattedDate, currentIndex);
      listManager.addNew(id, formattedDate, title, complete);
    },

    deleteTodo: function(id) {
      var date = this.allTodos[id].date
      var complete = this.allTodos[id].complete
      delete this.allTodos[id];

      if (complete) {
        this.completed.deleteId(date, id);
      } else {
        this.incomplete.deleteId(date, id);
      }

      this.displayDeletion(date, id, complete);
    },

    displayDeletion: function(date, id, complete) {
      var formattedDate = toDateString(date);
      navManager.deleteAt(date, complete);
      listManager.deleteAt(id, complete);
    },

    createNewModal: function(id) {
      // sets an update todo (the next todo to get updated when toUpdate is next called. Reset every time an update modal is created)
      this.toUpdate = this.allTodos[id];
      this.updateId = id;
      modalDisplayManager.renderModal(this.toUpdate);
    }
  }



  // ----------------------------- Todos Manager ---------------------//
  // ----------------------------- Navigaton Manager -------------------//
  /*
  structure:
    - tracks the currently active Nav
    - applies cosmetic changes to the Navigation section
    - re-displays the list according to which list is currently active
  */



  var navManager = {
    $navigator: $('nav'),
    $incomplete: $('.remaining'),
    $complete: $('.completed'),
    makeNewList: Handlebars.compile($('#nav-list-template').html()),
    addListListener: function() {
      $(this.$navigator).on('click', this.switchFocus.bind(this));
    },

    switchFocus: function(e) {
      $('nav li').removeClass('active');
      $(e.target)
        .closest('li')
        .addClass('active');
    },

    addNew: function(date, index) {
      var $sameDate = this.$incomplete.find(`[name="${date}"]`);
      if ($sameDate.length) {
        this.updateDate($sameDate);
      } else {
        this.addNewDate(date, index, this.$incomplete);
      }

      this.updateDate(this.$incomplete.find('.title'))
    },

    updateDate: function(element, subtract) {
      var $numberContainer = element.find('span');
      var currentNum = Number($numberContainer.text());
      if (subtract) {
        $numberContainer.text(currentNum - 1);
      } else {
        $numberContainer.text(currentNum + 1);
      }
    },

    addNewDate: function(date, index, list) {
      // adds the appropriate element to the right index in the list
      //  if the list is empty, it just appends the element
      //  Same goes if the index is higher than the last list element's index
      var element = this.makeNewList({date: date, count: 1});
      if (index === -1) { // only true if there are no entries in the current
                          // list
        list.append(element);
      } else {
        var nextElement = list.find('li:not(.title)').eq(index);
        if (nextElement.length) {
          nextElement.before(element);
        } else {
          list.append(element);
        }
      }
    },

    deleteAt: function(date, complete) {
      var formattedDate = toDateString(date);
      if (complete) {
        this.removeFrom(this.$complete, formattedDate)
      }

      this.removeFrom(this.$incomplete, formattedDate)
    },

    removeFrom: function(list, date) {
      var currentElement = list.find(`[name="${date}"]`);
      if (currentElement.find('.count').text() === "1") {
        currentElement.remove();
      }
      this.updateDate(currentElement, true);
      this.updateDate(list.find('.title'), true);
    },

    findList: function(complete) {
      return complete ? this.$complete : this.$incomplete;
    },

    init: function() {
      this.addListListener();
      return this;
    }
  }



  // ----------------------------- Navigaton Manager -------------------//
  // ----------------------------- List Manager -------------------//
  /*
  structure:
    - displays the list depending on the current state of stored todos
    - stores a reference to the list-element template
    Behaviour:
      - adds a new todo element to the list in the proper position
      - reads the currnt state of all todos and generates a new list in proper order
      - removes and updates specific todos
        - switches a todo element from the completed to the incomplete section of the list if need be
  */

  var listManager = {
    makeTodo: Handlebars.compile($('#todo-template').html()),
    lastIncompleteIndex: -1, // index where the first complete element is or will be inserted
    addNew: function(id, date, title, complete) {
      var context = {
        id: id,
        date: date,
        title: title,
        complete: complete
      }

      var todoElement = this.makeTodo(context);
      if (!complete && this.lastIncompleteIndex > -1) {
        $todoTable.find('tr').eq(this.lastIncompleteIndex).after(todoElement);
      } else {
        $todoTable.append(todoElement);
      }

      if (!complete) {
        this.lastIncompleteIndex++;
      }

    },

    deleteAt: function(id, complete) {
      if (!complete) {
        this.lastIncompleteIndex--;
      }

      var toDelete = $(`#${id}`);
      toDelete.remove();
    },

    init: function() {
      return this;
    }
  }



  // ----------------------------- List Manager -------------------//
  // ----------------------------- List Listener  -------------------//
  /*
  structure:
    - listens for event-triggers on the todo list objects and notifies the appropriate manager
      - deletion >>> todos manager
      - update calls >>> modalDisplayManager
      - completion >>> Todos Manager
    -
  */


  var listListener = {

    addListListener: function() {
      $todoTable.on('click', this.processRequest.bind(this));
    },

    processRequest: function(e) {
      var target = $(e.target);
      if (target.hasClass('content')) {
      } else if (target.closest('td').hasClass('bin')) {
        todosManager.deleteTodo(target.closest('tr').attr('id'));
      } else if (target.hasClass('modal-bringer')) {
        todosManager.createNewModal(target.closest('tr').attr('id'));
      }
    },

    init: function() {
      this.addListListener();
      return this;
    }
  }



  // ----------------------------- List Listener  -------------------//
  // ----------------------------- Helper Functions -------------------//



  function toDateString(date) {
    // expects a Number primitive ad splits it into a month/year string
    // if the Number is 0 (only possible if there is no valid date)
    // returns the invalid date message
    if (date > 0) {
      return String(date)
        .match(/.{2}/g)
        .reverse()
        .join('/');
    } else {
      return 'No Due Date'
    }
  }

  function toDoubleDigits(num) {
    // for converting select values to double digits (00 is never useful)
    if (num) {
      return ("0" + num).slice(-2);
    } else {
      return '';
    }
  }



  // ----------------------------- Helper Functions -------------------//
  // ----------------------------- Global Variables  -------------------//



  var $todoTable = $('table');

  var $title = $('#title'); // Input + Modal Display Managers
  var $day = $('#day');
  var $month = $('#month_start');
  var $year = $('#year_start');
  var $description = $('#description');



  // ----------------------------- Global Variables  -------------------//

  listListener.init();
  listManager.init();
  inputManager.init();
  navManager.init();
  modalDisplayManager.init();
})
