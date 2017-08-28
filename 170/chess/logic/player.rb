class Player
  attr_accessor :score, :name, :tiebreak, :playing, :last_colour
  def initialize hash={}
    @score = hash[:score] || 0.0
    @tiebreak = hash[:tiebreak] || 0.0
    @name = hash[:name]
    @playing = true
    @last_colour = hash[:last_colour] || nil;
  end

  def toggle
    self.playing = !playing
  end

  def set_white
    self.last_colour = "white"
  end

  def set_black
    self.last_colour = "black"
  end
end

class Pair
  attr_accessor :players, :white, :black, :winner
  def initialize white, black
    @white = white
    white.set_white
    @black = black
    black.set_black
    @players = {@white.name => white, @black.name => black}
    @winner = nil
    @loser = nil
  end

  def undo_win player
    if winner == player && winner = players[player] # i.e. player is actually a key in players
      winner.score -= 1
      undo_tiebreak
    end
  end

  def win player
    if winner = players[player]
      winner.score += 1
      self.winner = winner.name
      update_tiebreak
    end
  end

  def draw player
    if players[player]
      auto_draw
    end
  end

  def auto_draw
    if black.name == "BYE"
      win white.name
    elsif white.name == "BYE"
      win black.name
    else
      players.each { |_, v| v.score += 0.5}
      update_tiebreak
      self.winner = "DRAW"
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
