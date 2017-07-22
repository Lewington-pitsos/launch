def zip array1, array2

  narray = []

  array1.each_with_index do |i, index|
    narray << [i, array2[index]]
  end

  narray
end

p zip([1, 2, 3], [4, 5, 6]) == [[1, 4], [2, 5], [3, 6]]
