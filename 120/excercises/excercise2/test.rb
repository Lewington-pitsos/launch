
def combine arr1, arr2
  arr1.zip(arr2).map {|mini| mini.inject(:*)}.first(3)
end

a = [2, 3, 4, 5]
b = [6, 7, 8, 9]

p combine a, b

p [3, 6].inject(:*)
