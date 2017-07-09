class Car

  attr_accessor :year, :colour, :model, :speed

  def initialize year, colour, model
    @colour = colour
    @speed = 0
  end

  def speed_up
    self.speed = (speed + 1)
  end

  def break
    self.speed = 0
  end

end

def spray_paint obj
  obj.colour = "blue"
end
herb = Car.new 1998, "red", "%VRB&"

p herb.colour

spray_paint(herb)

p herb.colour
