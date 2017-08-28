require_relative "player"

class Sorter
  attr_accessor :players, :pairs, :round

  def initialize array
    @players = array.sort_by do |a|
      a.score + a.tiebreak*0.00001
    end.reverse
  end

  def pair
    paired_players = []
    current_pairs = []
    while !players.empty?
      player = players[0]
      opponent = find_opponent(players, player.last_colour)

      if player.last_colour == 'black' || opponent.last_colour == 'white'
        current_pairs << Pair.new(player, opponent)
      elsif opponent.last_colour == 'black' || player.last_colour =='white'
        current_pairs << Pair.new(opponent, player)
      else
        # opponent is always going to be lower scored, so if both are nil, we assign player black
        current_pairs << Pair.new(opponent, player)
      end
      adjust_player_lists paired_players, player, opponent
    end

    self.players = paired_players
    self.pairs = current_pairs
  end

  private

  def adjust_player_lists paired_players, player, opponent
    paired_players << player
    paired_players << opponent unless opponent.name == "BYE"
    players.delete(player)
    players.delete(opponent) unless opponent.name == "BYE"
  end

  def find_opponent list, colour, index=1
    opponent_colour = (list[index] ? list[index].last_colour : nil)
    if index == list.length
      Player.new({name: "BYE"})
    elsif !colour || (opponent_colour != colour)
      list[index]
    else
      find_opponent list, colour, index + 1
    end
  end
end

class Round

  attr_accessor :pairs, :number

  def initialize pairs, number
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
