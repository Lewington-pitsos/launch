class Octal

  BASE = 8


  attr_accessor :num, :power

  def initialize num
    @num = num.chars
    @power = @num.length - 1
  end

  def guard
    num.all? {|char| char.match(/[1-7]/)}
  end

  def get_decimal
    return 0 unless guard
    digits = []
    num.each do |n|
      oct = convert_digit n.to_i, power
      self.power -=1
      digits << oct
    end
    digits.inject(:+)
  end

  def convert_digit digit, power
    digit * (BASE ** power)
  end

end

p Octal.new("7sdf77").get_decimal
