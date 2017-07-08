def prime? n

  #fixing edge case where n is 1
  return false if n == 1

  q = n/2

  res = true

  (2..q).each do |i|
    res = false if n % i == 0
  end

  res
end

#-------------------------------------------------##

def prime_arr arr
  arr.select {|i| prime? i}
end

p prime_arr [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]

#-------------------------------------------------##

def num_primes arry
  prime_arr(arry).length
end

p num_primes [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]


#-------------------------------------------------##
