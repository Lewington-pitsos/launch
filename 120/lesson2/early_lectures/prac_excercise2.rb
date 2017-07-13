class Person

  attr_accessor :name, :last_name, :first_name

  def initialize name

    self.first_name = name
  end

  def name
    "#{first_name} #{last_name}"
  end

end

bob = Person.new('Robert')
bob.name                  # => 'Robert'
bob.first_name            # => 'Robert'
bob.last_name             # => ''
bob.last_name = 'Smith'
bob.name
