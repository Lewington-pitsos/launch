=begin
The Player object only stores data, and is capable of manipulating it's own data.
it should keep track of:
  score => the player's score
  tiebreak => the scores of all the opponents the player has faced so as a measure of the player's performance to be used to rank players in case of a tie in score
  name => players name
  playing => whether the player is playing in the next round or not
  last_colour => what colour the player played as last
=end

class Player
  attr_reader :playing, :last_colour
  attr_accessor :score, :name, :tiebreak
  def initialize hash={}
    @score = hash[:score] || 0.0
    @tiebreak = hash[:tiebreak] || 0.0
    @name = hash[:name]
    @playing = true
    @last_colour = hash[:last_colour] || nil
  end

  def toggle
    self.playing = !playing
  end

  def set_white
    self.last_colour = 'white'
  end

  def set_black
    self.last_colour = 'black'
  end

  private

  attr_writer :playing, :last_colour
end

=begin
A Pair objects keeps track of two players who are paired together in the current round. it keeps track of the colours of both and records which player has won (if any).

The attributed variabels should be self explanitory.
=end

class Pair
  attr_accessor :players, :white, :black, :winner
  def initialize white, black
    @white = white
    white.set_white
    @black = black
    black.set_black
    # names are used to loop up winning player objects during a round, so storing player objects in a hash with their names as keys streamlines the lookup process a tiny bit.
    @players = { @white.name => white, @black.name => black }
    @winner = nil
  end

  # elsewhere, when any player wins the progam tries to create a win for that player in every pair the validation that the winning player actually exists in a given pair is left to the pair itself.
  def win player
    if winner = players[player]
      # returns nil if a player object named player isn't in this pair
      winner.score += 1
      self.winner = winner.name
      update_tiebreak
    end
  end

  def undo_win player
    if winner == player
      # no need to validate that player actually is part of this pair because winner can only be set as 'DRAW' or the name of a player in the pair
      winner = players[player]
      winner.score -= 1
      undo_tiebreak
    end
  end

  def draw player
    auto_draw if players[player]
  end

  def auto_draw
    # 'BYE' is the place-holder player. Anyone facing 'BYE' is conventonally awarded a win.
    if black.name == 'BYE'
      win white.name
    elsif white.name == 'BYE'
      win black.name
    else
      players.each { |_, player| player.score += 0.5 }
      update_tiebreak
      self.winner = 'DRAW'
    end
  end

  private

  def update_tiebreak
    white.tiebreak += black.score
    black.tiebreak += white.score
  end

  def undo_tiebreak
    white.tiebreak -= black.score
    black.tiebreak -= white.score
    self.winner = nil
  end
end
