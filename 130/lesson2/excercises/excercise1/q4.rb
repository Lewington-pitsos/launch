def divisors n

  (1..n).select {|i| n % i == 0}

end

p divisors 98
