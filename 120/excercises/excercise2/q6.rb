class Cat
  COLOUR = "white"

  attr_accessor :name, :colour

  def initialize name
    self.name = name
    self.colour = COLOUR
  end

  def greet
    puts "#{name} #{colour}"
  end

end

kitty = Cat.new('Sophie')
kitty.greet
