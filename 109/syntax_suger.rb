
def reverse str
  array = str.chars

  narray = []

  while array != []
    narray << array.pop()
  end

  narray.join
end

def fuzz start, finish

  array = []

  (start..finish).each do |i|
    case
    when i % 3 == 0 && i % 5 == 0
      puts "FizzBuzz"
      array << "FizzBuzz"
    when i % 3 == 0
      puts "Fizz"
      array << "Fizz"
    when i % 5 == 0
      puts "Buzz"
      array << "Buzz"
    else
      puts i
      array << i
    end
  end

  array
end

a = [5, 7, 8, 9, 4, 5, 6, 2]


z = a.count  do |i|
  i *2 > 10
end

p z
