class Card
  CONVERSION = {
    "Ace" => 14,
    "Jack" => 11,
    "Queen" => 12,
    "King" => 13
  }.freeze

  attr_reader :rank, :suit, :val

  def initialize(rank, suit)
    @rank = rank
    @suit = suit
    @val = convert(rank)
  end

  def <=>(other)
    val <=> other.val
  end

  def ==(other)
    val == other.val
    end
  def convert rnk
    return rnk unless CONVERSION.keys.include?(rnk)
    CONVERSION[rnk]
  end

  def to_s
    "#{rank} of #{suit}"
  end
end

class Deck
  RANKS = (2..10).to_a + %w(Jack Queen King Ace).freeze
  SUITS = %w(Hearts Clubs Diamonds Spade).freeze

  attr_reader :stack

  def initialize
    @stack = reshuffle
  end

  def reshuffle
    crds = []
    SUITS.each do |s|
      RANKS.each do |rank|
        crds << Card.new(rank, s)
      end
    end

    crds
  end

  def draw
    if stack == []
      @stack = reshuffle
    end

    card = stack.sample
    stack.delete(card)
  end

end


deck = Deck.new
drawn = []
52.times { drawn << deck.draw }
p drawn.count { |card| card.rank == 5 } == 4
p drawn
p drawn.count { |card| card.suit == 'Spades' }

drawn2 = []
52.times { drawn2 << deck.draw }
p drawn != drawn2 # Almost always.
