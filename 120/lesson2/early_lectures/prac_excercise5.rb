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

  def to_s
    name
  end

end

bob = Person.new("Robert Smith")
puts "The person's name is: #{bob}"
