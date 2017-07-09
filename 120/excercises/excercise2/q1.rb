class Cat
  def self.generic_greeting
    p "hello, I'm a cat"
  end
end

Cat.generic_greeting

kitty = Cat.new

kitty.class.generic_greeting
