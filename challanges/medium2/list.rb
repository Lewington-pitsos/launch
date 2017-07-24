class Element

  attr_reader :datum, :nxt

  def initialize data, nxt = nil
    @datum = data
    @nxt = nxt
  end

  def tail?
    !!(!nxt)
  end

  def next
    nxt
  end

end

class SimpleLinkedList

  attr_accessor :head, :size

  def initialize head=nil
    @size = 0
    @head = head
  end

  def empty?
    !!(!head)
  end

  def push num
    self.head = Element.new(num, head)
    self.size += 1
  end

  def pop
    to_pop = head
    self.head = head.next
    self.size -= 1
    to_pop.datum
  end

  def peek
    return head ? head.datum : head
  end

  def self.from_a array
    l = SimpleLinkedList.new
    return l unless array
    array.reverse.each do |entry|
      l.push(entry)
    end
    l
  end

  def to_a
    array = []
    if head
      add head, array
    end
    array
  end

  def reverse
    narray = self.to_a.reverse
    SimpleLinkedList.from_a(narray)
  end

  private

  def add element, array
    array << element.datum
    if element.tail?
      return array
    else
      add element.next, array
    end
  end

end
