#----------------------------SET 2-----------------------------------#

def prod_mult
  answer = talk_block("please enter an int greater than 0").to_i

  operator = talk_block_operator "do you want multiplication or sum [m/s]?"

  if operator =="m"
    total = mult answer, 1
  else
    total = prod answer, 0
  end

  total
end

def prod answer, total
  (1..answer).each do |i|
    total += i
  end

  total
end

def mult answer, total
  (1..answer).each do |i|
    total *= i
  end

  total
end

def talk_block message
  answer = ''
  loop do
    puts message
    answer = gets.chomp

    break if answer.to_i.to_s == answer

    puts "invalid input try again"
  end

  answer
end


def talk_block_operator message
  valids = ["m", "s"]

  answer = ''
  loop do
    puts message
    answer = gets.chomp

    break if valids.include?(answer)

    puts "invalid input try again"
  end

  answer
end

p prod_mult
