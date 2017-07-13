module Speed
  def go_fast
    puts "I am a #{self.class} and going super fast!"
  end
end

class Car
  include Speed
  def go_slow
    puts "I am safe and driving slow."
  end
end

# with the use of self.class. Self references whatever object calls it, so when
# our new car object calls go_fast, self, refers to that object itself, whose
# class is, of course, Car
