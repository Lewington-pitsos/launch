class Palindromes

  attr_reader :max, :min, :pals

  def initialize hash
    @max = hash[:max_factor]
    @min = hash[:min_factor] || 0
    @pals = []
  end

  def generate
    first, second = max, max
    count = 1
    loop do
      num = first * second
      if pal? num
        already = false
        pals.each do |i|
          if i.value == num
            already = true
            i.add([first, second].sort)
          end
        end
        pals << Palindrome.new(num, first, second) unless already
      end
      first -= 1
      if first <= min
        first = max
        count += 1
        break if count >= max - min
        second = max - count
      end
    end
    sort
  end

  def largest
    pals[-1]
  end

  def smallest
    pals[0]
  end

  private

  def pal? num
    num.to_s == num.to_s.reverse
  end

  def sort
    @pals = pals.sort_by {|i| i.value}
  end
end

class Palindrome

  attr_reader :value, :factors

  def initialize num, fact, fact2
    @value = num
    @factors = [[fact, fact2].sort]

  end

  def add facts
    factors << facts unless factors.include?(facts)
  end

end
