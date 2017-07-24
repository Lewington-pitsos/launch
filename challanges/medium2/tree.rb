class Bst

  attr_reader :tree, :first, :current, :previous, :cheating

  def initialize num
    @tree = {}
    tree[num] = [num, nil, nil]
    @first = num
    @current = num
    @previous = tree
    @cheating = [num]
  end

  def insert num
    place_at num, @tree[first]
  end

  def place_at num, array
    if num > array[0]
      array[2] = try num, array[2]
    else
      array[1] = try num, array[1]
    end
  end

  def try candidate, slot
    unless slot
      cheating << candidate
      return {candidate => [candidate, nil, nil]}
    end
    place_at candidate, slot.values[0]
    slot
  end

  def left
    @current, @previous = previous[current][1].keys[0], previous[current][1]
    self
  end

  def right
    @current, @previous = previous[current][2].keys[0], previous[current][2]
    self
  end

  def data

    answer = previous.keys[0]

    @previous = tree
    @current = first
    answer
  end

  def each
    if block_given?
      cheating.sort.map do |i|
        yield i
      end
    else
    cheating.sort.each
  end
  end

end
