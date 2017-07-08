HASH = {
  "zero" => 0, "one" => 1, "two" => 2, "three" => 3, "four" => 4,
  "five" => 5, "six" => 6, "seven" => 7, "eight" => 8, "nine" => 9,
  "ten" => 10
  }


def minus a, b
  a - b
end

def plus a, b
  a + b
end


def divide a, b
  a / b
end

def times a, b
  a * b
end



def runthrough_t numbers_array
  opp = "times"
  start = 0
  finish = 2

  loop do

    current = numbers_array[start.. finish]
    operator = current[1]
    a = current[0]
    b = current[2]

    total = 0
    if operator == opp
      total += times a, b

      if start == 0
        numbers_array = [total] + numbers_array[finish+1..-1]
      elsif finish == (numbers_array.length) - 1
        numbers_array = numbers_array[0..start-1] + [total]
      else
        numbers_array = numbers_array[0..start-1]+ [total] + numbers_array[finish+1..-1]

      end


    else
      start += 2
      finish += 2

    end




    p numbers_array

    break if !(numbers_array.include?(opp))

  end

  numbers_array
end


def runthrough_d numbers_array
  opp = "divided"

  start = 0
  finish = 2

  loop do

    current = numbers_array[start.. finish]
    operator = current[1]
    p operator
    a = current[0]
    b = current[2]

    total = 0
    if operator == opp

      total += divide a, b

      #ADD A CONDITION FOR IF WE"RE AT THE BEGINNING
      if start == 0
        numbers_array = [total] + numbers_array[finish+1..-1]
      elsif finish == (numbers_array.length) - 1
        numbers_array = numbers_array[0..start-1] + [total]
      else
        numbers_array = numbers_array[0..start-1]+ [total] + numbers_array[finish+1..-1]

      end


    else
      start += 2
      finish += 2

    end




    p numbers_array

    break if !(numbers_array.include?(opp))

  end

  numbers_array
end

def runthrough_p numbers_array
  opp = "plus"

  start = 0
  finish = 2

  loop do

    current = numbers_array[start.. finish]
    operator = current[1]
    p operator
    a = current[0]
    b = current[2]

    total = 0
    if operator == opp

      total += plus a, b

      #ADD A CONDITION FOR IF WE"RE AT THE BEGINNING
      if start == 0
        numbers_array = [total] + numbers_array[finish+1..-1]
      elsif finish == (numbers_array.length) - 1
        numbers_array = numbers_array[0..start-1] + [total]
      else
        numbers_array = numbers_array[0..start-1]+ [total] + numbers_array[finish+1..-1]

      end


    else
      start += 2
      finish += 2

    end




    p numbers_array

    break if !(numbers_array.include?(opp))

  end

  numbers_array
end

def runthrough_m numbers_array
  opp = "minus"

  start = 0
  finish = 2

  loop do

    current = numbers_array[start.. finish]
    operator = current[1]
    p operator
    a = current[0]
    b = current[2]

    total = 0
    if operator == opp

      total += minus a, b

      #ADD A CONDITION FOR IF WE"RE AT THE BEGINNING
      if start == 0
        numbers_array = [total] + numbers_array[finish+1..-1]
      elsif finish == (numbers_array.length) - 1
        numbers_array = numbers_array[0..start-1] + [total]
      else
        numbers_array = numbers_array[0..start-1]+ [total] + numbers_array[finish+1..-1]

      end


    else
      start += 2
      finish += 2

    end




    p numbers_array

    break if !(numbers_array.include?(opp))

  end

  numbers_array
end


#------------------------------------------------------------------------#

def computer str
  array = str.split(" ")

  array.delete("by")

  numbers_array = []

  array.each do |entry|
    numbers = HASH.keys
    if numbers.include?(entry)
      numbers_array << HASH[entry]
    elsif entry.to_i.to_s == entry
      numbers_array << entry.to_i
    else
      numbers_array << entry
    end

  end

  runthrough_m(runthrough_p(runthrough_d(runthrough_t numbers_array)))


end

p computer "eight times four plus six divided by two minus two"
