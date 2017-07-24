class Triplet

  attr_reader :a, :b, :c
  def initialize(a, b, c)
    @a, @b, @c = a, b, c
  end

  def sum
    a + b + c
  end

  def product
    a * b * c
  end

  def pythagorean?
    a**2 + b**2 == c**2
  end

  def self.where hash
    max = hash[:max_factor] || 0
    min = hash[:min_factor] || 0
    sum = hash[:sum] || nil

     triplets = find_facts max, min, sum

     triplets.map {|i| Triplet.new(i[0], i[1], i[2])}
  end



  #private
  def self.find_facts max, min, sum
    working = []
    possible = (min..max).to_a.permutation(3).to_a
    possible.each do |i|
      working << i.sort if pythagorean?(i[0], i[1], i[2]) &&
      less_than(sum, i)
    end

    working.uniq
  end

  def self.pythagorean? a, b, c
    a**2 + b**2 == c**2
  end

  def self.less_than sum, array
    return true unless sum
    array.reduce(:+) == sum
  end
end
