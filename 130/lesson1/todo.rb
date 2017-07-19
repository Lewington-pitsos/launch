# This class represents a todo item and its associated
# data: name and description. There's also a "done"
# flag to show whether this todo item is done.

class Todo
  DONE_MARKER = 'X'
  UNDONE_MARKER = ' '

  attr_accessor :title, :description, :done, :donee, :undonee

  def initialize(title, description='')
    @title = title
    @description = description
    @done = false
  end

  def done
    self.done = true
  end

  def donee
    done
  end

  def undonee
    self.done = false
  end

  def to_s
    "[#{done ? DONE_MARKER : UNDONE_MARKER}] #{title}"
  end
end

class TodoList
  attr_accessor :title

  def initialize(title)
    @title = title
    @todos = []
  end

  def add item
    if item.class == Todo
      todos << item
    else
      puts "TypeError: Can only add todo objects"
    end
  end

  def size
    todos.size
  end

  def first
    todos[0]
  end

  def last
    todos[-1]
  end

  def item_at num
    todos.fetch(num)
  end

  def mark_done_at num
    item_at(num).donee
  end

  def mark_undone_at num
    item_at(num).undonee
  end

  def remove_at index
    todos.delete_at(index)
  end

  def shift
    todos.shift
  end

  def pop
    todos.pop
  end

  def to_s
    "----#{title}---- \n    #{todos.map {|i| i.to_s}.join("\n    ")}"
  end

  private

  attr_accessor :todos
end

todo1 = Todo.new("Buy milk")
todo2 = Todo.new("Clean room")
todo3 = Todo.new("Go to gym")

list = TodoList.new("Today's Todos")
list.add(todo1)
list.add(todo2)
list.add(todo3)

puts list

list.pop

puts list

list.mark_done_at(1)

puts list
