class SumTest

  @@mults = [3, 5]

  def initialize *mults
    @@mults = mults
  end

  def self.to num
    (1..num-1).select {|num| is_mult? num}.inject(:+)
  end

  def self.is_mult? num
    @@mults.any? { |i| num % i == 0 }
  end

  def to num
    self.class.to(num)
  end
end


p SumTest.new(5, 6, 8).to(150)
