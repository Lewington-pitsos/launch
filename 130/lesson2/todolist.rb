class Todo
  DONE_MARKER = 'X'
  UNDONE_MARKER = ' '

  attr_accessor :title, :description, :done, :donee, :undonee

  def initialize(title, description='')
    @title = title
    @description = description
    @done = false
  end

  def donee
    self.done = true
  end

  def done
    @done
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
      1 + "1"
    end
  end

  def <<(item)
    add item
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
    "---- #{title} ----\n#{todos.map {|i| i.to_s}.join("\n")}"
  end

  def each

    count = 0

    while count < todos.length
      yield todos[count]
      count += 1
    end

    self
  end

  def select

    count = 0

    newlist = TodoList.new(title)

    while count < todos.length
      newlist.add todos[count] if yield todos[count]
      count += 1
    end

    newlist
  end

  def find_by_title str
    self.each do |i|
      return i if i.title == str
    end

    nil
  end

  def all_done
    self.select{|i| i.done}
  end

  def all_not_done
    self.select{|i| !i.done}
  end

  def done?
    all_not_done == []
  end

  def mark_done str
    item = find_by_title str
    item.donee if item
  end

  def mark_all_done
    self.all_not_done.each {|i| i.donee}
  end

  def mark_all_undone
    self.all_done.each {|i| i.undonee}
  end

  def to_a
    todos
  end

  def ==(other)
    to_a == other.to_a
  end


  private

  attr_accessor :todos
end
