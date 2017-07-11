class Living

  attr_reader :name

  def initialize(name)
    @name = name
  end

end

class Shelter

  attr_accessor :adoptions

  def initialize
    @adoptions = Hash.new { |h, k| h[k] = [] }
  end

  def adopt(owner, pet)
    owner.adopt(pet)
    self.adoptions[owner.name] << [pet.type, pet.name]
  end

  def print_adoptions
    adoptions.each do |k, v|
      puts "#{k} has adopted the following pets:"
      v.each {|i| puts "A #{i[0]} named #{i[1]}"}
    puts
    end
  end
end

class Owner < Living

  attr_accessor :number_of_pets, :pets

  def initialize(name)
    super
    @number_of_pets = 0
    @pets = []
  end

  def adopt (pet)
    self.number_of_pets += 1
    self.pets << pet
  end

end

class Pet < Living

  attr_reader :type

  def initialize(type, name)
    super(name)
    @type = type
  end
end




butterscotch = Pet.new('cat', 'Butterscotch')
pudding      = Pet.new('cat', 'Pudding')
darwin       = Pet.new('bearded dragon', 'Darwin')
kennedy      = Pet.new('dog', 'Kennedy')
sweetie      = Pet.new('parakeet', 'Sweetie Pie')
molly        = Pet.new('dog', 'Molly')
chester      = Pet.new('fish', 'Chester')

phanson = Owner.new('P Hanson')
bholmes = Owner.new('B Holmes')

shelter = Shelter.new
shelter.adopt(phanson, butterscotch)
shelter.adopt(phanson, pudding)
shelter.adopt(phanson, darwin)
shelter.adopt(bholmes, kennedy)
shelter.adopt(bholmes, sweetie)
shelter.adopt(bholmes, molly)
shelter.adopt(bholmes, chester)
shelter.print_adoptions
puts "#{phanson.name} has #{phanson.number_of_pets} adopted pets."
puts "#{bholmes.name} has #{bholmes.number_of_pets} adopted pets."
