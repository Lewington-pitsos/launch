class Luhn

  attr_accessor :digits, :second, :checksum, :valid, :addends, :number

  def initialize num
    @digits = num.to_s.scan(/./).map {|i| i.to_i}
    @second = [true, false].cycle
    calculate
  end

  def calculate

    lunned = digits.map do |i|
      if second.next
        luhnify i
      else
        i
      end
    end

    self.addends = lunned

    self.checksum = lunned.reduce(:+)

    remainder = checksum % 10

    self.valid = (remainder == 0)

    last = 0

    last = 10 - remainder unless valid

    self.number = (digits + [last]).join().to_i


  end

def luhnify num
  double = num * 2
  double -= 9 if double > 9
  double
end

def valid?
  valid
end


end

l = Luhn.new(8_739_567)

p l.addends

p l.checksum

p l.valid?

p l.number
