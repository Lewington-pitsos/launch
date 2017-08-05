require_relative "player"

class Sorter

  attr_accessor :players, :pairs

  def initialize array
    @players = array.sort_by do |a|
      a.score + a.tiebreak*0.00001
    end.reverse
    @pairs = pair
  end

  def pair
    current_pairs = []
    players.each_with_index do |player, index|
      current_pairs << Pair.new(player, players[index + 1]) if index.even?
    end
    current_pairs
  end
end

class Round

  attr_accessor :pairs

  def initialize pairs
    @pairs = pairs
  end

  def undo_win player
    pairs.each do |pair|
      pair.undo_win player
    end
  end

  def win player_name
    pairs.each do |pair|
      pair.win player_name
    end
  end

  def draw player_name
    pairs.each do |pair|
      pair.draw player_name
    end
  end

  def finish_round
    pairs.each do |pair|
      pair.auto_draw unless pair.winner
    end
  end
end
