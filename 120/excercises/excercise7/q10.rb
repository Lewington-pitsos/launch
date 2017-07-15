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
  SUITS = %w(Hearts Clubs Diamonds Spades).freeze

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

    stack.shuffle!
    stack.pop
  end

end

class PokerHand

  attr_reader :hand

  def initialize(deck)
    @hand = []
    5.times {@hand << deck.draw}
  end

  def print
    puts hand
  end

  def evaluate
    case
    when royal_flush?     then 'Royal flush'
    when straight_flush?  then 'Straight flush'
    when four_of_a_kind?  then 'Four of a kind'
    when full_house?      then 'Full house'
    when flush?           then 'Flush'
    when straight?        then 'Straight'
    when three_of_a_kind? then 'Three of a kind'
    when two_pair?        then 'Two pair'
    when pair?            then 'Pair'
    else                       'High card'
    end
  end


  def royal_flush?
    present = hand.map { |i| i.val }.sort
    straight? && flush? && present[0] == 10
  end

  def straight_flush?
    straight? && flush?
  end

  def four_of_a_kind?
    three_of_a_kind? 4
  end

  def full_house?
    present = hand.map { |i| i.val }
    three_of_a_kind? && present.uniq.length == 2
  end

  def flush?
    s = hand[0].suit
    return true if hand.count {|i| i.suit == s} == 5
    false
  end

  def straight?
    vals = hand.map {|i| i.val}.sort
    start = vals[0]
    vals[1..-1].each do |i|
      start += 1
      return false unless start == i
    end

    true
  end

  def three_of_a_kind? num = 3
    n = num
    present = hand.map { |i| i.val }
    hand.each do |i|
      if present.count(i.val) == n
        return true
      end
    end
    false
  end

  def two_pair?
    pair?(1) && ! three_of_a_kind?
  end

  def pair? count=0
    present = []
    hand.each do |i|
      if present.include?(i.val)
        if count == 0
          return true
        else
          count -=1
        end
      end
      present << i.val
    end
    false
  end
end

hand = PokerHand.new(Deck.new)
hand.print
puts hand.evaluate

# Danger danger danger: monkey
# patching for testing purposes.
class Array
  alias_method :draw, :pop
end

# Test that we can identify each PokerHand type.
hand = PokerHand.new([
  Card.new(10,      'Hearts'),
  Card.new('Ace',   'Hearts'),
  Card.new('Queen', 'Hearts'),
  Card.new('King',  'Hearts'),
  Card.new('Jack',  'Hearts')
])
puts hand.evaluate == 'Royal flush'

hand = PokerHand.new([
  Card.new(8,       'Clubs'),
  Card.new(9,       'Clubs'),
  Card.new('Queen', 'Clubs'),
  Card.new(10,      'Clubs'),
  Card.new('Jack',  'Clubs')
])
puts hand.evaluate == 'Straight flush'

hand = PokerHand.new([
  Card.new(3, 'Hearts'),
  Card.new(3, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(3, 'Spades'),
  Card.new(3, 'Diamonds')
])
puts hand.evaluate == 'Four of a kind'

hand = PokerHand.new([
  Card.new(3, 'Hearts'),
  Card.new(3, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(3, 'Spades'),
  Card.new(5, 'Hearts')
])
puts hand.evaluate == 'Full house'

hand = PokerHand.new([
  Card.new(10, 'Hearts'),
  Card.new('Ace', 'Hearts'),
  Card.new(2, 'Hearts'),
  Card.new('King', 'Hearts'),
  Card.new(3, 'Hearts')
])
puts hand.evaluate == 'Flush'

hand = PokerHand.new([
  Card.new(8,      'Clubs'),
  Card.new(9,      'Diamonds'),
  Card.new(10,     'Clubs'),
  Card.new(7,      'Hearts'),
  Card.new('Jack', 'Clubs')
])
puts hand.evaluate == 'Straight'

hand = PokerHand.new([
  Card.new(3, 'Hearts'),
  Card.new(3, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(3, 'Spades'),
  Card.new(6, 'Diamonds')
])
puts hand.evaluate == 'Three of a kind'

hand = PokerHand.new([
  Card.new(9, 'Hearts'),
  Card.new(9, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(8, 'Spades'),
  Card.new(5, 'Hearts')
])
puts hand.evaluate == 'Two pair'

hand = PokerHand.new([
  Card.new(2, 'Hearts'),
  Card.new(9, 'Clubs'),
  Card.new(5, 'Diamonds'),
  Card.new(9, 'Spades'),
  Card.new(3, 'Diamonds')
])
puts hand.evaluate == 'Pair'

hand = PokerHand.new([
  Card.new(2,      'Hearts'),
  Card.new('King', 'Clubs'),
  Card.new(5,      'Diamonds'),
  Card.new(9,      'Spades'),
  Card.new(3,      'Diamonds')
])
puts hand.evaluate == 'High card'
