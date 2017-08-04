class Player
  attr_accessor :score, :name, :tiebreak
  def initialize hash={}
    @score = hash[:score] || 0
    @tiebreak = hash[:tiebreak] || 0
    @name = hash[:name]
  end
end

class Pair
  attr_accessor :players, :white, :black, :finished
  def initialize white, black
    @white = white
    @black = (black || Player.new({name: "BYE"}))
    @players = {@white.name => white, @black.name => black}
    @finished = false
  end

  def win player
    if winner = players[player]
      winner.score += 1
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
    else
      players.each { |_, v| v.score += 0.5}
      update_tiebreak
    end
  end

  private

  def update_tiebreak
    white.tiebreak += black.score
    black.tiebreak += white.score
    self.finished = true
  end
end
