def count *args

  count = [*args].each_with_object([0]) {|i, int| int[0] += 1 if yield i}

  count[0]
end

p count(1, 3, 6) { |value| value.odd? }
p count(1, 3, 6) { |value| value.even? }
p count(1, 3, 6) { |value| value > 6 }
p count(1, 3, 6) { |value| true }
p count() { |value| true }
p count(1, 3, 6) { |value| value - 6 }
