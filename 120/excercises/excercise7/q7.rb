class GuessingGame

  attr_accessor :num, :lower, :upper, :left

  def initialize lower, upper
    @upper = upper
    @lower = lower
    @left = Math.log2((lower..upper).size).to_i + 1
  end



  def play
    self.num = rand(lower..upper + 1)
    p num
    guesses = left

    answer = ''

    while guesses > 0
      puts "You have #{guesses} guesses"
      loop do
        print "Enter a number between #{lower} and #{upper}: "
        answer = gets.chomp.to_i
        break if (lower.. upper).to_a.include?(answer)
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

d = GuessingGame.new(501, 1500)
d.play
