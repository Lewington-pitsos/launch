class Vehicle

  @@vehicle_count = 0

  attr_accessor :year, :colour, :model, :speed, :doors

  def initialize year, colour, model
    @year = year
    @model = model
    @colour = colour
    @speed = 0

    @@vehicle_count += 1

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

  def self.count
    @@vehicle_count
  end

  def age
    calc_years
  end

  private

  def calc_years
    present = Time.new.year

    present - year
  end
end

class Car < Vehicle

  DOOR_NUMBER = 4

  def initialize year, colour, model
    super
    @doors = DOOR_NUMBER
  end

end

module Loadable
  def load_on cargo
    self.cargo = cargo
  end

  def unload
    self.cargo = "empty"
  end
end

def spray_paint obj
  obj.colour = "blue"
end

class Truck < Vehicle

  include Loadable

  DOOR_NUMBER = 2

  attr_accessor :cargo

  def initialize year, colour, model
    super
    @doors = DOOR_NUMBER
    @cargo = "empty"
  end

end

herb = Car.new(1967, "pink", "cadilack convertable with whale skin hubcaps")

h = Truck.new(2007, "white", "lorry")

h.load_on "fruit"

p h.cargo

h.unload

p h.cargo

p Vehicle.count

p herb.calc_years
