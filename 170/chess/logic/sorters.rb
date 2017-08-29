require_relative "player"

class Sorter
  attr_accessor :players, :pairs, :round

  def initialize array
    @players = array.sort_by do |a|
      a.score + a.tiebreak * 0.00001
    end.reverse
  end

  def pair
    paired_players = []
    current_pairs = []
    until players.empty?
      player = players[0]
      opponent = find_opponent(players, player.last_colour)

      current_pairs << assign_colours(player, opponent)

      adjust_player_lists paired_players, player, opponent
    end

    self.players = paired_players
    self.pairs = current_pairs
  end

  private

  def assign_colours player, opponent
    if player.last_colour == 'black' || opponent.last_colour == 'white'
      Pair.new(player, opponent)
    else
      # opponent is always going to be lower scored, so as long as player isn't white and opponent isn't black, we assign player black (even if both are nil, we want even games)
      Pair.new(opponent, player)
    end
  end

  def adjust_player_lists paired_players, player, opponent
    paired_players << player
    paired_players << opponent unless opponent.name == "BYE"
    players.delete(player)
    players.delete(opponent) unless opponent.name == "BYE"
  end

  def find_opponent list, colour, index = 1
    possible_opponent = list[index]
    if index == list.length
      Player.new(name: "BYE")
    elsif !colour || (possible_opponent.last_colour != colour)
      possible_opponent
    else
      find_opponent list, colour, index + 1
    end
  end
end

class Round
  attr_accessor :pairs, :number

  def initialize pairs, number = 0
    @pairs = pairs
    @number = number + 1
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
