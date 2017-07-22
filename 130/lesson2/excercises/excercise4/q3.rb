items = ['apples', 'corn', 'cabbage', 'wheat']

def gather(items)
  puts "Let's start gathering food."
  yield items if block_given?
  puts "Let's start gathering food."
end


gather(items) { |produce| puts produce.join('; ') }

gather(items) do |produce|
  puts "We've gathered some vegetables: #{produce[1]} and #{produce[2]}"
end
