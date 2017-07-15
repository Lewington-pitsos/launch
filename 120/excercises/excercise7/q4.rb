class CircularQueue

  attr_reader :q, :num

  def initialize num
    @q = [[nil]*num].flatten
    @num = num
  end

  def enqueue item
    plant 0, item
  end

  def dequeue
    return nil if q == [[nil]*num].flatten
    uproot -1
  end

  private

  def plant index, item
    if !q[index] || index == (q.length)- 1
      q[index] = item
    else
      plant index + 1, q[index]
      q[index] = item
    end
  end

  def uproot index
    if q[index]
      entry = q[index].dup
      q[index] = nil
      return entry
    else
      uproot index - 1
    end
  end

end


queue = CircularQueue.new(3)
puts queue.dequeue == nil

queue.enqueue(1)
queue.enqueue(2)
puts queue.dequeue == 1

queue.enqueue(3)
queue.enqueue(4)
puts queue.dequeue == 2

queue.enqueue(5)
queue.enqueue(6)
queue.enqueue(7)
puts queue.dequeue == 5
puts queue.dequeue == 6
puts queue.dequeue == 7
puts queue.dequeue == nil

queue = CircularQueue.new(4)
puts queue.dequeue == nil

queue.enqueue(1)
queue.enqueue(2)
puts queue.dequeue == 1

queue.enqueue(3)
queue.enqueue(4)
puts queue.dequeue == 2

queue.enqueue(5)
queue.enqueue(6)
queue.enqueue(7)
puts queue.dequeue == 4
puts queue.dequeue == 5
puts queue.dequeue == 6
puts queue.dequeue == 7
puts queue.dequeue == nil
