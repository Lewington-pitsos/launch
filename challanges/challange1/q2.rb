class Seive

  FIRST_PRIME = 2

  def initialize num
    @top = num
  end

  def seive
    candidates = (FIRST_PRIME..@top).to_a
    prime_index = 0
    while prime_index < (candidates.length)
      num_index = prime_index + 1

      while num_index < (candidates.length)

         if is_fact? candidates[prime_index], candidates[num_index]
           candidates.delete_at(num_index)
         else
           num_index += 1
         end
      end
      prime_index += 1
    end
    candidates
  end

  def is_fact? prime, num
    num % prime == 0
  end

end

p Seive.new(999).seive
