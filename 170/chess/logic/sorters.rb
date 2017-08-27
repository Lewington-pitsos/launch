require_relative "player"

class Sorter

  @@first_round_method = Proc.new do |list, _, index|
    index == list.length ? nil : list[index]
  end

  @@normal_method = Proc.new do |list, colour, index|
    if index == list.length
      nil
    elsif list[index].last_colour != colour
      list[index]
    else
      @@normal_method.call(list, colour, index + 1)
    end
  end

  attr_accessor :players, :pairs, :round

  def initialize array, round
    @round = round
    @players = array.sort_by do |a|
      a.score + a.tiebreak*0.00001
    end.reverse
    @pairs = pair
  end

  def pair
    paired_players = []
    current_pairs = []
    finder = round == 1 ? @@first_round_method : @@normal_method
    while !players.empty?
      player = players[0]
      opponent = finder.call(players, player.last_colour, 1)
      if player.last_colour == "white"
        current_pairs << Pair.new(opponent, player)
      else
        current_pairs << Pair.new(player, opponent)
      end
      adjust_player_lists paired_players, player, opponent
    end

    self.players = paired_players

    current_pairs
  end

  def adjust_player_lists paired_players, player, opponent
    paired_players << player
    paired_players << opponent if opponent
    players.delete(player)
    players.delete(opponent) if opponent
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
