fact = Enumerator.new do |y|
  current = 1
  total = 1

  loop do
    total *= current
    current += 1
    y << total

  end
end

7.times {puts fact.next}

puts fact.next
