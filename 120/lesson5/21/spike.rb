class Player

  attr_reader :deck
  attr_accessor :hand

  def initialize deck
    @deck = deck
    @hand = Hand.new(deck)
  end

  def play_round

  end

  def check_hand
  end

  private

  def hit

  end

  def stay
  end

end

class Dealer < Player
  def play_round

  end
end

class Human < Player
  def play_round

  end
end

class Hand

  def initialize deck
    @cards = []

  end

  def show_hand

    total_value
  end

  private

  def total_value

  end



end

class Deck

  SUITS = []
  NAMES = []

  def initialize


  end

  def top_card

  end

end

class Card

  CONVERSION = {}

  def initialize suit, name
    @value =

  end

end

class Overlord

  def initialize

  end

  def newgame
    welcome
    deal
    player_turn
    dealer_turn
    compare
    display_result
    goodbye
  end

  private

  def compare player1, player2
  end

end
