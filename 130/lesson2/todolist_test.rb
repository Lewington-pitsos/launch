require 'simplecov'
SimpleCov.start

require 'minitest/autorun'
require "minitest/reporters"
Minitest::Reporters.use!

require_relative 'todolist.rb'

class TodoListTest < MiniTest::Test

  def setup
    @todo1 = Todo.new("Buy milk")
    @todo2 = Todo.new("Clean room")
    @todo3 = Todo.new("Go to gym")
    @todos = [@todo1, @todo2, @todo3]

    @list = TodoList.new("Today's Todos")
    @list.add(@todo1)
    @list.add(@todo2)
    @list.add(@todo3)
  end

  def test_to_a
    assert_equal(@list.to_a, @todos)
  end

  def test_size
    assert_equal(@list.size, @todos.size)
  end

  def test_first
    assert_equal(@list.first, @todo1)
  end

  def test_last
    assert_equal(@list.last, @todo3)
  end

  def test_shift
    copy = @list.dup
    shifted = copy.shift
    assert_equal(shifted, @todo1)
    assert_equal(copy.first, @todo2 )
  end

  def test_pop
    copy = @list.dup
    shifted = copy.pop
    assert_equal(shifted, @todo3)
    assert_equal(copy.last, @todo2 )
  end

  def test_done
    assert_equal(@list.done?, false)
  end

  def test_adding_error
    assert_raises(*TypeError) {@list.add(7)}
    assert_raises(TypeError) { @list.add('hi') }
  end

  def test_shove

    todo4 = Todo.new("Reanimate Stalin")
    @list << todo4
    @todos << todo4
    assert_equal(@list.last, todo4)

  end

  def test_shovel_and_add
    todo5 = Todo.new("Hunt down and kill zombie Stalin")
    @list.add(todo5)
    @todos << todo5
    assert_equal(@list.to_a, @todos)
  end

  def test_item_at
    index = 1
    assert_equal(@list.item_at(index), @todos[index])
    index = 7
    assert_raises(*IndexError) {@list.item_at(index)}
  end

  def test_mark_done_at
    @list.mark_done_at(1)
    assert(@todos[1].done)
    refute(@todos[0].done)
    index = 7
    assert_raises(*IndexError) {@list.mark_done_at(index)}
  end

  def test_mark_undone_at
    @todo1.donee
    @todo2.donee
    @todo3.donee

    @list.mark_undone_at(1)
    refute(@todos[1].done)
    assert(@todos[0].done)
    assert(@todos[2].done)
    index = 7
    assert_raises(*IndexError) {@list.mark_done_at(index)}
  end

  def test_mark_all_done
    @list.mark_all_done

    assert(@todo1.done)
    assert(@todo2.done)
    assert(@todo3.done)
  end

  def test_remove_at
    index = 1
    removed = @list.remove_at index
    assert_equal(removed, @todo2)
    assert_equal(@list.item_at(index), @todo3)

  end

  def test_to_s
    output = <<-OUTPUT.chomp.gsub /^\s+/, ""
    ---- Today's Todos ----
    [ ] Buy milk
    [ ] Clean room
    [ ] Go to gym
    OUTPUT

    assert_equal(output, @list.to_s)

    @list.mark_done_at(0)

    output = <<-OUTPUT.chomp.gsub /^\s+/, ""
    ---- Today's Todos ----
    [X] Buy milk
    [ ] Clean room
    [ ] Go to gym
    OUTPUT

    assert_equal(output, @list.to_s)

    @list.mark_all_done

    output = <<-OUTPUT.chomp.gsub /^\s+/, ""
    ---- Today's Todos ----
    [X] Buy milk
    [X] Clean room
    [X] Go to gym
    OUTPUT

  end

  def test_each

    empty = []

    @list.each {|i| empty << i}

    assert_equal(empty, @todos)

    assert_equal(@list.each {|i| i}, @list)

  end

  def test_select

    @todo1.donee

    undones = @list.select{|i| !i.done}

    @list.remove_at(0)

    assert_equal(undones, @list)

  end


end
