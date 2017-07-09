class Person
  def name=str
    @first, @second = str.split(/\s+/)
  end

  def name
    [@first, @second].join(" ")
  end
end

person1 = Person.new
person1.name = 'John     Doe'
puts person1.name
