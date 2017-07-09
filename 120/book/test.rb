module RussianThings
  def drink(fluid)
    if fluid == "vodka"
      puts "glug-glug"
    else
      puts "Nyet"
    end
  end
end

class Peseant

  attr_reader :name

  def initialize (name)
    puts "Another peasent was dragged screaming into this cold world..."
    puts "His name was #{name}"
  end


  include RussianThings

  def change
    self.name = "fred"
  end
end

class Worker
  include RussianThings

  def work
    puts "Ya Rabotaiyu..."
  end
end


boris = Peseant.new("Boris")

p boris.name

boris.change

p boris.name
