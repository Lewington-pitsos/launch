module Breathable
  def breath
    puts "pant"
  end

end
class Animal
  include Breathable
  def speak(words)
    words
  end

  def consume
    p self.eat
  end

  protected

  def eat
    "om nom"
  end
end



module Walkable
  def walk
    puts "pitter patter"
  end

  def self.walk
    puts "clop clop"
  end
end

module Mammal

  class Dog < Animal
    def speak
      "woof"
    end
  end

  class Cat < Animal
    include Walkable
    include Breathable

    def speak hey
      super + ", fuck you"
    end
  end

end

fido = Mammal::Dog.new

ginger = Mammal::Cat.new

p ginger.speak "dfds"

ginger.walk

p Mammal::Cat.ancestors

ginger.eat
