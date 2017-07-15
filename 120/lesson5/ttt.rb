

class Board
  WINNERS = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 4, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ]

  attr_accessor :squares

  def initialize
      reset
  end

  def get_at int
    squares[int]
  end

  def set_at int, mark
    self.squares[int].marker = mark
  end

  def empties
    emp = squares.map {|k, v| k if v.marker == Square::BLANK}
    emp.delete(nil)
    emp
  end

  def full?
    empties.empty?
  end

  def someone_won?
    !!detect_winner
  end

  def win? mark
    WINNERS.each do |line|
      if @squares[line[0]].marker == mark &&
         @squares[line[1]].marker == mark &&
         @squares[line[2]].marker == mark
        return true
      end
    end

    false
  end

  def detect_winner
      if win? TTTGame::HUMAN
        return TTTGame::HUMAN
      elsif win? TTTGame::COMP
        return TTTGame::COMP
      end

    nil
  end

  def reset
    @squares = {
      1 => Square.new(), 2 => Square.new(), 3 => Square.new(),
      4 => Square.new(), 5 => Square.new(), 6 => Square.new(),
      7 => Square.new(), 8 => Square.new(), 9 => Square.new(),
    }
  end
end

class Square
  BLANK = " "

  attr_accessor :marker

  def initialize marker=BLANK
    @marker = marker
  end

  def to_s
    @marker
  end
end

class Player
  attr_reader :marker
  def initialize marker
    @marker = marker
  end

  def mark

  end
end



class TTTGame
  HUMAN = "X"
  COMP = "0"

  attr_accessor :board, :human, :comp

  def initialize
    @board = Board.new
    @human = Player.new(HUMAN)
    @comp = Player.new(COMP)
  end


  def play
    display_welcome_message

    loop do
      display_board(false)

      loop do
        human_moves
        break if board.someone_won? || board.full?

        comp_moves
        break if board.full?
        display_board
        break if board.someone_won? || board.full?

      end
      display_result
      break unless play_again?
      board.reset
      system "cls"
      puts "okey dokey"
      puts
      puts

    end
    display_goodbye_message
  end

  def play_again?

    answer = talk_block "Would you like to play again [y/n]?", ["y", "n"]

    answer == "y"
  end

  def display_result
    display_board

    case board.detect_winner
    when HUMAN
      puts "you won"
    when COMP
      puts "computer won"
    else
      puts "tie"
    end

    puts "The board is full"
  end

  def display_goodbye_message
    puts "thanks for playing"
  end

  def talk_block message, valids
    answer = ''
    loop do
      puts message
      answer = gets.chomp
      break if valids.include?(answer)
      puts "invalid input"
    end
    answer
  end

  def human_moves
    answer = talk_block "please select a square between #{board.empties.join(", ")}", board.empties.map {|i| i.to_s}

    board.set_at(answer.to_i, human.marker)
  end

  def comp_moves
    board.set_at(board.empties.sample, comp.marker)
  end
  def display_welcome_message
    puts "welcome to tictattoe"
    puts
  end




  def display_board clear = true
    system 'cls' if clear
    puts "You are playing as #{human.marker} and the computer is playing as #{comp.marker}"
    puts
    puts "     |     |     "
    puts "  #{board.get_at(1)}  |  #{board.get_at(2)}  |  #{board.get_at(3)}  "
    puts "     |     |     "
    puts "-----+-----+-----"
    puts "     |     |     "
    puts "  #{board.get_at(4)}  |  #{board.get_at(5)}  |  #{board.get_at(6)}  "
    puts "     |     |     "
    puts "-----+-----+-----"
    puts "     |     |     "
    puts "  #{board.get_at(7)}  |  #{board.get_at(8)}  |  #{board.get_at(9)}  "
    puts "     |     |     "
    puts
  end
end

# we'll kick off the game like this
game = TTTGame.new
game.play
