class FixedArray

  def initialize n

    self.array=[nil]*5

  end

  def to_a
    array
  end

  def []n
    to_a.fetch([n])
  end

  def []=(index, value)
    self.array[index] = value
  end

  def to_s
    "'#{array}'"
  end

  protected

  attr_accessor :array


end

a = FixedArray.new(5)

p a.to_a


puts a.to_s

puts a.to_s == '[nil, nil, nil, nil, nil]'
