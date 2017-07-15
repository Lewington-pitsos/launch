require_relative "./players.rb"

class Overlord
  COMP_NAMES = ["Texas Joe", "Randy Mandy", "Le Sheif"]

  include TalkBlock

  attr_reader :human, :dealer

  def initialize
    name = ask_name
    deal name
  end

  def deal name
    deck = Deck.new
    @dealer = Dealer.new(COMP_NAMES.sample, Hand.new(deck))
    @human = Human.new(name, Hand.new(deck), dealer.visible, dealer.name)
  end

  def newgame
    welcome
    loop do
      play_round
      comparison if dealer.state == "OK" && human.state == "OK"
      break unless play_again?
      deal human.name
      system "cls"
    end
    goodbye
  end

  private

  def play_round
    human.play_round

    if human.state == "OK"
      dealer.play_round
    else
      dealer_win
    end

    human_win if dealer.state == "BUST"
  end

  def human_win
    puts "#{human.name} Wins! Congratulations"
  end

  def dealer_win
    puts "#{dealer.name} Wins again..."
  end

  def ask_name
    puts "Please enter your name"
    gets.chomp
  end

  def welcome
    system "cls"
    puts "Welcome to the table, beginning first hand..."
    puts "The Dealer for this hand is #{dealer.name}"
    puts
    puts "Dealing..."
  end

  def goodbye
    puts "Thanks for playing."
  end

  def comparison
    sleep 3
    system "cls"
    puts "Ok lads, cards down."
    puts "----------------COMPARISON:-----------------"

    puts dealer.check_hand
    puts human.check_hand

    if human_wins?
      human_win
    else
      dealer_win
    end
  end

  def human_wins?
    human > dealer
  end

  def play_again?
    answer = talk_block "Would you like to play again [y/n]?", %w(y n)
    answer == "y"
  end
end

h = Overlord.new

h.newgame
