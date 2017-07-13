class Person

  attr_accessor :last_name, :first_name

  def initialize name

    self.name=name


  end

  def name
    if last_name.empty?
      first_name
    else
      "#{first_name} #{last_name}"
    end
  end

  def name=name
    whole = name.split()

    if whole.length > 1

      self.first_name = whole[0]

      self.last_name = whole[1]
    else
      self.first_name = name

      self.last_name = ''
    end
  end

end

bob = Person.new('Robert')
p bob.name                  # => 'Robert'
p bob.first_name            # => 'Robert'
p bob.last_name             # => ''
p bob.last_name = 'Smith'
p bob.name                  # => 'Robert Smith'

p bob.name = "John Adams"
p bob.first_name            # => 'John'
p bob.last_name             # => 'Adams'
