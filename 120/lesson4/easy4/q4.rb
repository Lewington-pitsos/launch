class Greeting
  def greet str
    puts str
  end
end

class Hello < Greeting
  def hi
    greet "Hello"
  end

end

class Goodby < Greeting
  def bye
    greet "Goodbye"
  end
end
