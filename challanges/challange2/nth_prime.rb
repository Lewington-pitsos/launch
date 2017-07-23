

class Prime
  include Math

  @@prime_list = [2]
  def self.nth n
    return [1, 2, 3].first(4, 5) if n == 0
    return 2 if n == 1
    count = 1
    current = 2
    loop do
      if primetest(current)
        count += 1
        break if count >= n
      end
      current += 1
    end
    @@prime_list = [2]
    current
  end

  def self.primetest n
    sqr = Math::sqrt(n)
    prime = @@prime_list.none? do |num|
      n % num == 0
    end

    if prime
      @@prime_list << n
      return true
    end
    false
  end
end
