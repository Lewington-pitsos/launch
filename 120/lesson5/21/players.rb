=begin
 >>>>>>>>>>>>>>>>>>>> 2 aces first hand
=end

module TalkBlock
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
end

require_relative "deck.rb"

class Player
  attr_reader :deck, :hand, :name, :state

  def initialize name, hand
    @state = "OK"
    @name = name
    @hand = hand
  end

  def play_round
    loop do
      if bust?
        puts "#{name} has Busted."
        self.state = "BUST"
        break
      end

      if sit_condition?
        puts "#{name} Stays."
        break
      end

      puts "#{name} Hits."
      hit
    end

    puts
  end

  def check_hand
    puts "#{name}'s' hand contains:"
    puts

    hand.cards.each do |c|
      puts "#{c.name} of #{c.suit}"
    end

    puts
    puts "Total value: #{hand.total}"
  end

  def >(other)
    score > other.score
  end

  def score
    hand.total
  end

  private

  attr_writer :state

  def hit
    hand.add
  end

  def bust?
    hand.total > 21
  end
end

class Dealer < Player
  def sit_condition?
    hand.total > 16
  end

  def visible
    hand.cards.sample
  end
end

class Human < Player
  OPTIONS = %w(Hit Stay).freeze

  include TalkBlock

  attr_reader :visible, :dealer_name

  def initialize name, hand, visible, dealer_name
    super(name, hand)

    @visible = visible
    @dealer_name = dealer_name
  end

  def check_hand_with_dealer_card
    check_hand
    puts
    puts "#{dealer_name} has revealed the #{visible.name} of #{visible.suit}"
  end

  def sit_condition?
    check_hand_with_dealer_card
    answer = talk_block "What would you like to do #{OPTIONS}?", OPTIONS
    answer == "Stay"
  end
end

class Hand
  attr_reader :cards, :total

  def initialize deck
    @deck = deck
    @cards = [@deck.top_card, @deck.top_card]
    @total = @cards.map { |card| card.value }.inject(:+)
  end

  def add
    card = deck.top_card
    cards << card
    self.total += card.value
    if total > 21
      try_saverubo
    end
  end

  protected

  def try_save
    cards.each do |card|
      if card.name == "Ace" && card.value == 11
        card.devalue
        self.total -= 10
        break
      end
    end
  end

  attr_writer :cards, :total
  attr_reader :deck
end
