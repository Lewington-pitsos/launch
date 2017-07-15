class Deck
  SUITS = %w(Hearts Diamonds Spades Clubs).freeze
  NAMES =
    %w(Ace Two Three Four Five Six Seven Eight Nine Jack Queen King).freeze

  def initialize
    array = []

    NAMES.each do |name|
      SUITS.each do |suit|
        array << Card.new(suit, name)
      end
    end

    @stack = array.shuffle
  end

  def top_card
    @stack.pop
  end
end

class Card
  CONVERSION = {
    "Ace" => 11, "Two" => 2,  "Three" => 3, "Four" => 4, "Five" => 5,
    "Six" => 6, "Seven" => 7, "Eight" => 8, "Nine" => 9, "Ten" => 10,
    "Jack" => 10, "Queen" => 10, "King" => 10
  }.freeze

  attr_reader :name, :suit, :value

  def initialize suit, name
    @suit = suit
    @name = name
    @value = CONVERSION[name]
  end

  def devalue
    @value = 1
  end
end
