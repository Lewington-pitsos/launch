class Pet
  attr_reader :name

  def initialize(name)
    @name = name.to_s
  end

  def to_s
    "My name is #{@name.upcase}."
  end
end

name = 42
fluffy = Pet.new(name)
name += 1
puts fluffy.name
puts fluffy
puts fluffy.name
puts name

# the name in fluffy is unaffected by alterations to the name in main because
# the .to_s created a new string object that @name got assigned to. Further
# changes to the origional name therefore do not affect @name
