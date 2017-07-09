class Car

  attr_accessor :year, :colour, :model, :speed

  def initialize year, colour, model
    @year = year
    @model = model
    @colour = colour
    @speed = 0
  end

  def speed_up
    self.speed = (speed + 1)
  end

  def break
    self.speed = 0
  end

  def to_s
    "Vroom Vroom #{colour}, #{year} #{model}"
  end

  def self.g_km (kms, litres)
    puts kms/litres.to_f
  end

end

def spray_paint obj
  obj.colour = "blue"
end

herb = Car.new(1967, "pink", "Convertable with whale skin hubcaps")


puts herb
