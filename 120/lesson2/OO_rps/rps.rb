class Archive
  attr_accessor :history, :count
  attr_reader :human, :comp

  def initialize human, comp
    @history = {}
    @count = 0
    @human = human
    @comp = comp
  end

  def add entry
    history["Round #{count}"] = entry
    self.count += 1
  end

  def display
    puts
    puts "#{"-" * 20} Archive: #{"-" * 20}"
    history.each do |k, v|
      puts "#{k}:        #{human}: #{v[0]}, #{comp}: #{v[1]}"
    end
    puts
  end
end

class Player
  attr_accessor :type, :choice, :name, :score

  def initialize
    @choice = nil
    @score = 0
    set_name
  end

  def score_up
    self.score += 1
  end
end

class Comp < Player
  attr_accessor :weight

  def initialize
    super
    @weight = {
      Selection::VALUES[0] => 1,
      Selection::VALUES[1] => 1,
      Selection::VALUES[2] => 1
    }
  end

  def add_weight
    weight[choice.value] += 1
  end

  def lose_weight
    weight[choice.value] -= 1 if weight[choice.value] > 1
  end

  def select
    arr = []
    Selection::VALUES.length.times do |i|
      choice_weight = [[Selection::VALUES[i]] * weight[Selection::VALUES[i]]]
      arr << choice_weight.flatten
    end
    picked = arr.flatten.sample
    self.choice = Selection.new(picked)
  end
end

class RockComp < Comp
  def initialize
    super
    weight[Selection::VALUES[2]] = 6
  end

  def set_name
    self.name = "RockComp"
  end
end

class PaperComp < Comp
  def initialize
    super
    weight[Selection::VALUES[0]] = 6
  end

  def set_name
    self.name = "PaperComp"
  end
end

class ScissorsComp < Comp
  def initialize
    super
    weight[Selection::VALUES[1]] = 6
  end

  def set_name
    self.name = "ScissorsComp"
  end
end

class Human < Player
  def select
    answer = ''
    loop do
      puts "please choose a move"
      answer = gets.chomp
      break if Selection::VALUES.include?(answer)
      puts "invalid input"
    end
    self.choice = Selection.new(answer)
  end

  def set_name
    puts "please enter your name"
    answer = gets.chomp
    self.name = answer
  end
end

class Selection
  VALUES = ["paper", "scissors", "rock"]

  attr_reader :value

  def initialize value
    @value = value
  end

  def > other
    rock? && other.scissors? ||
      paper? && other.rock? ||
      scissors? && other.paper?
  end

  def scissors?
    @value == "scissors"
  end

  def rock?
    @value == "rock"
  end

  def paper?
    @value == "paper"
  end

  def to_s
    @value
  end
end

class Engine
  attr_reader :human, :comp, :archive

  def initialize
    @human = Human.new
    @comp = [RockComp.new, PaperComp.new, ScissorsComp.new].sample
    @archive = Archive.new(human.name, comp.name)
  end

  def display_welcome
    puts "welcome"
  end

  def display_goodby
    puts "thanks for playing"
  end

  def display_winner
    puts "#{human.name}'s choice: #{human.choice}"
    puts "#{comp.name}'s' choice: #{comp.choice}"

    find_winner
  end

  def find_winner
    n = human.name
    if human.choice > comp.choice
      comp.lose_weight
      human.score_up
      puts "#{n} wins"
    elsif comp.choice > human.choice
      comp.score_up
      comp.add_weight
      puts "#{n} loses"
    else
      puts "tie"
    end
  end

  def play_again?
    answer = ''
    loop do
      puts "#{human.name} score: #{human.score}"
      puts "#{comp.name} score: #{comp.score}"
      final_winner
      puts "woukld you like to play again #{human.name} {y/n}?"
      answer = gets.chomp
      break if answer == "y" || answer == "n"
      puts "invalid input"
    end

    answer == "y"
  end

  def final_winner
    if comp.score > 4
      puts "#{comp.name} is the final winner"
      exit
    end

    if human.score > 4
      puts "#{human.name} is the final winner"
      exit
    end
  end

  def display_archive
    archive.display
  end

  def play
    display_welcome
    loop do
      human.select
      comp.select
      # calculate winner
      archive.add([human.choice, comp.choice])
      display_winner
      display_archive
      break unless play_again?
    end

    display_goodby
  end
end

Engine.new.play
