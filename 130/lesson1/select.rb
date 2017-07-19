def select collection

  count = 0

  new_array = []

  while count < collection.length
    new_array << collection[count] if yield collection[count]
    count += 1
  end

  new_array
end

array = [1, 2, 3, 4, 5]

p select(array) { |num| num.odd? }      # => [1, 3, 5]
p select(array) { |num| puts num }      # => [], because "puts num" returns nil and evaluates to false
p select(array) { |num| num + 1 }
