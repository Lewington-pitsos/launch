items = ['apples', 'corn', 'cabbage', 'wheat']

def gather(items)
  puts "Let's start gathering food."
  yield(items)
  puts "We've finished gathering!"
end

gather(items) do |*a, b|
  puts a.join(" ")
  puts b
end

gather(items) do | a, *b, c|
  puts a
  puts b.join(' ')
  puts c
end

gather(items) do | a,*b |
  puts a
  puts b.join(" ")
end

gather(items) do | a, b, c, d|
  puts "#{a} #{b} #{c} and #{d}"
end
