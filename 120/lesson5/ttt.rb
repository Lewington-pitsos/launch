

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

  def []=(int, mark)
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
    !!winning_marker
  end

  def win?
    WINNERS.each do |line|
      if (
        @squares[line[0]].marker == @squares[line[1]].marker &&
        @squares[line[1]].marker == @squares[line[2]].marker) &&
        @squares[line[0]].marker != Square::BLANK
        return @squares[line[0]].marker
      end
    end

    false
  end

  def winning_marker
    win?
  end

  def reset
    @squares = {
      1 => Square.new(), 2 => Square.new(), 3 => Square.new(),
      4 => Square.new(), 5 => Square.new(), 6 => Square.new(),
      7 => Square.new(), 8 => Square.new(), 9 => Square.new(),
    }
  end

  def show
    puts
    puts "     |     |     "
    puts "  #{@squares[1]}  |  #{@squares[2]}  |  #{@squares[3]}  "
    puts "     |     |     "
    puts "-----+-----+-----"
    puts "     |     |     "
    puts "  #{@squares[4]}  |  #{@squares[5]}  |  #{@squares[6]}  "
    puts "     |     |     "
    puts "-----+-----+-----"
    puts "     |     |     "
    puts "  #{@squares[7]}  |  #{@squares[8]}  |  #{@squares[9]}  "
    puts "     |     |     "
    puts
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
end



class TTTGame
  HUMAN = "X"
  COMP = "0"

  attr_accessor :board, :human, :comp

  def initialize
    @board = Board.new
    @human = Player.new(HUMAN)
    @comp = Player.new(COMP)

    @iter = [true, false].cycle
    @human_turn = @iter.next
  end

  def clear
    system 'cls'
  end

  def play
    display_welcome_message

    loop do
      display_board_no_clear

      loop do
        current_player_moves
        break if board.someone_won? || board.full?

        display_board if @human_turn
      end
      display_result
      break unless play_again?
      reset

    end
    display_goodbye_message
  end

  private

  def current_player_moves

    if @human_turn
      human_moves
    else
      comp_moves
    end

    @human_turn = @iter.next
  end

  def reset
    board.reset
    clear
    puts "okey dokey"
    puts
    puts
  end

  def play_again?

    answer = talk_block "Would you like to play again [y/n]?", ["y", "n"]

    answer == "y"
  end

  def display_result
    display_board

    case board.winning_marker
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

    board[answer.to_i] = human.marker
  end

  def comp_moves
    board[board.empties.sample] =  comp.marker
  end
  def display_welcome_message
    puts "welcome to tictattoe"
    puts
  end

  def display_board_no_clear
    puts "You are playing as #{human.marker} and the computer is playing as #{comp.marker}"
    board.show
  end

  def display_board
    clear
    display_board_no_clear
  end
end

# we'll kick off the game like this
game = TTTGame.new
game.play
