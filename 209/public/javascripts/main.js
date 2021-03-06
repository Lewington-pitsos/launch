$(function() {
  // ----------------------------- Modal Display Manager -------------------//



  var modalDisplayManager = {
    $modalParent: $('.activater'),
    $modalBringer: $('.modal-bringer'),
    $modalBanisher: $('.dimmer'),
    $allInputs: $('input'),
    $descriptionText: $('#description'),
    $completeMarker: $('#complete'),
    update: false,
    currentDate: {}, // for some reason we have to keep displaying the same date in every modal if a date gets selected but no save is made

    modalListener: function() {
      this.$modalBringer.on('click', this.generateNewModal.bind(this));
    },

    generateNewModal: function() {
      this.clearPlaceholderDate();
      this.showModal();
    },

    showModal: function() {
      this.$modalParent.css('display', 'block');
      this.$modalParent.animate({opacity: 1}, 500);
      this.$modalBanisher.on('click', this.hideModal.bind(this));
      $dateInputs.on('click', this.setPlaceholderDate.bind(this))
      if (!this.update) {
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
      this.$descriptionText.val('');
    },

    resetDisplay: function() {
      this.$modalParent.css('display', 'none');
    },

    renderModal: function(todo) {
      $title.val(todo.title)
      this.usePlaceholderDate(todo);

      $description.val(todo.desc)
      this.update = true;
      this.showModal();
    },

    setPlaceholderDate: function(e) {
      this.currentDate[e.target.id] = e.target.value;
    },

    usePlaceholderDate: function(todo) {
      $day.val(this.currentDate['day'] || todo.day || '');
      $month.val(this.currentDate['month'] || toDoubleDigits(todo.month));
      $year.val(this.currentDate['year'] || todo.year || '');
    },

    clearPlaceholderDate: function() {
      this.currentDate = {};
      $dateInputs.val('');
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
      if (e.currentTarget.id !== 'mark') {
        this.saveInput();
      } else {
        this.markComplete();
        // innitially I treated a click on 'mark as complete' as exactly the same as a regular update except that the updated todo would also be set to complete. It would be super trivial to revert to that functionality.
      }
    },

    saveInput: function() {
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

      todosManager.processTodo(todo);
      // i.e. specifiying whether the 'mark as complete' button was pressed
      modalDisplayManager.clearPlaceholderDate();
      // we only reset the dates when a save is made for some reason
      modalDisplayManager.hideModal();
    },

    markComplete: function() {
      todosManager.recordCompletion();
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
    - can sort itself and return the sorted index ofa  given date
    - can return the total number of stored dates
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

    getDatesNumber: function() {
      return Object.keys(this.allIds).length
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
    fullList: Object.create(IdTracker).init(),
    allTodos: {},
    currentId: 0,
    toUpdate: false,
    updateId: false,

    addData: function(all, fullList, completed) {
      this.allTodos = all;
      this.fullList.allIds = fullList;
      this.completed.allIds = completed;
      this.currentId = (Object.keys(all)
        .map(i => Number(i))
        .reverse()[0] + 1 || 0);
      console.log(`first current Id: ${this.currentId}`);
      this.addAllTodos();
    },

    addAllTodos: function() {
      this.renderDummies();
      Object.values(this.allTodos)
        .forEach(this.firstRender.bind(this));
    },

    firstRender: function(todo) {
      // render each todo to the list in default (i.e. id) order
      var date = toDateString(todo.date)
      listManager.addNew(todo.id,
         date,
         todo.title,
         todo.complete,
         true);

      // first add to the top of the nav:
      var index = this.fullList.getIndex(todo.date);
      navManager.addNew(date, index, false, true);

      // then add to the bottom IFF the current todo is complete
      if (todo.complete) {
        var bottomIndex = this.completed.getIndex(todo.date);
        navManager.addNew(date, bottomIndex, true, true);
      }
    },

    renderDummies: function() {
      // We use indexing in the date-storing arrays to make sure we put the dates in the right order in the nav. Because of this, if adding lots of nav elements at the same time we first have to render out dummy elements to the nav so that the indicies match up properly.
      navManager.renderDummiesFor(this.fullList.getDatesNumber(), true)
      navManager.renderDummiesFor(this.completed.getDatesNumber(), false)
    },

    processTodo: function(todo) {
      // checks if a todo is being added ot updated
      if (this.toUpdate) {
        this.updateTodo(todo);
      } else {
        this.addTodo(todo);
        fauxReload()
      }
    },

    recordCompletion: function() {
      var previousCompletion = this.toUpdate.complete;
      if (!previousCompletion) {
        this.completed.addId(this.toUpdate.date, this.updateId);
      }

      this.toUpdate.complete = true;
      listManager.renderCompletion(this.updateId, previousCompletion);
      this.clearUpdateData();
    },

    addTodo: function(todo) {
      // adds the todo to Alltodos, giving it a unique id, then adds that id to the appropriate idtracker object. Then prompts List and nav managers to make cosmetic changes
      todo.id = this.currentId;
      this.allTodos[this.currentId] = todo;
      this.fullList.addId(todo.date, this.currentId);
      var currentIndex;
      if (todo.complete) {
        this.completed.addId(todo.date, this.currentId);
        currentIndex = this.completed.getIndex(todo.date)
      } else {
        currentIndex = this.fullList.getIndex(todo.date)
      }

      this.addToDisplay(todo.date, todo.complete, todo.title, currentIndex, this.currentId);
      this.currentId++;
    },

    updateTodo: function(info, completeValue, swapping) {
      var id = this.updateId;
      // The complete property of info should be whatever it was before the update UNLESS the update being performed is a completion-swap, in which case we have passed in the new value
      if (swapping) {
        info.complete = completeValue;
      } else {
        info.complete = this.toUpdate.complete;
      }

      info.id = id;

      // update both of the collection objects in ALL circumstances
      this.update(this.fullList, info.date, this.toUpdate.date, id);
      this.completed.deleteId(this.toUpdate.date, id);
      if (info.complete) {
        this.update(this.completed, info.date, this.toUpdate.date, id);
      }

      // delete both old values/dates in the nav bar if we're moving away from the complete list, otherwise, just delete from the incomplete list
      if (info.complete && info.complete !== this.toUpdate.complete) {
        navManager.deleteAt(this.toUpdate.date, false);
      } else {
        navManager.deleteAt(this.toUpdate.date, true);
      }

      var formattedDate = toDateString(info.date);
      // add a date entry to the top no matter what (one always gets deleted from the top)
      var topIndex = this.fullList.getIndex(info.date);
      navManager.addNew(formattedDate, topIndex, false);

      // add thje same entry to bottom if we're currently complete (whether we just became incomplete or not)
      if (info.complete) {
        var bottomIndex = this.completed.getIndex(info.date);
        navManager.addNew(formattedDate, bottomIndex, true);
      }

      this.allTodos[id] = info;

      // remove the previoys entry from the list and add a new one with the new (info) data
      listManager.deleteAt(id, this.toUpdate.complete);
      listManager.addNew(id, formattedDate, info.title, info.complete, true);
      navListener.focusCurrent(toDateString(this.toUpdate.date), info.complete);

      this.clearUpdateData();
      // super important to reset this or else we will always update and never add new todos
    },

    clearUpdateData: function() {
      this.toUpdate = false;
      this.updateId = false;
    },

    update: function(object, newDate, oldDate, id) {
      object.deleteId(oldDate, id);
      object.addId(newDate, id);
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
      }

      this.fullList.deleteId(date, id);

      this.displayDeletion(date, id, complete);
    },

    displayDeletion: function(date, id, complete) {
      var formattedDate = toDateString(date);
      navManager.deleteAt(date, complete);
      listManager.deleteAt(id, complete);
      modalDisplayManager.clearPlaceholderDate(); // this seems to be what the live example version does
    },

    createNewModal: function(id) {
      // sets an update todo (the next todo to get updated when toUpdate is next called. Reset every time an update modal is created)
      this.toUpdate = this.allTodos[id];
      this.updateId = id;
      modalDisplayManager.renderModal(this.toUpdate);
    },

    recategorize: function(id) {
      var info = this.allTodos[id];
      this.updateId = id;
      this.toUpdate = info;
      newInfo = Object.assign({}, info);
      this.updateTodo(newInfo, !info.complete, true);
      modalDisplayManager.clearPlaceholderDate();
    },

    reMakeList: function(list, date) {
      if (!date) {
        this.displayAllIn(list);
      } else {
        var formattedDate = toDateNumber(date);
        var toRender = [];
        if (list === 'remaining') {
          this.fullList
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
        listManager.hideAll(completedTodos, null, true);
      }
    },

    clearNavEffects: function() {
      navListener.resetNav();
      listManager.showAll();
    },
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
    $fullList: $('.remaining'),
    $completed: $('.completed'),
    makeNewList: Handlebars.compile($('#nav-list-template').html()),

    addNew: function(date, index, complete, dummy) {
      if (complete) {
        this.addToList(date, index, this.$completed, dummy);
      } else {
        this.addToList(date, index, this.$fullList, dummy);
      }
    },

    addToList: function(date, index, $list, dummy) {
      var $sameDate = $list.find(`[name="${date}"]`);
      if ($sameDate.length) {
        this.updateDate($sameDate);
      } else {
        if (dummy) { // i.e. the list currently contains dummys
          this.replaceDummy(date, index, $list);
        } else {
          this.addNewDate(date, index, $list);
        }
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

    addNewDate: function(date, index, $list) {
      // adds the appropriate element to the right index in the list
      //  if the list is empty, it just appends the element
      //  Same goes if the index is higher than the last list element's index
      var element = this.makeNewList({date: date, count: 1});
      if (!$list.length) { // iff no entries in the current list
        $list.append(element);
      } else {
        var nextElement = $list.find('li:not(.title)').eq(index);
        if (nextElement.length) {
          nextElement.before(element);
        } else {
          $list.append(element);
        }
      }
    },

    deleteAt: function(date, complete) {
      var formattedDate = toDateString(date);
      if (complete) {
        this.removeFrom(this.$completed, formattedDate)
      }

      this.removeFrom(this.$fullList, formattedDate)
    },

    removeFrom: function(list, date) {
      var currentElement = list.find(`[name="${date}"]`);
      if (currentElement.find('.count').text() === "1") {
        currentElement.remove();
      }
      this.updateDate(currentElement, true);
      this.updateDate(list.find('.title'), true);
    },

    replaceDummy: function(date, index, $list) {
      var element = this.makeNewList({date: date, count: 1});
      $list.find('li:not(.title)').eq(index).replaceWith(element);
    },

    renderDummiesFor: function(number, fullList) {
      var $list = (fullList ? this.$fullList : this.$completed);
      for (var i = 0; i < number; i++) {
        $list.append('<li class="dummy"></li>')
      }

    },
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
    $listTitle: $('.list-title'),
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
      this.incrementCount();
    },

    renderCompletion: function(id, previousCompletion) {
      $(`#${id}`).addClass('done');
      console.log($(`#${id}`));
      if (!previousCompletion) {
        this.lastIncompleteIndex--;
      }
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
                  this.differentDate(this.currentDate, date)) {
        todo.addClass('hidden');
        this.decrementCount();
      }
    },

    differentDate: function(shownDate, currentStatus) {
      if (shownDate !== undefined) {
        return shownDate !== currentStatus;
      }

      return false;
    },

    differentStatus: function(shownStatus, currentStatus) {
      if (shownStatus) {
        return shownStatus !== currentStatus;
      }

      return false;
    },

    decrementCount: function() {
      this.$listNumber.text(Number(this.$listNumber.text()) - 1);
    },

    incrementCount: function() {
      this.$listNumber.text(Number(this.$listNumber.text()) + 1);
    },

    deleteAt: function(id, complete) {
      if (!complete) {
        this.lastIncompleteIndex--;
      }

      var toDelete = $(`#${id}`);
      toDelete.remove();
      this.decrementCount();
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
      this.$listNumber.text(array.length);
      this.updateTitle(date || 'Completed');
    },

    showAll: function() {
      $todoTable.children().removeClass('hidden');
      this.currentDate = undefined;
      this.complete = undefined;
      this.$listNumber.text($todoTable.children().length);
      this.updateTitle('All Todos');
    },

    updateTitle: function(newTitle) {
      this.$listTitle.text(newTitle);
    },
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
        todosManager.recategorize(id);
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
    currentList: 'remaining',
    addNavListener: function() {
      $(this.$navigator).on('click', this.triggerReload.bind(this));
    },

    triggerReload: function(e) {
      var name = $(e.target).closest('li').attr('name');
      var list = $(e.target).closest('ul').attr('class');
      fauxReload();
      this.switchFocus(name, list);
    },

    switchFocus: function(name, list) {
      var target = $(`.${list} li[name="${name}"]`);
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
      // we also want to keep track of the current meta-list on the nav
      this.currentList = target.parent().attr('class');
    },

    focusCurrent: function(title) {
      // only here to counter a bug where if you toggle the only todo in a singleton list the todo is removed and then re-added to the nav without being re-focused cosmetically. We only want to do this if the current list is not a complete list though.
      if (this.currentList === 'remaining') {
        var focused = this.$navigator.find('.active');
        if (!focused.length) {
          var current = $(`[name="${title}"]`).eq(0);
          if (current.length) {
            this.focusTarget(current);
          }
        }
      }
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
        var fullList = JSON.stringify(todosManager.fullList.allIds);
        var completed = JSON.stringify(todosManager.completed.allIds);
        localStorage.setItem('allTodos', all);
        localStorage.setItem('fullList', fullList);
        localStorage.setItem('completed', completed);
        localStorage.setItem('hasData', true);
      } else {
        localStorage.setItem('hasData', '');
      }
    },

    checkStorage: function() {
      if (localStorage.getItem('hasData')) {
        var all = JSON.parse(localStorage.getItem('allTodos'));
        var fullList = JSON.parse(localStorage.getItem('fullList'));
        var completed = JSON.parse(localStorage.getItem('completed'));
        todosManager.addData(all, fullList, completed);
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
    // converts a string into a date used to sort and store ids
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

  function fauxReload() {
    // clears the table and both nav lists, then promprts the todosManager to re-render both based on it's stored data
    // also focuses the AllTodos list
    $('li.title span').text(0);
    $('li:not(.title)').remove();
    $('tr').remove();
    todosManager.addAllTodos();
    navListener.switchFocus('', 'remaining');
  }



  // ----------------------------- Helper Functions -------------------//
  // ----------------------------- Global Variables  -------------------//
    // vairbales used by more than one object, stored here to reduce the number of lookups


  var $todoTable = $('table'); // ListManager + listListener

  var $title = $('#title'); // Input Manager + Modal Display Manager
  var $day = $('#day');
  var $month = $('#month');
  var $year = $('#year');
  var $description = $('#description');
  var $dateInputs = $('select');



  // ----------------------------- Global Variables  -------------------//
  navListener.init();
  listListener.init();
  inputManager.init();
  modalDisplayManager.init();
  reloadListener.init();
})
