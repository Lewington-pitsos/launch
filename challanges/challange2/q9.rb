class Perfect


  def classify n
    sum = factors(n).reduce(:+)
    if sum == n
       "Perfect"
    elsif sum > n
      "Abundant"
    else
      "Deficient"
    end
  end

  def factors n
    (1..n/2).select {|i| n % i == 0}
  end


end

w = Perfect.new

p w.classify(12)
