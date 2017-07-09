class Pet
  attr_reader :name, :age, :fur

  def initialize(name, age)
    @name = name
    @age = age
  end

  def to_s
    "#{name} is #{age} yeard old and has #{fur} fur."
  end
end

class Cat < Pet

  def initialize(name, age, fur)
    super(name, age)
    @fur = fur
  end
end

pudding = Cat.new('Pudding', 7, 'black and white')
butterscotch = Cat.new('Butterscotch', 10, 'tan and white')
puts pudding, butterscotch
