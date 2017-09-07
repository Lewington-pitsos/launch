require_relative "player"

class Sorter
  attr_accessor :players, :pairs, :round

  def initialize array
    @players = array.sort_by do |player|
      playing = (player.playing ? 1000000 : 0 )
      -(playing + player.score + (player.tiebreak * 0.00001))
    end
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
    players.delete(player)
    unless opponent.name == "BYE"
      paired_players << opponent
      players.delete(opponent)
    end
  end

  def find_opponent list, colour, index=1
    possible_opponent = list[index]
    if list.length == 1
      Player.new(name: "BYE")
    elsif index == list.length
      # this covers the case where there are > 2 more player of one colour. We make the next-highest player opponent, regardless of their colour. The higher of player or opponent will end up black.
      list[1]
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
