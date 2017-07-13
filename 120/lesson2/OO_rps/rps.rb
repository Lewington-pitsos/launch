class Player

  attr_accessor :type, :choice

  def initialize type = 1
    @type = type
    @choice = nil
  end

  def human?
    type == 1
  end

  def select

    if human?
      answer = ''
      loop do
        puts "please choose a move"
        answer = gets.chomp
        break if ["rock", "paper", "scissors"].include?(answer)
        puts "invalid input"
      end
      self.choice = answer
    else
      self.choice = ["rock", "paper", "scissors"].sample
    end

  end

end

class Selection
  #I guess this is the thing we set the instance var to? I suppose it shoukd
  #know about the heirachy
end

class Heirachy
  #this would just lay down some sort of comparison operator and
  # define the results of aplying that operator
end

def compare (one, two)
end


class Engine

  attr_reader :human, :comp

  def initialize
    @human = Player.new(1)
    @comp = Player.new(0)

  end

  def display_welcome
    puts "welcome"
  end

  def display_goodby
    puts "thanks for playing"
  end

  def play
    display_welcome
    human.select
    comp.select
    # calculate winner
    # display winner
    # ask to play again
    display_goodby

  end


end

Engine.new.play
