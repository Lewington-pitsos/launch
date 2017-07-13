class Game
  def play
    "Start the game!"
  end
end

class Bingo < Game
  def rules_of_play
    #rules of play
  end
end

# the play method in Bingo woukld overwrite the one Bingo inherits from Game
# because according to the method look-up rules, if a method is called on
# an object, the first place ruby looks to work out what that method does
# is the class from which that object was instantiated
