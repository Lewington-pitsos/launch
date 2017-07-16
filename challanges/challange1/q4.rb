class Trin

  def initialize str
    @didgits = str.chars
  end

  def convert
    return 0 if invalid?

    result = []

    @didgits.reverse.each_with_index do |n, index|
      result << to_decimal(n.to_i, index)
    end

    result.reverse.reduce(:+)
  end

  def invalid?
    @didgits.any? {|char| !char.match(/[0-2]/)}
  end

  def to_decimal n, power
    n * (3 ** power)
  end

end

p Trin.new('102012').convert
