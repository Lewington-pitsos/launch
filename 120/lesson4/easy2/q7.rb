class Cat
  @@cats_count = 0

  def initialize(type)
    @type = type
    @age  = 0
    @@cats_count += 1
  end

  def self.cats_count
    @@cats_count
  end
end

# @@cats_count is a class variable, which means that it is accessable to all
# class methods within Cat or any sub-classes, as well as all insatnces of
# cat and instance methods. Each time a new cat instance is created,
# @@cats_count will be incrimented

#test

gerry = Cat.new(3)

mandy = Cat.new(4)

p Cat.cats_count
