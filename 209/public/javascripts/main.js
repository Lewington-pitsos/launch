$(function() {
  // ----------------------------- Modal Display Manager -------------------//



  var modalDisplayManager = {
    $modalParent: $('.activater'),
    $modalBringer: $('.modal-bringer'),
    $modalBanisher: $('.dimmer'),
    $allInputs: $('input'),
    $descriptionText: $('#description'),
    $dateInputs: $('select'),
    $completeMarker: $('#complete'),
    update: false,

    modalListener: function() {
      this.$modalBringer.on('click', this.showModal.bind(this));
    },

    showModal: function() {
      this.$modalParent.css('display', 'block');
      this.$modalParent.animate({opacity: 1}, 500);
      if (this.update) {
        this.$modalBanisher.on('click', this.hideModal.bind(this));
      } else {
        this.$completeMarker.on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          alert('Cannot mark as complete as item has not been created yet!')
        })
      }

    },

    hideModal: function() {
      // firstly stop the modal from automatically acting like there's an update next time
      this.update = false;
      this.$completeMarker.unbind('click');
      // cosmetically hide the modal and resets all the modals input values to blank
      this.$modalParent.animate({opacity: 0}, 500, this.resetDisplay.bind(this));
      this.$modalBanisher.unbind('click');

      this.$allInputs.val('');
      this.$dateInputs.val('');
      this.$descriptionText.val('');
    },

    resetDisplay: function() {
      this.$modalParent.css('display', 'none');
    },

    renderModal: function(todo) {
      $title.val(todo.title)
      $day.val(todo.day || '');
      $month.val(toDoubleDigits(todo.month));
      $year.val(todo.year || '');
      $description.val(todo.desc)
      this.update = true;
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
    $modalSubmits: $('.form-buttons span'),
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
        complete: null,
      }

      todosManager.processTodo(todo, e.target.getAttribute('id') === 'complete')
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
        this.allIds[date] = idArray.filter(currentId => currentId !== id);
        if (this.allIds[date].length <= 0) {
          delete this.allIds[date];
        }
      }
    },

    getNumber: function(date) {
      return this.allIds[date].length;
    },

    getTodo: function(date) {
      return this.allIds[date] || [];
    },

    getIndex: function(date) {
      var sortedDates = Object.keys(this.allIds)
        .map(element => Number(element))
        .sort((a, b) => (a - b));
      return sortedDates.indexOf(date);
    },

    getAllIds: function() {
      var values = Object.values(this.allIds);
      return values.reduce((all, array) => all.concat(array), []);
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

    addData: function(all, incomplete, completed) {
      this.allTodos = all;
      this.incomplete.allIds = incomplete;
      this.completed.allIds = completed;
      this.currentId = (Object.keys(all)
        .map(i => Number(i))
        .reverse()[0] + 1 || 0);
      console.log(this.currentId);
      this.addAllTodos();
    },

    addAllTodos: function() {
      Object.values(this.allTodos)
        .forEach(this.firstUpdate.bind(this));
    },

    firstUpdate: function(todo) {
      var currentIndex;
      if (todo.complete) {
        currentIndex = this.completed.getIndex(todo.date)
      } else {
        currentIndex = this.incomplete.getIndex(todo.date)
      }

      this.addToDisplay(todo.date, todo.complete, todo.title, currentIndex, todo.id, true);
    },

    processTodo: function(todo, completed) {
      this.clearNavEffects();
      if (this.toUpdate) {
        this.updateTodo(todo, completed);
      } else {
        this.addTodo(todo);
      }
    },

    addTodo: function(todo) {
      // adds the todo to Alltodos, giving it a unique id, then adds that id to the appropriate idtracker object. Then prompts List and nav managers to make cosmetic changes
      todo.id = this.currentId;
      this.allTodos[this.currentId] = todo;
      this.incomplete.addId(todo.date, this.currentId);
      var currentIndex;
      if (todo.complete) {
        this.completed.addId(todo.date, this.currentId);
        currentIndex = this.completed.getIndex(todo.date)
      } else {
        currentIndex = this.incomplete.getIndex(todo.date)
      }

      this.addToDisplay(todo.date, todo.complete, todo.title, currentIndex, this.currentId);
      this.currentId++;
    },

    updateTodo: function(info, completed) {
      var id = this.updateId;
      info.complete = completed;

      // update both of the collection objects in ALL circumstances
      this.update(this.incomplete, info.date, this.toUpdate.date, id);
      this.completed.deleteId(this.toUpdate.date, id);
      if (info.complete) {
        this.update(this.completed, info.date, this.toUpdate.date, id);
      }

      // delete both old values/dates in the nav bar if we're moving away from the complete list, otherwise, jsut delete from the incomplete list
      if (completed && completed !== this.toUpdate.complete) {
        navManager.deleteAt(this.toUpdate.date, false);
      } else {
        navManager.deleteAt(this.toUpdate.date, true);
      }


      var formattedDate = toDateString(info.date);
      // add to the top ?????
      var topIndex = this.incomplete.getIndex(info.date);
      navManager.addNew(formattedDate, topIndex, false);

      // add to bottom if we're complete
      if (info.complete) {
        var bottomIndex = this.completed.getIndex(info.date);
        navManager.addNew(formattedDate, bottomIndex, true);
      }

      this.allTodos[id] = info;

      listManager.deleteAt(id, this.toUpdate.complete);
      listManager.addNew(id, formattedDate, info.title, info.complete, true);

      this.toUpdate = false;
      this.updateId = false;
      // super important to reset this or else we will always update and never add new todos
    },

    update: function(object, newDate, oldDate, id) {
      object.deleteId(oldDate, id);
      object.addId(newDate, id);
    },

    switchCompletion: function(oldCompletion, newCompletion, date, newDate, id) {
      if (oldCompletion === newCompletion) {
        oldCompletion.deleteId(date, id);
        newCompletion.addId(newDate, id);
      } else {
        if (oldCompletion === this.complete) {
          oldCompletion.deleteId(date, id);
        } else {
          newCompletion.addId(newDate, id);
        }
      }
    },

    addToDisplay: function(date, complete, title, currentIndex, id, update) {
      var formattedDate = toDateString(date);
      navManager.addNew(formattedDate, currentIndex, complete);
      listManager.addNew(id, formattedDate, title, complete, update);
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
    },

    switchList: function(id) {
      var info = this.allTodos[id];
      this.updateId = id;
      this.toUpdate = info;
      newInfo = Object.assign({}, info);
      this.updateTodo(newInfo, !info.complete);
    },
    /*
    recategorize: function(id) {
      var todo = this.allTodos[id];

      var newComplete = (!todo.complete ? this.completed : this.incomplete);
      var oldComplete = (todo.complete ? this.completed : this.incomplete);

      this.switchCompletion(oldComplete, newComplete, todo.date, todo.date, id);

      var index = newComplete.getIndex(todo.date);
      if (todo.complete) {
        this.displayDeletion(todo.date, id, todo.complete);
      } else {
        listManager.deleteAt(id, todo.complete);
      }

      todo.complete = !(todo.complete);
      this.addToDisplay(todo.date, todo.complete, todo.title, index, id, true);
    },

    updateCompletion: function(oldComplete, oldDate, newDate, id) {
      var currentIndex;
      if (oldComplete) {
        currentIndex = this.completed.getIndex(oldDate);
        this.switchCompletion(this.completed, this.incomplete, oldDate, newDate, id);
      } else {
        currentIndex = this.incomplete.getIndex(oldDate);
        this.switchCompletion(this.incomplete, this.completed, oldDate, newDate, id);
      }

      return currentIndex;
    },
    */
    reMakeList: function(list, date) {
      if (!date) {
        this.displayAllIn(list);
      } else {
        var formattedDate = toDateNumber(date);
        var toRender = [];
        if (list === 'remaining') {
          this.incomplete
            .getTodo(formattedDate)
            .forEach(todo => toRender.push(todo));
        } else {
          this.completed
            .getTodo(formattedDate)
            .forEach(todo => toRender.push(todo));
        }


        listManager.hideAll(toRender, date, list === 'completed');
      }
    },

    displayAllIn: function(listName) {
      if (listName === 'remaining') {
        this.clearNavEffects();
      } else {
        var completedTodos = this.completed.getAllIds();
        console.log(completedTodos);
        listManager.hideAll(completedTodos, null, true);
      }
    },

    clearNavEffects: function() {
      navListener.resetNav();
      listManager.showAll();
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
    $incomplete: $('.remaining'),
    $completed: $('.completed'),
    makeNewList: Handlebars.compile($('#nav-list-template').html()),

    addNew: function(date, index, complete) {
      if (complete) {
        this.addToList(date, index, this.$completed);
      } else {
        this.addToList(date, index, this.$incomplete);
      }
    },

    addToList: function(date, index, $list) {
      var $sameDate = $list.find(`[name="${date}"]`);
      if ($sameDate.length) {
        this.updateDate($sameDate);
      } else {
        this.addNewDate(date, index, $list);
      }

      this.updateDate($list.find('.title'))
    },

    updateDate: function(element, subtract) {
      var $numberContainer = element.find('span');
      var currentNum = Number($numberContainer.text());
      if (subtract) {
        $numberContainer.text(Math.max((currentNum - 1), 0));
      } else {
        $numberContainer.text(currentNum + 1);
      }
    },

    addNewDate: function(date, index, list) {
      // adds the appropriate element to the right index in the list
      //  if the list is empty, it just appends the element
      //  Same goes if the index is higher than the last list element's index
      var element = this.makeNewList({date: date, count: 1});
      if (!list.length) { // only true if there are no entries in the current
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
        this.removeFrom(this.$completed, formattedDate)
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

    init: function() {
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
    $listNumber: $('h1 .count'),
    makeTodo: Handlebars.compile($('#todo-template').html()),
    lastIncompleteIndex: -1, // index where the first complete element is or will be inserted
    visible: null,

    // for storing which elements are being displayed currently
    currentDate: undefined,
    complete: undefined,
    addNew: function(id, date, title, complete, update) {
      var context = {
        id: id,
        date: date,
        title: title,
        complete: complete
      }

      var todoElement = $(this.makeTodo(context));
      if (update) {
        this.insertUpdatedTodo(complete, id, todoElement, date)
      } else {
        this.insertNewTodo(todoElement);
      }

      // there's always a deletion whenever we add something, even if the addition is just an update
      this.$listNumber.text(Number(this.$listNumber.text()) + 1)
    },

    insertNewTodo: function(todo) {
      if (this.lastIncompleteIndex > -1) {
        $todoTable.find('tr').eq(this.lastIncompleteIndex).after(todo);
      } else {
        $todoTable.prepend(todo);
      }

      this.lastIncompleteIndex++;
    },

    insertUpdatedTodo: function(complete, id, todo, date) {
      this.hideIfHidden(todo, complete, date);
      if (complete) {
        this.insertCompleteTodo(id, todo);
      } else {
        this.insertIncompleteTodo(id, todo);
      }
    },

    insertCompleteTodo: function(id, todo) {
      var $list = $('tr.done');
      if (!$list.length) {
        $todoTable.append(todo)
      } else {
        this.insertAt(id, $list, todo);
      }
    },

    insertIncompleteTodo: function(id, todo) {
      var $list = $('tr:not(.done)');
      if (!$list.length) {
        $todoTable.prepend(todo)
      } else {
        this.insertAt(id, $list, todo);
      }

      this.lastIncompleteIndex++;
    },

    insertAt: function(id, $list, todo) {
      var elementBefore;
      $list.each(function() {
        var currentId = Number($(this).attr('id'));
        if (currentId < id) {
          elementBefore = $(this);
        }
      })

      if (!elementBefore) {
        $list.eq(0).before(todo);
      } else {
        elementBefore.after(todo);
      }
    },

    hideIfHidden: function(todo, complete, date) {
      if (this.differentStatus(this.complete, complete) ||
                  this.differentStatus(this.date, date)) {
        todo.addClass('hidden');
      }
    },

    differentStatus: function(shownStatus, currentStatus) {
      if (shownStatus !== undefined) {
        return shownStatus !== currentStatus;
      }

      return false;
    },

    deleteAt: function(id, complete) {
      if (!complete) {
        this.lastIncompleteIndex--;
      }

      var toDelete = $(`#${id}`);
      toDelete.remove();
      this.$listNumber.text(Number(this.$listNumber.text()) - 1)
    },

    hideAll: function(array, date, complete) {
      this.currentDate = date;
      this.complete = complete;
      $todoTable.children().addClass('hidden');
      $todoTable.children().each(function() {
        if (array.includes(Number($(this).attr('id')))) {
          $(this).removeClass('hidden');
        }
      });
      console.log(this.$listNumber);
      this.$listNumber.text(array.length);
    },

    showAll: function() {
      $todoTable.children().removeClass('hidden');
      this.currentDate = undefined;
      this.complete = undefined;
      this.$listNumber.text($todoTable.children().length);
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
      var id = Number(target.closest('tr').attr('id'));
      if (target.hasClass('content')) {
        console.log(id);
        todosManager.switchList(id);
      } else if (target.closest('td').hasClass('bin')) {
        todosManager.deleteTodo(id);
      } else if (target.hasClass('modal-bringer')) {
        todosManager.createNewModal(id);
      }
    },

    init: function() {
      this.addListListener();
      return this;
    }
  }



  // ----------------------------- List Listener  -------------------//
  // ----------------------------- Nav Listener  -------------------//
  /*
  structure:
    - listens for event-triggers on the lav ist objects and:
      - readjusts the cosmetics
      - notifies the Todos Manager which nav list is now active
  */



  var navListener = {
    $navigator: $('nav'),
    addNavListener: function() {
      $(this.$navigator).on('click', this.switchFocus.bind(this));
    },

    switchFocus: function(e) {
      var target = $(e.target).closest('li');
      if (target.length) {
        this.focusTarget(target);
      }

      var date = target.attr('name');
      var list = target.closest('ul').attr('class');
      todosManager.reMakeList(list, date);
    },

    resetNav: function() {
      this.focusTarget($('.remaining .title'));
    },

    focusTarget: function(target) {
      $('nav li').removeClass('active');
      target.addClass('active');
    },

    init: function() {
      this.addNavListener();
      return this;
    }
  }



  // ----------------------------- Nav Listener  -------------------//
  // ----------------------------- Load Listener  -------------------//
  /*
  structure:
    - listens for page reload events
      - on hearing these it saves all the current todos data to localstorage
    - on initialization it checks to see if localstorage contains any data already, and if soo, passes this data to the Todos manager and triggers the nav and the list to be populated accordingly
  */


  var reloadListener = {
    addReloadListener: function() {
      $(window).on('unload', this.saveData.bind(this));
    },

    saveData: function() {
      if (Object.keys(todosManager).length) {
        var all = JSON.stringify(todosManager.allTodos);
        var incomplete = JSON.stringify(todosManager.incomplete.allIds);
        var completed = JSON.stringify(todosManager.completed.allIds);
        localStorage.setItem('allTodos', all);
        localStorage.setItem('incomplete', incomplete);
        localStorage.setItem('completed', completed);
        localStorage.setItem('hasData', true);
      } else {
        localStorage.setItem('hasData', '');
      }
    },

    checkStorage: function() {
      console.log(localStorage.getItem('hasData'));
      if (localStorage.getItem('hasData')) {
        var all = JSON.parse(localStorage.getItem('allTodos'));
        var incomplete = JSON.parse(localStorage.getItem('incomplete'));
        var completed = JSON.parse(localStorage.getItem('completed'));
        console.log(all);
        //todosManager.addData(all, incomplete, completed);
      }
    },

    init: function() {
      this.checkStorage();
      this.addReloadListener();
      return this;
    }
  }



  // ----------------------------- Load Listener  -------------------//
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

  function toDateNumber(string) {
    if (string === 'No Due Date') {
      return 0;
    } else {
      return string
        .split('/')
        .reverse()
        .join('');
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
  navListener.init();
  listListener.init();
  listManager.init();
  inputManager.init();
  navManager.init();
  modalDisplayManager.init();
  reloadListener.init();
})
