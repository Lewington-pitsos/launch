require_relative "player"
=begin
Sorter is supposed to sort players according to score and whether or not they are playing in the next round. It is also responsible for assignign player objects to pair objects.

players => an ordered list of players, the only thing that is always needed when we create a Sorter object.
=end
class Sorter
  attr_accessor :players, :pairs, :round

  def initialize array
    # when determining ranking, whether the player is playing or not should always outweigh their score, and half a point in score should always outweigh any tiebreak value
    @players = array.sort_by do |player|
      playing = (player.playing ? 1000000 : 0 )
      -(playing + player.score + (player.tiebreak * 0.0000001))
    end
  end

  def pair
    # Assigns players to paits. The algorithm I went with was: (1) pair the highest two players of appropriate colours, (2) add both to a new list and assign them to a pair object, which is also listed (3) delete both from the origional list (@players) and repeat untill the @players is empty (4) set @players to the new player list.
    paired_players = []
    current_pairs = []
    until players.empty?
      player = players[0] # @players is sorted, so this is always the highest seeded player. note that pair is only called when all non-playing participants have been removed from @players so this does not mess with the rankings.
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
    # deletes players from the old list and adds them to the new one
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
      # this covers the case where there are > 2 more player of one colour. We set opponent to the next-highest player, regardless of their colour. This will happen every pairing untill the colours are balanced.
      list[1]
    elsif !colour || (possible_opponent.last_colour != colour)
      possible_opponent
    else
      find_opponent list, colour, index + 1
    end
  end
end

=begin
The round obejct is supposed to simulate a single round of a tourniment. It provides an interface between the user and pair objects so that the user can adjust the scores of the corresponding players according to who wins and loses.

  pairs => a list of all pair objecrs
  number => a way of recording the current round number, given the previous round number. I wasn't sure if this was appropriate but eventually I decided that each round should probably be aware of which round it is.
=end

class Round
  attr_accessor :pairs, :number

  def initialize pairs, number = 0
    @pairs = pairs
    @number = number + 1
  end

  # all of these methods work by telling every pair to perform an action for a certain player (only one paar at most will be able to successfully carry out that action). This seemed efficient since this way we're only calling a single method on each pair, rather than finding the appropriate pair (which would require at least 1 method call per pair) and then calling an additional method on it, but I could easily be misled here.

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

  # in the current application there is no means for the user to cause a specific pair to draw other than not bothering to assign a win to either player.
  def draw player_name
    pairs.each do |pair|
      pair.draw player_name
    end
  end

  # this causes all pairs who do not yet have a winner to draw.
  def finish_round
    pairs.each do |pair|
      pair.auto_draw unless pair.winner
    end
  end
end
