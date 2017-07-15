class GuessingGame

  UPPER = 100
  LOWER = 1
  GUESSES = 7

  attr_accessor :num

  def play
    self.num = rand(LOWER..UPPER + 1)
    p num
    guesses = GUESSES

    answer = ''

    while guesses > 0
      puts "You have #{guesses} guesses"
      loop do
        print "Enter a number between #{LOWER} and #{UPPER}: "
        answer = gets.chomp.to_i
        break if (1..100).to_a.include?(answer)
        puts "Invalid guess."
      end
      if win? answer
        puts "Correct, you win!"
        exit
      end
      hint answer
      guesses -= 1
    end

    puts "you lost, the correct answer was #{num}"
  end

  def hint n
    if n > num
      puts "You guessed too high"
    else
      puts "You guessed too low"
    end
  end

  def win? n
    n == num
  end

end

d = GuessingGame.new
d.play
